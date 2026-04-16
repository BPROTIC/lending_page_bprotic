<script setup>
import { Calendar, Users, Presentation } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

// 🔥 DATA EVENT
const events = [
  {
    id: 1,
    title: "Workshop Web",
    desc: "Belajar membuat website modern dengan teknologi terbaru.",
    icon: Calendar,
    color: "blue"
  },
  {
    id: 2,
    title: "Seminar Teknologi",
    desc: "Diskusi dan sharing bersama praktisi di bidang teknologi.",
    icon: Users,
    color: "indigo"
  },
  {
    id: 3,
    title: "Pelatihan Skill",
    desc: "Meningkatkan kemampuan teknis dan soft skill mahasiswa.",
    icon: Presentation,
    color: "purple"
  }
]
</script>

<template>
  <section 
    id="event"
    class="relative py-28 px-6 bg-gradient-to-b from-blue-950 via-blue-900 to-black text-white overflow-hidden"
  >

    <!-- 🔥 GLOW -->
    <div class="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
    <div class="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>

    <div class="max-w-6xl mx-auto text-center">

      <!-- HEADER -->
      <p class="text-blue-400 text-sm uppercase tracking-widest mb-3">
        Event
      </p>

      <h2 class="text-4xl md:text-5xl font-extrabold mb-4">
        Event Terbaru
      </h2>

      <p class="text-gray-400 max-w-2xl mx-auto mb-16 text-sm">
        Biprotik rutin mengadakan berbagai kegiatan seperti workshop, seminar, 
        dan pelatihan teknologi untuk meningkatkan skill mahasiswa.
      </p>

      <!-- 🔥 CARDS -->
      <div class="grid md:grid-cols-3 gap-8">

        <div 
          v-for="(item, index) in events" 
          :key="item.id"
          @click="router.push(`/event/${item.id}`)" 
          class="group bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 
                 hover:-translate-y-3 hover:shadow-2xl transition duration-300 cursor-pointer"
        >

          <!-- ICON -->
          <div 
            class="w-12 h-12 flex items-center justify-center mx-auto mb-4 
                   rounded-xl group-hover:scale-110 transition"
            :class="{
              'bg-blue-500/20': item.color === 'blue',
              'bg-indigo-500/20': item.color === 'indigo',
              'bg-purple-500/20': item.color === 'purple'
            }"
          >
            <component 
              :is="item.icon" 
              size="26"
              :class="{
                'text-blue-400': item.color === 'blue',
                'text-indigo-400': item.color === 'indigo',
                'text-purple-400': item.color === 'purple'
              }"
            />
          </div>

          <!-- TITLE -->
          <h3 
            class="font-semibold text-lg mb-2 transition"
            :class="{
              'group-hover:text-blue-400': item.color === 'blue',
              'group-hover:text-indigo-400': item.color === 'indigo',
              'group-hover:text-purple-400': item.color === 'purple'
            }"
          >
            {{ item.title }}
          </h3>

          <!-- DESC -->
          <p class="text-sm text-gray-400">
            {{ item.desc }}
          </p>

          <!-- LINE -->
          <div 
            class="w-8 h-[2px] mt-4 mx-auto opacity-60 group-hover:w-12 transition-all"
            :class="{
              'bg-blue-500': item.color === 'blue',
              'bg-indigo-500': item.color === 'indigo',
              'bg-purple-500': item.color === 'purple'
            }"
          ></div>

        </div>

      </div>

    </div>

  </section>
</template>