<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const news = [
  {
    id: 1,
    title: "Workshop Vue untuk Pemula",
    date: "10 April 2026",
    image: "/images/news1.jpg"
  },
  {
    id: 2,
    title: "Pelatihan Machine Learning",
    date: "5 April 2026",
    image: "/images/news2.jpg"
  },
  {
    id: 3,
    title: "Pengembangan IoT Project",
    date: "1 April 2026",
    image: "/images/news3.jpg"
  }
]
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
        Informasi terbaru kegiatan dan perkembangan Biprotik
      </p>
    </div>

    <!-- GRID -->
    <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

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
            :src="item.image"
            class="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
          />

          <!-- OVERLAY -->
          <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition"></div>

          <!-- BADGE -->
          <span class="absolute top-3 left-3 text-xs bg-blue-500 px-2 py-1 rounded-md">
            News
          </span>

        </div>

        <!-- CONTENT -->
        <div class="p-5">

          <p class="text-blue-400 text-xs mb-2">
            {{ item.date }}
          </p>

          <h3 class="text-lg font-semibold leading-snug group-hover:text-blue-400 transition">
            {{ item.title }}
          </h3>

          <!-- LINE -->
          <div class="w-8 h-[2px] bg-blue-500 mt-3 opacity-60 group-hover:w-12 transition-all"></div>

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