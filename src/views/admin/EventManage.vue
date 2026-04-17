<script setup>
import { ref, onMounted } from 'vue'

const events = ref([])
const form = ref({ title: '', desc: '' })
const editIndex = ref(null)

// LOAD DATA
onMounted(() => {
  events.value = JSON.parse(localStorage.getItem('events')) || []
})

// SAVE / ADD / UPDATE
const saveEvent = () => {
  if (!form.value.title || !form.value.desc) return

  if (editIndex.value !== null) {
    events.value[editIndex.value] = { ...form.value }
    editIndex.value = null
  } else {
    events.value.push({ ...form.value })
  }

  localStorage.setItem('events', JSON.stringify(events.value))
  form.value = { title: '', desc: '' }
}

// EDIT
const editEvent = (index) => {
  form.value = { ...events.value[index] }
  editIndex.value = index
}

// DELETE
const deleteEvent = (index) => {
  events.value.splice(index, 1)
  localStorage.setItem('events', JSON.stringify(events.value))
}
</script>

<template>
  <div>
    <h2 class="title">Kelola Event</h2>

    <!-- FORM -->
    <div class="card mb-6">
      <input v-model="form.title" placeholder="Judul Event" class="input"/>
      <input v-model="form.desc" placeholder="Deskripsi" class="input mt-2"/>

      <button @click="saveEvent" class="btn mt-3">
        {{ editIndex !== null ? 'Update' : 'Tambah' }}
      </button>
    </div>

    <!-- LIST -->
    <div class="space-y-3">
      <div v-for="(e, i) in events" :key="i" class="card flex justify-between">

        <div>
          <p class="font-semibold">{{ e.title }}</p>
          <p class="text-sm text-gray-400">{{ e.desc }}</p>
        </div>

        <div class="space-x-2">
          <button @click="editEvent(i)" class="btn-blue">Edit</button>
          <button @click="deleteEvent(i)" class="btn-red">Hapus</button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.title { @apply text-xl font-bold mb-6 text-blue-400 }
.card { @apply bg-white/5 p-5 rounded-xl border border-white/10 }
.input { @apply w-full p-2 bg-white/10 rounded }
.btn { @apply px-3 py-2 bg-green-500 rounded }
.btn-blue { @apply px-2 py-1 bg-blue-500 rounded }
.btn-red { @apply px-2 py-1 bg-red-500 rounded }
</style>