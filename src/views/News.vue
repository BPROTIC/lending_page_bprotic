<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const search = ref('')
const selectedCategory = ref('All')

const categories = ['All', 'Web Dev', 'Machine Learning', 'IoT']

const news = ref([
  {
    id: 1,
    title: "Workshop Vue",
    category: "Web Dev",
    date: "10 April 2026",
    image: "/images/news1.jpg",
    description: "Belajar Vue dasar"
  },
  {
    id: 2,
    title: "Pelatihan ML",
    category: "Machine Learning",
    date: "5 April 2026",
    image: "/images/news2.jpg",
    description: "Belajar ML"
  },
  {
    id: 3,
    title: "Project IoT",
    category: "IoT",
    date: "1 April 2026",
    image: "/images/news3.jpg",
    description: "Project sensor"
  }
])

const filteredNews = computed(() => {
  return news.value.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(search.value.toLowerCase())
    const matchCategory = selectedCategory.value === 'All' || item.category === selectedCategory.value
    return matchSearch && matchCategory
  })
})
</script>

<template>
  <section class="relative min-h-screen py-28 px-6 bg-gradient-to-b from-blue-950 via-blue-900 to-black text-white overflow-hidden">

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
    <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

      <div 
        v-for="item in filteredNews" 
        :key="item.id"
        class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden 
               hover:-translate-y-2 hover:shadow-2xl transition duration-300 cursor-pointer"
      >

        <!-- IMAGE -->
        <div class="overflow-hidden">
          <img 
            :src="item.image" 
            class="h-44 w-full object-cover hover:scale-110 transition duration-500"
          />
        </div>

        <!-- CONTENT -->
        <div class="p-5">

          <p class="text-xs text-blue-400 mb-2">
            {{ item.date }}
          </p>

          <h2 class="font-semibold text-lg mb-2">
            {{ item.title }}
          </h2>

          <p class="text-gray-400 text-sm mb-4">
            {{ item.description }}
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

  </section>
</template>