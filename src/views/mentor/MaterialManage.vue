<script setup>
import { ref, onMounted } from 'vue'

const form = ref({ classId: 2, title: '', content: '' })
const isSubmitting = ref(false)
const token = localStorage.getItem('token')

const saveMaterial = async () => {
  if (!form.value.title || !form.value.content || !form.value.classId) return
  
  isSubmitting.value = true
  try {
    const response = await fetch(`/api/mentor/classes/${form.value.classId}/materials`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: form.value.title,
        content: form.value.content
      })
    })

    const result = await response.json()
    if (result.success) {
      alert(result.message)
      form.value.title = ''
      form.value.content = ''
    } else {
      alert(result.message || 'Gagal menambahkan materi')
    }
  } catch (error) {
    console.error('Error saving material:', error)
    alert('Terjadi kesalahan koneksi')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl">
    <div class="mb-8">
      <h2 class="text-2xl font-extrabold text-blue-400">Tambah Materi Pembelajaran</h2>
      <p class="text-gray-400 text-sm mt-1">Bagikan materi baru ke kelas kamu</p>
    </div>

    <div class="card">
      <div class="space-y-4">
        <div class="w-full md:w-1/4">
          <label class="text-xs text-gray-400 mb-1 block">ID Kelas</label>
          <input 
            type="number" 
            v-model="form.classId" 
            class="input" 
            placeholder="Contoh: 2"
          />
        </div>

        <div>
          <label class="text-xs text-gray-400 mb-1 block">Judul Materi</label>
          <input 
            v-model="form.title" 
            placeholder="Contoh: Pengenalan Interface" 
            class="input" 
          />
        </div>

        <div>
          <label class="text-xs text-gray-400 mb-1 block">Isi Materi</label>
          <textarea 
            v-model="form.content" 
            placeholder="Tulis materi lengkap di sini..." 
            class="input min-h-[200px]"
          ></textarea>
        </div>
      </div>

      <button 
        @click="saveMaterial" 
        class="btn-primary mt-6 w-full md:w-auto"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Mengirim...' : 'Tambah Materi' }}
      </button>
    </div>

    <!-- TIPS -->
    <div class="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
      <p class="text-xs text-blue-400 leading-relaxed">
        <strong>Tips:</strong> Pastikan ID Kelas yang dimasukkan benar. Materi yang kamu tambahkan akan langsung dapat diakses oleh semua mahasiswa yang terdaftar di kelas tersebut.
      </p>
    </div>
  </div>
</template>

<style scoped>
.card { @apply bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition duration-300; }
.input { @apply w-full p-3 bg-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm text-white; }
.btn-primary { @apply px-8 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl transition text-sm font-bold shadow-lg shadow-blue-500/20; }
</style>
