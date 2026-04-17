<script setup>
const emit = defineEmits(['selected'])

const pilih = (cls) => {
  const user = JSON.parse(localStorage.getItem('user')) || {}
  user.class = cls
  localStorage.setItem('user', JSON.stringify(user))

  emit('selected')
}
</script>

<template>
  <div class="grid md:grid-cols-3 gap-6">

    <div class="card" @click="pilih('Web Development')">Web Development</div>
    <div class="card" @click="pilih('Machine Learning')">Machine Learning</div>
    <div class="card" @click="pilih('IoT')">IoT</div>

  </div>
</template>

<style scoped>
.card { @apply bg-white/5 p-6 text-center rounded-xl cursor-pointer hover:bg-blue-500 }
</style>