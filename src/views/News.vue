<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import { mockNews } from '../utils/mockData'

const router = useRouter()

const search = ref('')
const selectedCategory = ref('All')
const isLoading = ref(false)

const categories = ['All', 'Web Dev', 'Machine Learning', 'IoT']

const news = ref([])

const fetchNews = async () => {
  isLoading.value = true
  try {
    const response = await fetch('/api/news')
    const result = await response.json()
    if (result.success && result.data.length > 0) {
      news.value = result.data
    } else {
      news.value = mockNews
    }
  } catch (error) {
    console.error('Error fetching news, using mock data:', error)
    news.value = mockNews
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchNews()
})

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

const filteredNews = computed(() => {
  return news.value.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(search.value.toLowerCase())
    const matchCategory = selectedCategory.value === 'All' 
    return matchSearch && matchCategory
  })
})
</script>

<template>
  <section class="relative min-h-screen py-28 px-6 bg-gradient-to-b from-blue-950 via-blue-900 to-black text-white overflow-hidden">
    
    <!-- 🔙 BACK BUTTON -->
    <div class="max-w-6xl mx-auto mb-6 relative z-20">
      <button 
        @click="goBack"
        class="flex items-center gap-2 text-gray-400 hover:text-white transition group"
      >
        <div class="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-blue-500 group-hover:border-blue-400 transition">
          <ArrowLeft size="18" />
        </div>
        <span class="text-sm font-medium">Kembali</span>
      </button>
    </div>

    <!-- 🔥 GLOW -->
    <div class="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
    <div class="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>

    <!-- HEADER -->
    <div class="text-center mb-12">
      <p class="text-blue-400 text-sm uppercase tracking-widest mb-2">
        News & Updates
      </p>
      <h1 class="text-4xl md:text-5xl font-extrabold">
        Berita Biprotic
      </h1>
      <p class="text-gray-400 mt-3 text-sm">
        Informasi terbaru seputar kegiatan dan pengembangan Biprotik
      </p>
    </div>

    <!-- 🔍 SEARCH -->
    <div class="max-w-xl mx-auto mb-8">
      <input 
        v-model="search"
        placeholder="Cari berita..."
        class="w-full p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 
               focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>

    <!-- 📂 CATEGORY -->
    <div class="flex justify-center gap-3 mb-12 flex-wrap">
      <button 
        v-for="cat in categories"
        :key="cat"
        @click="selectedCategory = cat"
        :class="[
          'px-4 py-1 rounded-full text-sm transition',
          selectedCategory === cat
            ? 'bg-blue-500 text-white'
            : 'bg-white/5 border border-white/10 hover:bg-blue-500'
        ]"
      >
        {{ cat }}
      </button>
    </div>

    <!-- GRID -->
    <div v-if="isLoading" class="text-center py-20 text-blue-400">
      <div class="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full mb-4"></div>
      <p>Mengambil berita terbaru...</p>
    </div>

    <div v-else class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

      <div 
        v-for="item in filteredNews" 
        :key="item.id"
        class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden 
               hover:-translate-y-2 hover:shadow-2xl transition duration-300 cursor-pointer"
      >

        <!-- IMAGE -->
        <div class="overflow-hidden">
          <img 
            :src="item.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop'" 
            class="h-44 w-full object-cover hover:scale-110 transition duration-500"
          />
        </div>

        <!-- CONTENT -->
        <div class="p-5">

          <p class="text-xs text-blue-400 mb-2">
            {{ new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}
          </p>

          <h2 class="font-semibold text-lg mb-2 line-clamp-2">
            {{ item.title }}
          </h2>

          <p class="text-gray-400 text-sm mb-4 line-clamp-3">
            {{ item.content }}
          </p>

          <button 
            @click="router.push(`/news/${item.id}`)"
            class="text-blue-400 text-sm hover:underline"
          >
            Baca Selengkapnya 
          </button>

        </div>

      </div>

    </div>

    <div v-if="!isLoading && filteredNews.length === 0" class="text-center py-20 text-gray-500">
      Belum ada berita yang tersedia.
    </div>

  </section>
</template>