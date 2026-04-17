<script setup>
import { ref, onMounted } from 'vue'

const user = ref({})

// 🔥 LOAD USER
onMounted(() => {
  user.value = JSON.parse(localStorage.getItem('user')) || {}
})

// 🔥 NEWS DATA
const news = ref([
  {
    title: "BPROTIC Adakan Workshop Baru",
    date: "10 April 2026"
  },
  {
    title: "Kolaborasi dengan Startup Tech",
    date: "5 April 2026"
  }
])
</script>

<template>
  <div class="space-y-6">

    <!-- 🔥 PROFILE CARD -->
    <div class="bg-white/5 p-6 rounded-xl border border-white/10">

      <h2 class="text-xl font-bold mb-4 text-blue-400">
        Profile Saya
      </h2>

      <div class="space-y-2 text-sm text-gray-300">
        <p><span class="text-gray-400">Nama:</span> {{ user.name }}</p>
        <p><span class="text-gray-400">Email:</span> {{ user.email }}</p>
        <p><span class="text-gray-400">NIM:</span> {{ user.nim }}</p>
        <p><span class="text-gray-400">Prodi:</span> {{ user.prodi }}</p>
        <p><span class="text-gray-400">Kelas:</span> {{ user.kelas }}</p>

        <p class="mt-2">
          <span class="text-gray-400">Program:</span> 
          <span class="text-blue-400 font-semibold">
            {{ user.class }}
          </span>
        </p>
      </div>

    </div>

    <!-- 🔥 NEWS SECTION -->
    <div>
      <h2 class="text-xl font-semibold mb-4">
        Berita Terbaru
      </h2>

      <div class="space-y-4">

        <div 
          v-for="item in news" 
          :key="item.title"
          class="card"
        >
          <p class="text-blue-400 text-sm">{{ item.date }}</p>
          <h3 class="font-semibold">{{ item.title }}</h3>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
.card {
  @apply bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition;
}
</style>