<script setup>
import { ref } from 'vue'

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
  <div>
    <h2 class="text-xl font-semibold mb-6">Berita Terbaru</h2>

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
</template>

<style scoped>
.card {
  @apply bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition;
}
</style>