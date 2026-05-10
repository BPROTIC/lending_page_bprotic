<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Menu, X, ChevronDown, Zap, Newspaper } from 'lucide-vue-next'
import { mockNews } from '../utils/mockData'

const router = useRouter()
const route = useRoute()

const active = ref('home')
const isOpen = ref(false)
const isScrolled = ref(false)
const showNewsMenu = ref(false)

const isLogin = ref(false)
const role = ref('')
const user = ref({})
const latestNews = ref([])

const menuItems = [
  { id:'home', label:'Home' },
  { id:'about', label:'About' },
  { id:'program', label:'Program' },
  { id:'roadmap', label:'Roadmap' },
  { id:'news', label:'Berita', hasDropdown: true },
  { id:'contact', label:'Contact' }
]

const fetchLatestNews = async () => {
  try {
    const response = await fetch('/api/news')
    const result = await response.json()
    if (result.success && result.data.length > 0) {
      latestNews.value = result.data.slice(0, 5)
    } else {
      latestNews.value = mockNews
    }
  } catch (error) {
    console.error('API Error, using mock data:', error)
    latestNews.value = mockNews
  }
}

onMounted(() => {
  fetchLatestNews()
  const login = localStorage.getItem('isLogin')
  const userData = JSON.parse(localStorage.getItem('user')) || {}
  const userRole = localStorage.getItem('role')

  isLogin.value = !!login
  user.value = userData
  role.value = userRole

  window.addEventListener('scroll', () => {
    const top = window.scrollY
    isScrolled.value = top > 20

    for (let item of menuItems) {
      const el = document.getElementById(item.id)
      if (!el) continue

      const offset = el.offsetTop - 120
      const height = el.offsetHeight

      if (top >= offset && top < offset + height) {
        active.value = item.id
      }
    }
  })
})

