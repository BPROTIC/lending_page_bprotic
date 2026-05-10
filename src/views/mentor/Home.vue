<template>
  <div class="max-w-5xl">
    <h1 class="text-3xl font-bold mb-6">Dashboard Mentor</h1>
    <div class="grid md:grid-cols-3 gap-6">
      <div class="card">
        <p class="text-gray-400 text-sm">Total Materi</p>
        <h2 class="text-2xl font-bold text-blue-400">12</h2>
      </div>
      <div class="card">
        <p class="text-gray-400 text-sm">Kelas Diampu</p>
        <h2 class="text-2xl font-bold text-green-400">3</h2>
      </div>
      <div class="card">
        <p class="text-gray-400 text-sm">Mahasiswa</p>
        <h2 class="text-2xl font-bold text-purple-400">45</h2>
      </div>
    </div>
    
    <div class="mt-10">
      <h3 class="text-xl font-bold mb-4 text-gray-300">Aksi Cepat</h3>
      <button @click="$router.push('/mentor/materials')" class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition">
        Tambah Materi Baru
      </button>
    </div>
  </div>
</template>

<style scoped>
.card { @apply bg-white/5 p-6 rounded-2xl border border-white/10; }
</style>
