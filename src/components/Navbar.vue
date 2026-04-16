<script setup>
import { ref, onMounted } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const active = ref('home')
const isOpen = ref(false)

const menuItems = [
  { id:'home', label:'Home' },
  { id:'about', label:'About' },
  { id:'program', label:'Program' },
  { id:'roadmap', label:'Roadmap' },
  { id:'news', label:'Berita' },
  { id:'contact', label:'Contact' }
]

onMounted(() => {
  window.addEventListener('scroll', () => {
    const sections = menuItems.map(i => i.id)

    for (let sec of sections) {
      const el = document.getElementById(sec)
      if (!el) continue

      const top = window.scrollY
      const offset = el.offsetTop - 100
      const height = el.offsetHeight

      if (top >= offset && top < offset + height) {
        active.value = sec
      }
    }
  })
})

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <nav class="fixed w-full top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/10 shadow-sm">

    <div class="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

      <!-- LOGO -->
      <h1 class="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
        Biprotik
      </h1>

      <!-- DESKTOP MENU -->
      <ul class="hidden md:flex gap-8 font-medium text-gray-700">
        <li v-for="item in menuItems" :key="item.id">
          <a 
            :href="'#' + item.id"
            class="relative transition duration-300"
            :class="active === item.id ? 'text-blue-600' : 'hover:text-blue-500'"
          >
            {{ item.label }}

            <span 
              class="absolute left-0 -bottom-1 h-[2px] bg-blue-500 transition-all duration-300"
              :class="active === item.id ? 'w-full' : 'w-0'"
            ></span>
          </a>
        </li>
      </ul>

      <!-- HAMBURGER -->
      <button 
        @click="toggleMenu"
        class="md:hidden text-gray-700"
      >
        <component :is="isOpen ? X : Menu" size="26" />
      </button>

    </div>

    <!-- MOBILE MENU -->
    <div 
      v-if="isOpen"
      class="md:hidden bg-white/90 backdrop-blur-xl border-t border-white/10 px-6 py-4 space-y-4"
    >
      <a 
        v-for="item in menuItems"
        :key="item.id"
        :href="'#' + item.id"
        @click="isOpen = false"
        class="block text-gray-700 hover:text-blue-500 transition"
      >
        {{ item.label }}
      </a>
    </div>

  </nav>
</template>