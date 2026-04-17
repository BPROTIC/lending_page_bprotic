<script setup>
import { ref, onMounted } from 'vue'

const user = ref({})
const certificates = ref([])

onMounted(() => {
  const data = JSON.parse(localStorage.getItem('user')) || {}
  user.value = data

  certificates.value = (data.joinedEvents || []).filter(e => e.completed)
})
</script>

<template>
  <div>

    <h2 class="text-xl font-bold mb-6 text-green-400">
      Sertifikat Kamu
    </h2>

    <div v-if="certificates.length === 0" class="text-gray-400">
      Belum ada sertifikat 😢
    </div>

    <div class="grid md:grid-cols-2 gap-6">

      <div 
        v-for="c in certificates" 
        :key="c.id"
        class="card text-center"
      >
        <h3 class="text-lg font-bold mb-2">
          Sertifikat {{ c.title }}
        </h3>

        <p class="text-gray-400 text-sm mb-4">
          Diberikan kepada
        </p>

        <p class="text-blue-400 font-semibold text-lg">
          {{ user.name }}
        </p>

        <p class="text-xs text-gray-500 mt-2">
          Telah menyelesaikan program
        </p>

        <p class="text-green-400 mt-1">
          {{ c.title }}
        </p>

        <!-- DOWNLOAD (SIMULASI) -->
        <button class="btn mt-4">
          Download
        </button>

      </div>

    </div>

  </div>
</template>

<style scoped>
.card { @apply bg-white/5 p-6 rounded-xl border border-white/10 }
.btn { @apply px-4 py-2 bg-green-500 rounded }
</style>