<script setup>
import { ref, onMounted } from 'vue'
import { Crown, User } from 'lucide-vue-next'

const scrollRef = ref(null)
let isHover = false

onMounted(() => {
  const el = scrollRef.value
  if (!el) return

  el.addEventListener('mouseenter', () => isHover = true)
  el.addEventListener('mouseleave', () => isHover = false)

  setInterval(() => {
    if (!el || isHover) return

    el.scrollLeft += 1

    if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
      el.scrollLeft = 0
    }
  }, 20)
})

/* ======================
   LEADERS
====================== */
const leaders = [
  { 
    role: "Ketua", 
    name: "Adzhar",
    image: "src/assets/images/reza.jpeg",
    icon: Crown 
  },
  { 
    role: "Wakil Ketua", 
    name: "Dapi",
    image: "src/assets/images/reza.jpeg",
    icon: User 
  }
]

/* ======================
   DIVISIONS + NAMA ANGGOTA
====================== */
const divisions = [
  {
    title: "Pemrograman Web",
    name: "Faraz",
    image: "src/asset/images/reza.jpeg",
    steps: ["Frontend (Vue)", "Backend API", "Database"]
  },
  {
    title: "Machine Learning",
    name: "Sultan Farras",
    image: "src/asset/images/reza.jpeg",
    steps: ["Python", "Data Processing", "Model Training"]
  },
  {
    title: "IoT",
    name: "Lillah",
    image: "src/asset/images/reza.jpeg",
    steps: ["Microcontroller", "Sensor", "Automation"]
  },
  {
    title: "Sekretaris",
    name: "Belum Ditentukan",
    image: "src/asset/images/reza.jpeg",
    steps: ["Administrasi", "Notulensi", "Dokumentasi"]
  },
  {
    title: "Bendahara",
    name: "Belum Ditentukan",
    image: "src/asset/images/reza.jpeg",
    steps: ["Keuangan", "Laporan", "Pengelolaan Dana"]
  },
  {
    title: "PDD",
    name: "Belum Ditentukan",
    image: "src/asset/images/reza.jpeg",
    steps: ["Desain", "Konten", "Publikasi"]
  },
  {
    title: "Logistik & Humas",
    name: "Belum Ditentukan",
    image: "src/asset/images/reza.jpeg",
    steps: ["Koordinasi", "Event", "Relasi"]
  }
]
</script>

<template>
  <section 
    id="roadmap"
    class="relative py-28 px-6 bg-gradient-to-b from-blue-950 via-blue-900 to-black text-white overflow-hidden"
  >

    <!-- HEADER -->
    <div class="text-center max-w-3xl mx-auto mb-16">
      <p class="text-blue-400 text-sm uppercase tracking-widest mb-3">
        Struktur Organisasi
      </p>

      <h2 class="text-4xl md:text-5xl font-extrabold mb-4">
        Roadmap Divisi Bprotic
      </h2>

      <p class="text-gray-400">
        Struktur organisasi dan pengembangan divisi dalam Biprotik
      </p>
    </div>

    <!-- LEADERS -->
    <div class="flex justify-center gap-8 mb-16 flex-wrap">
      <div 
        v-for="leader in leaders" 
        :key="leader.role"
        class="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 
               text-center w-52 hover:scale-105 transition duration-300"
      >

        <img 
          :src="leader.image"
          class="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-yellow-400 object-cover"
        />

        <p class="text-sm text-gray-400">{{ leader.role }}</p>
        <h3 class="text-lg font-semibold">{{ leader.name }}</h3>
      </div>
    </div>


    <!-- AUTO SCROLL -->
    <div 
      ref="scrollRef"
      class="max-w-7xl mx-auto flex gap-6 overflow-x-auto pb-4 px-2"
    >

      <div 
        v-for="(item, index) in divisions" 
        :key="index"
        class="min-w-[260px] flex-shrink-0 bg-white/5 backdrop-blur-xl p-6 rounded-2xl 
               border border-white/10 hover:-translate-y-2 hover:shadow-2xl 
               transition duration-300 text-center"
      >

        <!-- FOTO -->
        <img 
          :src="item.image" 
          class="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-blue-400 object-cover 
                 hover:scale-110 transition duration-300"
        />

        <!-- TITLE -->
        <h3 class="font-semibold text-lg">
          {{ item.title }}
        </h3>

        <!-- NAMA -->
        <p class="text-xs text-blue-400 mb-3 font-medium">
          {{ item.name }}
        </p>

        <!-- LINE -->
        <div class="w-10 h-[2px] bg-blue-500 mx-auto mb-4 opacity-60"></div>

        <!-- STEPS -->
        <ul class="text-sm text-gray-400 space-y-1">
          <li v-for="step in item.steps" :key="step">
            {{ step }}
          </li>
        </ul>

      </div>

    </div>

    <!-- GLOW -->
    <div class="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
    <div class="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>

  </section>
</template>