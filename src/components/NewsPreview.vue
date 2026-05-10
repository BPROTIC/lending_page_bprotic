<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { mockNews } from '../utils/mockData'

const router = useRouter()
const news = ref([])
const isLoading = ref(true)

const fetchLatestNews = async () => {
  isLoading.value = true
  try {
    const response = await fetch('/api/news')
    const result = await response.json()
    if (result.success && result.data.length > 0) {
      news.value = result.data.slice(0, 3)
    } else {
      news.value = mockNews.slice(0, 3)
    }
  } catch (error) {
    console.error('API Error, using mock data:', error)
    news.value = mockNews.slice(0, 3)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchLatestNews()
})
</script>

<template>
  <section 
    id="news"
    class="relative py-28 px-6 bg-gradient-to-b from-blue-950 via-blue-900 to-black text-white overflow-hidden"
  >

    <!-- 🔥 GLOW -->
    <div class="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
    <div class="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>

    <!-- HEADER -->
    <div class="text-center mb-16">
      <p class="text-blue-400 text-sm uppercase tracking-widest mb-2">
        Update Terbaru
      </p>

      <h2 class="text-4xl md:text-5xl font-extrabold mb-3">
        Berita Biprotik
      </h2>

      <p class="text-gray-400 text-sm">
        Informasi terbaru kegiatan dan perkembangan Bprotic
      </p>
    </div>

    <!-- GRID -->
    <div v-if="isLoading" class="text-center py-20 text-blue-400">
      <div class="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full mb-4"></div>
      <p>Mengambil berita terbaru...</p>
    </div>

    <div v-else class="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

      <div 
        v-for="item in news" 
        :key="item.id"
        class="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden 
               hover:-translate-y-3 hover:shadow-2xl transition duration-300 cursor-pointer"
        @click="router.push(`/news/${item.id}`)"
      >

        <!-- IMAGE -->
        <div class="relative overflow-hidden">

          <img 
            :src="item.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop'"
            class="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
          />

          <!-- OVERLAY -->
          <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition"></div>

          <!-- BADGE -->
          <span class="absolute top-3 left-3 text-[10px] font-bold bg-blue-600 px-2 py-1 rounded-md uppercase tracking-tighter">
            News
          </span>

        </div>

        <!-- CONTENT -->
        <div class="p-5">

          <p class="text-blue-400 text-[10px] font-semibold mb-2 uppercase">
            {{ new Date(item.created_at || item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}
          </p>

          <h3 class="text-lg font-bold leading-snug group-hover:text-blue-400 transition line-clamp-2">
            {{ item.title }}
          </h3>

          <!-- ringkasan -->
          <p class="text-xs text-gray-400 mt-2 line-clamp-2">
            {{ item.content || 'Klik untuk melihat detail berita terbaru dari Biprotik...' }}
          </p>

          <!-- LINE -->
          <div class="w-8 h-[2px] bg-blue-500 mt-4 opacity-60 group-hover:w-12 transition-all"></div>

        </div>

      </div>

    </div>

    <!-- BUTTON -->
    <div class="text-center mt-14">
      <button 
        @click="router.push('/news')"
        class="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 
               rounded-xl font-semibold shadow-lg 
               hover:scale-105 hover:shadow-blue-500/30 transition"
      >
        Lihat Semua Berita 
      </button>
    </div>

  </section>
</template>