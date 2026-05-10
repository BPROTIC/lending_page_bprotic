<script setup>
import TeamCard from '../../components/TeamCard.vue'

const mentors = [
  {
    name: 'Faraz',
    role: 'Web Development Mentor',
    image: '/images/reza.jpeg'
  },
  {
    name: 'Sultan',
    role: 'Machine Learning Mentor',
    image: '/images/reza.jpeg'
  }
]
</script>

<template>
  <section class="page">

    <h1 class="title text-blue-400">Mentor</h1>

    <div class="grid md:grid-cols-3 gap-6">
      <TeamCard 
        v-for="m in mentors"
        :key="m.name"
        :name="m.name"
        :role="m.role"
        :image="m.image"
      />
    </div>

  </section>
</template>

<style scoped>
.page { @apply p-6 text-white }
.title { @apply text-2xl font-bold mb-6 }
</style>