const logout = () => {
  localStorage.clear()
  window.location.reload()
}

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <nav 
    class="fixed w-full top-0 z-50 transition-all duration-300"
    :class="isScrolled 
      ? 'bg-white/70 backdrop-blur-xl shadow-md border-b border-white/10' 
      : 'bg-transparent'"
  >
    <!-- ⚡ NEWS TICKER (Hidden on Home Page) -->
    <div v-if="!isScrolled && route.path !== '/'" class="bg-blue-600 text-white py-2 overflow-hidden border-b border-blue-500/30">
      <div class="max-w-7xl mx-auto px-6 flex items-center gap-4">
        <div class="flex items-center gap-2 bg-red-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter animate-pulse shrink-0">
          <Zap size="12" fill="white" /> Breaking
        </div>
        <div class="relative flex-1 h-5 overflow-hidden">
          <div class="flex flex-nowrap gap-12 animate-ticker whitespace-nowrap text-xs font-medium">
            <span v-for="news in latestNews" :key="news.id" class="cursor-pointer hover:text-blue-200 transition" @click="router.push(`/news/${news.id}`)">
              • {{ news.title }}
            </span>
            <!-- Repeat for seamless loop -->
            <span v-for="news in latestNews" :key="'dup-'+news.id" class="cursor-pointer hover:text-blue-200 transition" @click="router.push(`/news/${news.id}`)">
              • {{ news.title }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

      <!-- LOGO -->
      <h1 class="text-xl font-extrabold tracking-wide 
                 bg-gradient-to-r from-blue-500 to-indigo-600 
                 bg-clip-text text-transparent cursor-pointer"
          @click="router.push('/')">
        BPROTIC
      </h1>

      <!-- DESKTOP MENU -->
      <ul class="hidden md:flex items-center gap-8 text-sm">

        <li 
          v-for="item in menuItems" 
          :key="item.id" 
          class="relative group"
          @mouseenter="item.hasDropdown ? showNewsMenu = true : null"
          @mouseleave="item.hasDropdown ? showNewsMenu = false : null"
        >
          <a 
            :href="item.hasDropdown ? 'javascript:void(0)' : '#' + item.id"
            class="flex items-center gap-1 transition"
            :class="active === item.id 
              ? 'text-blue-600 font-semibold' 
              : 'text-gray-600 hover:text-blue-500'"
          >
            {{ item.label }}
            <ChevronDown v-if="item.hasDropdown" size="14" class="transition-transform group-hover:rotate-180" />

            <span 
              class="absolute left-0 -bottom-1 h-[2px] bg-blue-500 transition-all duration-300"
              :class="active === item.id ? 'w-full' : 'w-0'"
            ></span>
          </a>

          <!-- 🔥 NEWS MEGA MENU -->
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div 
              v-if="item.hasDropdown && showNewsMenu"
              class="absolute top-full -left-48 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 mt-2 p-6 grid grid-cols-2 gap-6"
            >
              <div class="col-span-1 space-y-4">
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Newspaper size="14" /> Berita Terbaru
                </h3>
                <div 
                  v-for="news in latestNews.slice(0, 3)" 
                  :key="news.id"
                  class="group/item cursor-pointer space-y-1"
                  @click="router.push(`/news/${news.id}`)"
                >
                  <p class="text-[10px] text-blue-500 font-medium">
                    {{ new Date(news.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) }}
                  </p>
                  <h4 class="text-sm font-semibold text-gray-800 group-hover/item:text-blue-600 transition line-clamp-1">
                    {{ news.title }}
                  </h4>
                  <p class="text-xs text-gray-500 line-clamp-2">
                    {{ news.content }}
                  </p>
                </div>
                <button 
                  @click="router.push('/news')"
                  class="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Lihat Semua Berita →
                </button>
              </div>

              <div class="col-span-1">
                <div v-if="latestNews[0]" class="h-full relative rounded-xl overflow-hidden group/featured cursor-pointer" @click="router.push(`/news/${latestNews[0].id}`)">
                  <img :src="latestNews[0].image" class="h-full w-full object-cover transition duration-500 group-hover/featured:scale-110" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                    <span class="bg-blue-600 text-[10px] font-bold text-white px-2 py-0.5 rounded w-fit mb-2">HOT NEWS</span>
                    <h4 class="text-white text-sm font-bold leading-tight">{{ latestNews[0].title }}</h4>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </li>

        <!-- 🔥 AUTH -->
        <template v-if="!isLogin">

          <button 
            @click="router.push('/login')"
            class="text-gray-600 hover:text-blue-500 transition"
          >
            Login
          </button>

          <button 
            @click="router.push('/login')"
            class="px-4 py-2 rounded-lg bg-blue-500 text-white 
                   hover:bg-blue-600 transition shadow-sm"
          >
            Gabung
          </button>

        </template>

        <template v-else>

          <!-- USER BOX -->
          <div class="flex items-center gap-3 bg-white/50 backdrop-blur 
                      px-3 py-2 rounded-xl border border-white/20">

            <!-- INFO -->
            <div class="text-right leading-tight">
              <p class="text-xs font-semibold text-gray-800">
                {{ user.name || 'User' }}
              </p>
              <p class="text-[10px] text-gray-500 uppercase">
                {{ role }}
              </p>
            </div>

            <!-- ACTION -->
            <button 
              v-if="role === 'admin'"
              @click="router.push('/admin')"
              class="btn-admin"
            >
              Admin
            </button>

            <button 
              v-else
              @click="router.push('/dashboard')"
              class="btn-user"
            >
              Dashboard
            </button>

            <button 
              @click="logout"
              class="btn-logout"
            >
              Logout
            </button>

          </div>

        </template>

      </ul>

      <!-- MOBILE -->
      <button @click="toggleMenu" class="md:hidden text-gray-700">
        <component :is="isOpen ? X : Menu" size="26" />
      </button>

    </div>

    <!-- MOBILE MENU -->
    <div 
      v-if="isOpen"
      class="md:hidden bg-white/90 backdrop-blur-xl px-6 py-6 space-y-4"
    >

      <a 
        v-for="item in menuItems"
        :key="item.id"
        :href="item.hasDropdown ? 'javascript:void(0)' : '#' + item.id"
        class="block text-gray-700 font-medium"
        @click="item.hasDropdown ? null : toggleMenu()"
      >
        {{ item.label }}
      </a>

      <!-- MOBILE NEWS LIST -->
      <div class="pt-4 border-t border-gray-100">
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Berita Terbaru</p>
        <div class="space-y-3">
          <div 
            v-for="news in latestNews.slice(0, 3)" 
            :key="'mobile-'+news.id"
            class="flex gap-3 items-center"
            @click="router.push(`/news/${news.id}`); toggleMenu()"
          >
            <img :src="news.image" class="w-12 h-12 rounded-lg object-cover" />
            <div class="flex-1">
              <h4 class="text-xs font-semibold text-gray-800 line-clamp-1">{{ news.title }}</h4>
              <p class="text-[10px] text-gray-500">{{ new Date(news.created_at).toLocaleDateString('id-ID') }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!isLogin">
        <button 
          @click="router.push('/login')" 
          class="w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          Login
        </button>
      </div>

      <div v-else class="space-y-2">
        <button 
          @click="router.push(role === 'admin' ? '/admin' : '/dashboard')"
          class="w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          Dashboard
        </button>

        <button 
          @click="logout"
          class="w-full bg-gray-300 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

    </div>

  </nav>
</template>

<style scoped>
.btn-user {
  @apply px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition;
}

.btn-admin {
  @apply px-3 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition;
}

.btn-logout {
  @apply px-3 py-1 text-xs bg-gray-200 text-black rounded-md hover:bg-gray-300 transition;
}

@keyframes ticker {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-ticker {
  animation: ticker 30s linear infinite;
}

.animate-ticker:hover {
  animation-play-state: paused;
}
</style>