<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// ✅ HANYA SATU
const id = Number(route.params.id)

const newsData = [
  {
    id: 1,
    title: "Workshop Vue",
    date: "10 April 2026",
    image: "/images/news1.jpg",
    content: "Materi lengkap Vue..."
  },
  {
    id: 2,
    title: "Pelatihan ML",
    date: "5 April 2026",
    image: "/images/news2.jpg",
    content: "Materi Machine Learning..."
  },
  {
    id: 3,
    title: "Project IoT",
    date: "1 April 2026",
    image: "/images/news2.jpg",
    content: "IoT..."
  }
]

const news = newsData.find(n => n.id === id)
</script>

<template>
  <section class="min-h-screen bg-[#050B18] text-white px-6 py-20">

  <!-- ✅ JIKA DATA ADA -->
  <div v-if="news" class="max-w-3xl mx-auto">

    <button @click="router.back()" class="mb-4 text-blue-400">
      ← Kembali
    </button>

    <img :src="news.image" class="rounded-xl mb-6" />

    <p class="text-blue-400 text-sm">{{ news.date }}</p>

    <h1 class="text-3xl font-bold mb-4">
      {{ news.title }}
    </h1>

    <p class="text-gray-300">
      {{ news.content }}
    </p>

  </div>

  <!-- 🔥 TAMBAHKAN DI SINI -->
  <div v-else class="text-center text-white mt-20">
    <p class="text-xl">Berita tidak ditemukan 😢</p>
  </div>

</section>
</template>