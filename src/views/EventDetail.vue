<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const id = Number(route.params.id)

const events = [
  {
    id: 1,
    title: "Workshop Web",
    date: "10 April 2026",
    image: "/images/news1.jpg",
    content: "Belajar membuat website modern menggunakan Vue dan Tailwind."
  },
  {
    id: 2,
    title: "Seminar Teknologi",
    date: "15 April 2026",
    image: "/images/news2.jpg",
    content: "Diskusi bersama praktisi teknologi."
  },
  {
    id: 3,
    title: "Pelatihan Skill",
    date: "20 April 2026",
    image: "/images/news3.jpg",
    content: "Meningkatkan skill mahasiswa."
  }
]

const event = events.find(e => e.id === id)
</script>

<template>
  <section class="min-h-screen bg-gradient-to-b from-blue-950 to-black text-white py-24 px-6">

    <div v-if="event" class="max-w-3xl mx-auto">

      <button @click="router.back()" class="text-blue-400 mb-6">
        ← Kembali
      </button>

      <img :src="event.image" class="rounded-xl mb-6" />

      <p class="text-blue-400 text-sm">{{ event.date }}</p>

      <h1 class="text-3xl font-bold mb-4">
        {{ event.title }}
      </h1>

      <p class="text-gray-300">
        {{ event.content }}
      </p>

    </div>

  </section>
</template>