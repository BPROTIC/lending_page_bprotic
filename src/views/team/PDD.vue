<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const dataPDD = [
  {
    title: 'Data Peserta',
    desc: '120 Mahasiswa',
    path: '/pdd-data', // FLAT PATH
    color: 'text-blue-400'
  },
  {
    title: 'Program Aktif',
    desc: '5 Program',
    path: null,
    color: 'text-green-400'
  },
  {
    title: 'Analisis',
    desc: 'Data siap digunakan',
    path: '/pdd-analytics', // FLAT PATH
    color: 'text-purple-400'
  }
]
</script>

<template>
  <section class="page">

    <h1 class="title text-purple-400">PDD Dashboard</h1>

    <div class="grid md:grid-cols-3 gap-6">
      <div 
        v-for="item in dataPDD"
        :key="item.title"
        @click="item.path ? router.push(item.path) : null"
        :class="['card', item.path ? 'cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/5 transition duration-300' : '']"
      >
        <h2 class="font-semibold text-lg" :class="item.color">
          {{ item.title }}
        </h2>

        <p class="text-gray-400 mt-2">
          {{ item.desc }}
        </p>
        
        <p v-if="item.path" class="text-[10px] text-purple-500 mt-4 font-bold uppercase tracking-widest">
          Klik untuk detail →
        </p>
      </div>
    </div>

    <!-- INFO BOX -->
    <div class="mt-10 p-6 bg-purple-600/10 border border-purple-500/20 rounded-2xl">
      <h3 class="font-bold text-purple-300 mb-2">Selamat Datang di PDD Panel</h3>
      <p class="text-sm text-gray-400 leading-relaxed">
        Gunakan menu di sebelah kiri atau klik kartu di atas untuk mengelola data peserta dan melihat analisis pertumbuhan UKM BPROTIC.
      </p>
    </div>

  </section>
</template>

<style scoped>
.page { @apply text-white }
.title { @apply text-3xl font-extrabold mb-8 tracking-tight }
.card { @apply bg-white/5 p-8 rounded-2xl border border-white/10 shadow-lg shadow-black/20 }
</style>