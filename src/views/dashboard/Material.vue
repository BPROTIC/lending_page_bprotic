<script setup>
import { ref, onMounted } from 'vue'

const materials = ref([])
const isLoading = ref(false)
const token = localStorage.getItem('token')

const fetchMaterials = async () => {
  const user = JSON.parse(localStorage.getItem('user')) || {}
  // Gunakan ID kelas dari user, default ke 2 sesuai contoh curl jika tidak ada
  const classId = user.class?.id || 2 

  isLoading.value = true
  try {
    const response = await fetch(`/api/classes/${classId}/materials`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const result = await response.json()
    if (result.success) {
      materials.value = result.data
    }
  } catch (error) {
    console.error('Error fetching materials:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchMaterials()
})
</script>

<template>
  <div class="max-w-5xl mx-auto">
    
    <!-- HEADER -->
    <div class="mb-10">
      <h2 class="text-3xl font-extrabold text-blue-400">Materi Pembelajaran</h2>
      <p class="text-gray-400 mt-2">Daftar materi yang tersedia untuk kelas kamu.</p>
    </div>

    <!-- LOADING -->
    <div v-if="isLoading" class="text-center py-20">
      <div class="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full text-blue-500 mb-4"></div>
      <p class="text-gray-400">Memuat materi...</p>
    </div>

    <!-- LIST -->
    <div v-else class="space-y-6">
      
      <div 
        v-for="item in materials" 
        :key="item.id"
        class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition duration-300"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-xl font-bold text-white mb-1">{{ item.title }}</h3>
            <p class="text-xs text-blue-400">
              Diposting pada: {{ new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}
            </p>
          </div>
          <span class="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase rounded-full border border-blue-500/20">
            Modul {{ item.id }}
          </span>
        </div>

        <div class="prose prose-invert max-w-none text-gray-300 leading-relaxed text-sm">
          {{ item.content }}
        </div>

        <div class="mt-6 pt-4 border-t border-white/5 flex justify-end">
          <button class="text-blue-400 text-sm font-semibold hover:underline">
            Tandai Selesai
          </button>
        </div>
      </div>

      <!-- EMPTY -->
      <div v-if="materials.length === 0" class="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
        <p class="text-gray-500 text-lg">Belum ada materi untuk kelas ini 😢</p>
      </div>

    </div>

  </div>
</template>

<style scoped>
.prose { white-space: pre-line; }
</style>
