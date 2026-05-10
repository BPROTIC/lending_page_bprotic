<script setup>
import { ref, onMounted } from 'vue'

const news = ref([])
const form = ref({ title: '', content: '', status: 'draft' })
const isEditing = ref(false)
const selectedId = ref(null)
const isLoading = ref(false)
const isSubmitting = ref(false)

const token = localStorage.getItem('token')

const fetchNews = async () => {
  isLoading.value = true
  try {
    const response = await fetch('/api/admin/news', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const result = await response.json()
    
    // 🔍 DEBUG: Intip data news dari backend
    console.log("Response News Admin:", result)

    if (result.success) {
      news.value = result.data || []
    }
  } catch (error) {
    console.error('Error fetching news:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchNews()
})

const saveNews = async () => {
  if (!form.value.title || !form.value.content) return
  
  isSubmitting.value = true
  try {
    const url = isEditing.value 
      ? `/api/admin/news/${selectedId.value}` 
      : '/api/admin/news'
    
    const method = isEditing.value ? 'PATCH' : 'POST'
    
    // Jika editing, API yang diberikan hanya untuk status, 
    // tapi biasanya admin juga ingin edit title/content.
    // Berdasarkan curl yang kamu berikan, PATCH digunakan untuk update status.
    const body = isEditing.value 
      ? { status: form.value.status } 
      : { ...form.value }

    const response = await fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const result = await response.json()
    if (result.success) {
      alert(result.message)
      resetForm()
      fetchNews()
    } else {
      alert(result.message || 'Gagal menyimpan berita')
    }
  } catch (error) {
    console.error('Error saving news:', error)
    alert('Terjadi kesalahan koneksi')
  } finally {
    isSubmitting.value = false
  }
}

const editStatus = (item) => {
  form.value = { 
    title: item.title, 
    content: item.content, 
    status: item.status 
  }
  isEditing.value = true
  selectedId.value = item.id
}

const updateStatus = async (id, newStatus) => {
  try {
    const response = await fetch(`/api/admin/news/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })
    const result = await response.json()
    if (result.success) {
      fetchNews()
    }
  } catch (error) {
    console.error('Error updating status:', error)
  }
}

const deleteNews = async (id) => {
  if (!confirm('Yakin ingin menghapus berita ini?')) return

  try {
    const response = await fetch(`/api/admin/news/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const result = await response.json()
    if (result.success) {
      alert('Berita berhasil dihapus')
      fetchNews()
    }
  } catch (error) {
    console.error('Error deleting news:', error)
    alert('Gagal menghapus berita')
  }
}

const resetForm = () => {
  form.value = { title: '', content: '', status: 'draft' }
  isEditing.value = false
  selectedId.value = null
}
</script>

<template>
  <div class="max-w-5xl">

    <!-- HEADER -->
    <div class="mb-8 flex justify-between items-end">
      <div>
        <h2 class="text-2xl font-extrabold text-purple-400">
          Kelola News
        </h2>
        <p class="text-gray-400 text-sm mt-1">
          Tambahkan dan atur berita terbaru via API
        </p>
      </div>
      <button v-if="isEditing" @click="resetForm" class="text-sm text-red-400 hover:underline">
        Batal Edit
      </button>
    </div>

    <!-- FORM -->
    <div class="card mb-8">
      <div class="space-y-4">
        <div>
          <label class="text-xs text-gray-400 mb-1 block">Judul Berita</label>
          <input 
            v-model="form.title"
            placeholder="Masukkan judul berita..."
            class="input"
            :disabled="isEditing" 
          />
          <p v-if="isEditing" class="text-[10px] text-yellow-500 mt-1">* Judul tidak dapat diubah (sesuai API PATCH status)</p>
        </div>

        <div>
          <label class="text-xs text-gray-400 mb-1 block">Konten Berita</label>
          <textarea 
            v-model="form.content"
            placeholder="Tulis isi berita di sini..."
            class="input min-h-[100px]"
            :disabled="isEditing"
          ></textarea>
        </div>

        <div class="w-full md:w-1/3">
          <label class="text-xs text-gray-400 mb-1 block">Status</label>
          <select v-model="form.status" class="input">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <button 
        @click="saveNews" 
        class="btn-primary mt-6 w-full md:w-auto"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Processing...' : (isEditing ? 'Update Status' : 'Post News') }}
      </button>
    </div>

    <!-- LIST -->
    <div v-if="isLoading" class="text-center py-10 text-gray-400">
      Loading news...
    </div>

    <div v-else class="space-y-4">
      <div 
        v-for="item in news" 
        :key="item.id"
        class="card flex items-center justify-between hover:scale-[1.01]"
      >
        <!-- INFO -->
        <div class="flex-1 pr-4">
          <div class="flex items-center gap-2 mb-1">
            <span 
              class="px-2 py-0.5 text-[10px] rounded-full uppercase font-bold"
              :class="item.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'"
            >
              {{ item.status }}
            </span>
            <p class="font-semibold text-white">
              {{ item.title }}
            </p>
          </div>
          <p class="text-sm text-gray-400 line-clamp-1">
            {{ item.content }}
          </p>
          <p class="text-[10px] text-gray-500 mt-1">
            ID: {{ item.id }} • Created: {{ new Date(item.created_at).toLocaleDateString() }}
          </p>
        </div>

        <!-- ACTION -->
        <div class="flex gap-2">
          <button 
            @click="editStatus(item)" 
            class="btn-edit"
          >
            Edit Status
          </button>

          <button 
            @click="deleteNews(item.id)" 
            class="btn-delete"
          >
            Hapus
          </button>
        </div>
      </div>

      <!-- EMPTY -->
      <div 
        v-if="news.length === 0" 
        class="text-center text-gray-500 mt-10"
      >
        Belum ada news di database 😢
      </div>
    </div>

  </div>
</template>

<style scoped>
.card {
  @apply bg-white/5 backdrop-blur-xl border border-white/10 
         rounded-2xl p-6 transition duration-300;
}

.input {
  @apply w-full p-3 bg-white/10 rounded-xl outline-none 
         focus:ring-2 focus:ring-purple-500 text-sm text-white;
}

.btn-primary {
  @apply px-8 py-2.5 bg-purple-600 hover:bg-purple-700 
         disabled:opacity-50 disabled:cursor-not-allowed
         rounded-xl transition text-sm font-bold shadow-lg shadow-purple-500/20;
}

.btn-edit {
  @apply px-3 py-1.5 text-xs bg-blue-500/20 text-blue-400 
         rounded-lg hover:bg-blue-500/30 transition border border-blue-500/30;
}

.btn-delete {
  @apply px-3 py-1.5 text-xs bg-red-500/20 text-red-400 
         rounded-lg hover:bg-red-500/30 transition border border-red-500/30;
}
</style>