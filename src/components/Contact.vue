<script setup>
import { Instagram, MessageCircle } from 'lucide-vue-next'
</script>

<template>
  <section 
    id="contact" 
    class="relative py-24 px-6 bg-gradient-to-b from-blue-950 via-blue-900 to-black text-white text-center overflow-hidden"
  >

    <!-- CONTENT -->
    <div class="max-w-3xl mx-auto relative z-10">

      <!-- LABEL -->
      <p 
        data-aos="fade-up"
        class="text-blue-400 text-sm tracking-widest uppercase mb-4"
      >
        Join Biprotik
      </p>

      <!-- TITLE -->
      <h2 
        data-aos="fade-up"
        data-aos-delay="100"
        class="text-3xl md:text-5xl font-extrabold mb-6 leading-tight"
      >
        Siap Berkembang di Dunia Teknologi?
      </h2>

      <!-- DESC -->
      <p 
        data-aos="fade-up"
        data-aos-delay="200"
        class="text-base md:text-lg text-gray-400 mb-12 max-w-xl mx-auto"
      >
        Jangan lewatkan kesempatan untuk belajar dan berkembang bersama komunitas teknologi terbaik.
      </p>

      <!-- CARDS -->
      <div class="grid md:grid-cols-2 gap-6">

      </div>

    </div>

    <!-- GLOW -->
    <div class="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 blur-3xl rounded-full pointer-events-none"></div>

  </section>
</template>