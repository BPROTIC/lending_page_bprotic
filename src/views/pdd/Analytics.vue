<script setup>
// Komponen Analytics PDD
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-purple-400 mb-6">PDD Analytics</h1>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white/5 border border-white/10 p-6 rounded-2xl">
        <h3 class="text-gray-400 text-sm mb-2">Pertumbuhan Peserta</h3>
        <div class="h-32 bg-purple-500/10 rounded-xl flex items-end p-2 gap-1">
          <div class="flex-1 bg-purple-500/40 rounded-t h-1/2"></div>
          <div class="flex-1 bg-purple-500/40 rounded-t h-2/3"></div>
          <div class="flex-1 bg-purple-500/40 rounded-t h-full"></div>
          <div class="flex-1 bg-purple-500/40 rounded-t h-3/4"></div>
        </div>
      </div>
      <div class="bg-white/5 border border-white/10 p-6 rounded-2xl">
        <h3 class="text-gray-400 text-sm mb-2">Program Terpopuler</h3>
        <div class="space-y-3 mt-4">
          <div class="flex justify-between text-xs">
            <span>Web Dev</span>
            <span>70%</span>
          </div>
          <div class="w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <div class="bg-purple-500 w-[70%] h-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>