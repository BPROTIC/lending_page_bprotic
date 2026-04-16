<script setup>
import { onMounted, onUnmounted } from 'vue'

const handleScroll = () => {
  const scrollY = window.scrollY

  const glow1 = document.getElementById('glow1')
  const glow2 = document.getElementById('glow2')

  if (glow1) {
    glow1.style.transform = `translate(-50%, ${scrollY * 0.3}px)`
  }

  if (glow2) {
    glow2.style.transform = `translateY(${scrollY * 0.2}px)`
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <section 
    id="home" 
    class="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-black text-white px-6 overflow-hidden"
  >

    <!-- CONTENT -->
    <div class="text-center max-w-2xl relative z-10">

      <!-- LABEL -->
      <p class="text-blue-400 text-sm tracking-widest uppercase mb-4">
        Biprotik
      </p>

      <!-- TITLE -->
      <h1 class="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
        Build Your Future <br />
        With Technology 
      </h1>

      <!-- SUBTITLE -->
      <p class="text-gray-400 text-lg mb-10">
        Komunitas mahasiswa yang berfokus pada teknologi, inovasi, dan pengembangan skill digital.
      </p>

      <!-- BUTTON -->
      <div class="flex justify-center gap-4 flex-wrap">

        <!-- LOGIN -->
        <router-link to="/login">
          <button 
            class="bg-blue-600 px-7 py-3 rounded-full font-semibold hover:bg-blue-700 hover:scale-105 transition duration-300 shadow-lg"
          >
            Gabung Sekarang
          </button>
        </router-link>

        <!-- SCROLL -->
        <a href="#about">
          <button 
            class="border border-gray-500 px-7 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition duration-300"
          >
            Pelajari Lebih
          </button>
        </a>

      </div>

    </div>

    <!-- GLOW 1 (CENTER) -->
    <div 
      id="glow1"
      class="absolute w-96 h-96 bg-blue-500/20 blur-3xl rounded-full top-20 left-1/2 -translate-x-1/2 pointer-events-none transition-transform duration-75"
    ></div>

    <!-- GLOW 2 (BOTTOM RIGHT) -->
    <div 
      id="glow2"
      class="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full pointer-events-none transition-transform duration-75"
    ></div>

  </section>
</template>