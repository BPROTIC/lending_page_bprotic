<script setup>
</script>

<template>
  <section 
    id="about" 
    class="relative py-28 px-6 bg-gradient-to-b from-blue-950 via-blue-900 to-black text-white overflow-hidden"
  >

    <!-- 🔥 GLOW -->
    <div class="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
    <div class="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>

    <!-- CONTENT -->
    <div class="max-w-6xl mx-auto text-center relative z-10">

      <!-- LABEL -->
      <p 
        data-aos="fade-up"
        class="text-blue-400 text-sm tracking-widest uppercase mb-3">
        Tentang Kami
      </p>

      <!-- TITLE -->
      <h2 
        data-aos="fade-up"
        data-aos-delay="100"
        class="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
        Membangun Generasi Teknologi Masa Depan
      </h2>

      <!-- DESC -->
      <p 
        data-aos="fade-up"
        data-aos-delay="200"
        class="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
        Biprotik adalah Unit Kegiatan Mahasiswa yang berfokus pada pengembangan teknologi, 
        inovasi, dan keterampilan digital untuk mempersiapkan mahasiswa menghadapi era digital.
      </p>

      <!-- 🔥 STATS (BARU - BIAR PRO) -->
      <div 
        data-aos="fade-up"
        data-aos-delay="300"
        class="flex justify-center gap-10 mt-12 text-center flex-wrap"
      >
        <div>
          <h3 class="text-2xl font-bold text-blue-400">50+</h3>
          <p class="text-gray-400 text-sm">Anggota Aktif</p>
        </div>
        <div>
          <h3 class="text-2xl font-bold text-indigo-400">10+</h3>
          <p class="text-gray-400 text-sm">Event</p>
        </div>
        <div>
          <h3 class="text-2xl font-bold text-purple-400">5+</h3>
          <p class="text-gray-400 text-sm">Project</p>
        </div>
      </div>

      <!-- CARDS -->
      <div class="grid md:grid-cols-3 gap-8 mt-16">

        <!-- CARD -->
        <div 
          data-aos="fade-up"
          data-aos-delay="100"
          class="group bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 
                 hover:-translate-y-3 hover:shadow-2xl transition duration-300"
        >
          <h3 class="font-semibold text-lg mb-2 group-hover:text-blue-400 transition">
            Inovasi
          </h3>

          <p class="text-gray-400 text-sm">
            Mengembangkan ide kreatif berbasis teknologi untuk solusi masa depan.
          </p>

          <div class="w-8 h-[2px] bg-blue-500 mt-4 mx-auto opacity-60 group-hover:w-12 transition-all"></div>
        </div>

        <!-- CARD -->
        <div 
          data-aos="fade-up"
          data-aos-delay="200"
          class="group bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 
                 hover:-translate-y-3 hover:shadow-2xl transition duration-300"
        >
          <h3 class="font-semibold text-lg mb-2 group-hover:text-indigo-400 transition">
            Kolaborasi
          </h3>

          <p class="text-gray-400 text-sm">
            Bekerja sama dalam tim untuk menciptakan hasil yang maksimal.
          </p>

          <div class="w-8 h-[2px] bg-indigo-500 mt-4 mx-auto opacity-60 group-hover:w-12 transition-all"></div>
        </div>

        <!-- CARD -->
        <div 
          data-aos="fade-up"
          data-aos-delay="300"
          class="group bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 
                 hover:-translate-y-3 hover:shadow-2xl transition duration-300"
        >
          <h3 class="font-semibold text-lg mb-2 group-hover:text-purple-400 transition">
            Pengembangan
          </h3>

          <p class="text-gray-400 text-sm">
            Meningkatkan skill digital mahasiswa agar siap di dunia kerja.
          </p>

          <div class="w-8 h-[2px] bg-purple-500 mt-4 mx-auto opacity-60 group-hover:w-12 transition-all"></div>
        </div>

      </div>

    </div>

    <!-- 🔥 WAVE DIVIDER (DISAMAKAN DENGAN DARK THEME) -->
    <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
      <svg 
        class="relative block w-full h-[100px]" 
        viewBox="0 0 1440 320" 
        preserveAspectRatio="none"
      >
        <path 
          fill="#020617" 
          d="M0,160L80,186.7C160,213,320,267,480,261.3C640,256,800,192,960,170.7C1120,149,1280,171,1360,181.3L1440,192V320H0Z"
        ></path>
      </svg>
    </div>

  </section>
</template>