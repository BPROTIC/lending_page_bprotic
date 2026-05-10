<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()

const news = ref(null)
const isLoading = ref(false)

const fetchNewsDetail = async () => {
  isLoading.value = true
  try {
    const response = await fetch(`/api/news/${route.params.id}`)
    const result = await response.json()
    if (result.success) {
      news.value = result.data
    }
  } catch (error) {
    console.error('Error fetching news detail:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchNewsDetail()
})
</script>

<template>
  <section class="min-h-screen bg-[#050B18] text-white px-6 py-20">

    <div class="max-w-3xl mx-auto">
      <button @click="router.back()" class="mb-8 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition group">
        <span class="group-hover:-translate-x-1 transition">←</span> Kembali ke Berita
      </button>

      <!-- ✅ LOADING STATE -->
      <div v-if="isLoading" class="text-center py-20">
        <div class="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full mb-4 text-blue-500"></div>
        <p class="text-gray-400">Memuat detail berita...</p>
      </div>

      <!-- ✅ JIKA DATA ADA -->
      <div v-else-if="news">
        <img 
          :src="news.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop'" 
          class="w-full h-[400px] object-cover rounded-2xl mb-8 shadow-2xl shadow-blue-500/10" 
        />

        <div class="flex items-center gap-3 mb-4">
          <span class="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase rounded-full border border-blue-500/20">
            Published
          </span>
          <p class="text-gray-400 text-xs">
            {{ new Date(news.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}
          </p>
        </div>

        <h1 class="text-4xl font-extrabold mb-6 leading-tight">
          {{ news.title }}
        </h1>

        <div class="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-4">
          {{ news.content }}
        </div>
      </div>

      <!-- 🔥 DATA TIDAK DITEMUKAN -->
      <div v-else class="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
        <p class="text-xl text-gray-400">Berita tidak ditemukan atau sudah dihapus 😢</p>
        <button @click="router.push('/news')" class="mt-4 text-blue-400 hover:underline text-sm">
          Lihat Berita Lainnya
        </button>
      </div>
    </div>

  </section>
</template>