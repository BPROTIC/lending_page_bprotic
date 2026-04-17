<script setup>
import { Code, Brain, Palette } from 'lucide-vue-next'
</script>

<template>
  <section 
    id="program" 
    class="relative py-24 px-6 bg-gradient-to-b from-blue-950 via-blue-900 to-black text-white text-center overflow-hidden"
  >

    <div class="max-w-6xl mx-auto">

      <!-- LABEL -->
      <p 
        data-aos="fade-up"
        class="text-blue-400 text-sm tracking-widest uppercase mb-4"
      >
        Program Kami
      </p>

      <!-- TITLE -->
      <h2 
        data-aos="fade-up"
        data-aos-delay="100"
        class="text-4xl md:text-5xl font-extrabold mb-6"
      >
        Kembangkan Skill Teknologi Anda
      </h2>

      <!-- DESC -->
      <p 
        data-aos="fade-up"
        data-aos-delay="200"
        class="text-gray-400 max-w-2xl mx-auto mb-16"
      >
        Bprotic menyediakan berbagai program untuk membantu mahasiswa mengembangkan kemampuan teknologi secara praktis dan profesional.
      </p>

      <!-- CARDS -->
      <div class="grid md:grid-cols-3 gap-8">

        <!-- CARD 1 -->
        <div 
          data-aos="fade-up"
          data-aos-delay="100"
          class="group bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 
                 hover:scale-105 hover:border-blue-500 transition duration-300"
        >
          <Code class="mx-auto mb-6 text-blue-400 group-hover:scale-110 transition" size="40" />

          <h3 class="font-bold text-xl mb-3">Web Development</h3>
          <p class="text-gray-400">
            Belajar membangun website modern menggunakan teknologi terkini.
          </p>
        </div>

        <!-- CARD 2 -->
        <div 
          data-aos="fade-up"
          data-aos-delay="200"
          class="group bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 
                 hover:scale-105 hover:border-purple-500 transition duration-300"
        >
          <Brain class="mx-auto mb-6 text-purple-400 group-hover:scale-110 transition" size="40" />

          <h3 class="font-bold text-xl mb-3">AI & Machine Learning</h3>
          <p class="text-gray-400">
            Eksplorasi kecerdasan buatan dan data untuk masa depan teknologi.
          </p>
        </div>

        <!-- CARD 3 -->
        <div 
          data-aos="fade-up"
          data-aos-delay="300"
          class="group bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 
                 hover:scale-105 hover:border-pink-500 transition duration-300"
        >
          <Palette class="mx-auto mb-6 text-pink-400 group-hover:scale-110 transition" size="40" />

          <h3 class="font-bold text-xl mb-3">UI/UX Design</h3>
          <p class="text-gray-400">
            Mendesain pengalaman pengguna yang modern dan menarik.
          </p>
        </div>

      </div>

    </div>

    <!-- BACKGROUND GLOW -->
    <div class="absolute left-0 top-0 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>
    <div class="absolute right-0 bottom-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full pointer-events-none"></div>

  </section>
</template>