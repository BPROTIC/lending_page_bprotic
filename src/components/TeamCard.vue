<script setup>
defineProps({
  name: String,
  role: String,
  image: String
})
</script>

<template>
  <div class="group bg-white/5 backdrop-blur-xl border border-white/10 
              rounded-2xl p-6 text-center hover:scale-105 transition duration-300
              hover:shadow-glow">

    <!-- AVATAR -->
    <img 
      :src="image"
      class="w-20 h-20 rounded-full mx-auto mb-4 object-cover border border-white/20 
             group-hover:scale-110 transition duration-300"
    />

    <!-- NAME -->
    <h3 class="font-semibold text-lg text-white">
      {{ name }}
    </h3>

    <!-- ROLE -->
    <p class="text-sm text-gray-400 mt-1">
      {{ role }}
    </p>

    <!-- BADGE (BIAR KELIHATAN DASHBOARD STYLE) -->
    <span class="inline-block mt-3 text-xs px-3 py-1 rounded-full 
                 bg-blue-500/20 text-blue-300">
      Mentor
    </span>

  </div>
</template>