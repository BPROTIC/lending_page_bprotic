<script setup>
import { ref, onMounted } from 'vue'

const events = ref([
  { id: 1, title: "Workshop Web", desc: "Vue + Tailwind" },
  { id: 2, title: "Seminar AI", desc: "Machine Learning" }
])

const joinedEvents = ref([])

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user')) || {}
  joinedEvents.value = user.joinedEvents || []
})

// JOIN
const joinEvent = (event) => {
  const user = JSON.parse(localStorage.getItem('user')) || {}

  if (!user.joinedEvents) user.joinedEvents = []

  if (user.joinedEvents.find(e => e.id === event.id)) return

  user.joinedEvents.push({
    ...event,
    progress: 0,
    completed: false
  })

  localStorage.setItem('user', JSON.stringify(user))
  joinedEvents.value = user.joinedEvents
}

// UPDATE PROGRESS
const updateProgress = (id) => {
  const user = JSON.parse(localStorage.getItem('user')) || {}

  user.joinedEvents = user.joinedEvents.map(e => {
    if (e.id === id) {
      const newProgress = Math.min(e.progress + 20, 100)

      return {
        ...e,
        progress: newProgress,
        completed: newProgress === 100
      }
    }
    return e
  })

  localStorage.setItem('user', JSON.stringify(user))
  joinedEvents.value = user.joinedEvents
}

const isJoined = (id) => joinedEvents.value.some(e => e.id === id)
</script>

<template>
  <div>
    <h2 class="text-xl font-bold mb-6">Event</h2>

    <!-- LIST EVENT -->
    <div class="grid md:grid-cols-2 gap-6">
      <div v-for="event in events" :key="event.id" class="card">

        <h3 class="font-bold">{{ event.title }}</h3>
        <p class="text-sm text-gray-400">{{ event.desc }}</p>

        <button 
          v-if="!isJoined(event.id)"
          @click="joinEvent(event)"
          class="btn mt-3"
        >
          Ikuti
        </button>

      </div>
    </div>

    <!-- PROGRESS -->
    <div v-if="joinedEvents.length" class="mt-10">
      <h3 class="text-blue-400 mb-4">Progress Kamu</h3>

      <div v-for="e in joinedEvents" :key="e.id" class="card mb-4">

        <p>{{ e.title }}</p>

        <div class="w-full bg-gray-700 h-2 rounded mt-2">
          <div 
            class="bg-blue-500 h-2 rounded"
            :style="{ width: e.progress + '%' }"
          ></div>
        </div>

        <p class="text-xs text-gray-400 mt-1">
          {{ e.progress }}%
        </p>

        <button 
          @click="updateProgress(e.id)"
          class="btn mt-2"
        >
          Tambah Progress
        </button>

        <!-- ✅ STATUS -->
        <p v-if="e.completed" class="text-green-400 mt-2">
          ✔ Selesai
        </p>

      </div>
    </div>

  </div>
</template>

<style scoped>
.card { @apply bg-white/5 p-5 rounded-xl border border-white/10 }
.btn { @apply px-3 py-1 bg-blue-500 rounded }
</style>