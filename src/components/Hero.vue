<script setup>
import { onMounted, onUnmounted } from 'vue'

const handleScroll = () => {
  const scrollY = window.scrollY

  const glow1 = document.getElementById('glow1')
  const glow2 = document.getElementById('glow2')

  if (glow1) {
    glow1.style.transform = `translate(-50%, ${scrollY * 0.25}px)`
  }

  if (glow2) {
    glow2.style.transform = `translateY(${scrollY * 0.15}px)`
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
    class="relative flex items-center justify-center min-h-screen 
           bg-gradient-to-b from-blue-950 via-blue-900 to-black 
           text-white px-6 overflow-hidden"
  >

    <!-- 🔥 CONTENT -->
    <div class="text-center max-w-3xl relative z-10">

      <!-- TITLE -->
      <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
        Bangun Masa Depanmu <br />
        <span class="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Bersama Teknologi
        </span>
      </h1>

      <!-- SUBTITLE -->
      <p class="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
        Bprotic adalah komunitas mahasiswa yang berfokus pada pengembangan skill digital, 
        inovasi, dan kolaborasi dalam dunia teknologi modern.
      </p>

      <!-- CTA BUTTON -->
      <div class="flex justify-center gap-4 flex-wrap"> 

      </div>

    </div>

    <!-- 🔥 GLOW EFFECT -->
    <div 
      id="glow1"
      class="absolute w-[450px] h-[450px] bg-blue-500/20 blur-3xl 
             rounded-full top-20 left-1/2 -translate-x-1/2 
             pointer-events-none transition-transform duration-75"
    ></div>

    <div 
      id="glow2"
      class="absolute bottom-10 right-10 w-[350px] h-[350px] 
             bg-purple-500/20 blur-3xl rounded-full 
             pointer-events-none transition-transform duration-75"
    ></div>

    <!-- 🔥 EXTRA DEPTH -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

  </section>
</template>