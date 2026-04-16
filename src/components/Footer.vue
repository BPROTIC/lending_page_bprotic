<script setup>
import { Instagram, MessageCircle, Mail } from 'lucide-vue-next'
</script>

<template>
  <footer class="relative bg-gradient-to-b from-black via-blue-950 to-black text-white py-14 px-8 overflow-hidden">

    <!-- 🔥 GLOW -->
    <div class="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
    <div class="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>

    <div class="relative max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

      <!-- BRAND -->
      <div>
        <h2 class="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          Biprotik
        </h2>

        <p class="text-gray-400 mt-3 text-sm leading-relaxed">
          Wadah mahasiswa teknologi dan inovasi untuk berkembang di era digital, 
          fokus pada pengembangan skill dan kolaborasi.
        </p>
      </div>

      <!-- NAVIGATION -->
      <div>
        <h3 class="font-semibold mb-3 text-white">Navigation</h3>

        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="#home" class="hover:text-blue-400 transition">Home</a></li>
          <li><a href="#about" class="hover:text-blue-400 transition">About</a></li>
          <li><a href="#program" class="hover:text-blue-400 transition">Program</a></li>
          <li><a href="#news" class="hover:text-blue-400 transition">Berita</a></li>
        </ul>
      </div>

      <!-- SOCIAL -->
      <div>
        <h3 class="font-semibold mb-3 text-white">Connect</h3>

        <div class="flex gap-4">

          <!-- Instagram -->
          <a 
            href="#"
            class="p-3 rounded-xl bg-white/5 border border-white/10 
                   hover:bg-blue-500 transition"
          >
            <Instagram size="18" />
          </a>

          <!-- WhatsApp -->
          <a 
            href="#"
            class="p-3 rounded-xl bg-white/5 border border-white/10 
                   hover:bg-green-500 transition"
          >
            <MessageCircle size="18" />
          </a>

          <!-- Email -->
          <a 
            href="#"
            class="p-3 rounded-xl bg-white/5 border border-white/10 
                   hover:bg-indigo-500 transition"
          >
            <Mail size="18" />
          </a>

        </div>
      </div>

    </div>

    <!-- COPYRIGHT -->
    <div class="relative text-center text-gray-500 mt-12 border-t border-white/10 pt-4 text-sm">
      © 2026 Biprotik. All rights reserved.
    </div>

  </footer>
</template>