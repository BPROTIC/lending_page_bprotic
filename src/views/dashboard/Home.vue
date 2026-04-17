<script setup>
import { ref, onMounted } from 'vue'

const user = ref({})

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem('user')) || {}
})
</script>

<template>
  <div class="space-y-6">

    <!-- PROGRAM -->
    <div class="card">
      <h2 class="text-xl font-bold text-blue-400">
        {{ user.class }}
      </h2>
      <p class="text-gray-400">Program yang kamu ikuti</p>
    </div>

    <!-- EVENT -->
    <div v-if="user.joinedEvents?.length" class="card">
      <h3 class="font-semibold mb-3">Event Kamu</h3>

      <div v-for="e in user.joinedEvents" :key="e.id" class="mb-3">

        <p>{{ e.title }}</p>

        <div class="w-full bg-gray-700 h-2 rounded mt-1">
          <div 
            class="bg-green-400 h-2 rounded"
            :style="{ width: e.progress + '%' }"
          ></div>
        </div>

        <p class="text-xs text-gray-400">
          {{ e.progress }}%
        </p>

      </div>

    </div>

  </div>
</template>

<style scoped>
.card { @apply bg-white/5 p-5 rounded-xl border border-white/10 }
</style>