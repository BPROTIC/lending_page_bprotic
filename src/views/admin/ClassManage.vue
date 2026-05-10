<script setup>
import { ref, onMounted } from 'vue'

const classes = ref([])
const form = ref({ name: '', description: '' })
const isLoading = ref(false)
const isSubmitting = ref(false)

const token = localStorage.getItem('token')

const fetchClasses = async () => {
  isLoading.value = true
  try {
    const response = await fetch('/api/admin/classes', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const result = await response.json()
    if (result.success) {
      classes.value = result.data
    }
  } catch (error) {
    console.error('Error fetching classes:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchClasses()
})

const saveClass = async () => {
  if (!form.value.name || !form.value.description) return
  
  isSubmitting.value = true
  try {
    const response = await fetch('/api/admin/classes', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    const result = await response.json()
    if (result.success) {
      alert(result.message)
      form.value = { name: '', description: '' }
      fetchClasses()
    } else {
      alert(result.message || 'Gagal menambahkan kelas')
    }
  } catch (error) {
    console.error('Error saving class:', error)
    alert('Terjadi kesalahan koneksi')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-5xl">
    <div class="mb-8">
      <h2 class="text-2xl font-extrabold text-blue-400">Kelola Kelas</h2>
      <p class="text-gray-400 text-sm mt-1">Tambahkan kelas baru untuk Programing</p>
    </div>

    <!-- FORM -->
    <div class="card mb-8">
      <div class="space-y-4">
        <div>
          <label class="text-xs text-gray-400 mb-1 block">Nama Kelas</label>
          <input v-model="form.name" placeholder="Contoh: Kelas Web Programing" class="input" />
        </div>
        <div>
          <label class="text-xs text-gray-400 mb-1 block">Deskripsi</label>
          <textarea v-model="form.description" placeholder="Contoh: Kelas belajar framework laravel" class="input min-h-[80px]"></textarea>
        </div>
      </div>
      <button @click="saveClass" class="btn-primary mt-6" :disabled="isSubmitting">
        {{ isSubmitting ? 'Memproses...' : 'Tambah Kelas' }}
      </button>
    </div>

    <!-- LIST -->
    <div v-if="isLoading" class="text-center py-10 text-gray-400">Loading data kelas...</div>
    <div v-else class="grid md:grid-cols-2 gap-4">
      <div v-for="item in classes" :key="item.id" class="card hover:scale-[1.01]">
        <h3 class="font-bold text-white mb-1">{{ item.name }}</h3>
        <p class="text-sm text-gray-400">{{ item.description }}</p>
        <p class="text-[10px] text-gray-500 mt-3 italic">ID: {{ item.id }} • {{ new Date(item.created_at).toLocaleDateString() }}</p>
      </div>
      <div v-if="classes.length === 0" class="col-span-2 text-center text-gray-500 py-10">Belum ada data kelas 😢</div>
    </div>
  </div>
</template>

<style scoped>
.card { @apply bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition duration-300; }
.input { @apply w-full p-3 bg-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm text-white; }
.btn-primary { @apply px-8 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl transition text-sm font-bold shadow-lg shadow-blue-500/20; }
</style>
