<script setup>
const staffTasks = [
  {
    title: 'Manage Event',
    desc: 'Kelola kegiatan'
  },
  {
    title: 'Support Mentor',
    desc: 'Bantu mentor'
  }
]
</script>

<template>
  <section class="page">

    <h1 class="title text-green-400">Staff Dashboard</h1>

    <div class="grid md:grid-cols-2 gap-6">
      <div 
        v-for="item in staffTasks"
        :key="item.title"
        class="card"
      >
        <h2>{{ item.title }}</h2>
        <p class="text-gray-400">{{ item.desc }}</p>
      </div>
    </div>

  </section>
</template>

<style scoped>
.page { @apply p-6 text-white }
.title { @apply text-2xl font-bold mb-6 }
.card { @apply bg-white/5 p-6 rounded-xl border border-white/10 }
</style>