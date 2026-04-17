<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'

const router = useRouter()

const active = ref('home')
const isOpen = ref(false)
const isScrolled = ref(false)

const isLogin = ref(false)
const role = ref('')
const user = ref({})

const menuItems = [
  { id:'home', label:'Home' },
  { id:'about', label:'About' },
  { id:'program', label:'Program' },
  { id:'roadmap', label:'Roadmap' },
  { id:'news', label:'Berita' },
  { id:'contact', label:'Contact' }
]

onMounted(() => {
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

    <div class="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

      <!-- LOGO -->
      <h1 class="text-xl font-extrabold tracking-wide 
                 bg-gradient-to-r from-blue-500 to-indigo-600 
                 bg-clip-text text-transparent">
        BPROTIC
      </h1>

      <!-- DESKTOP MENU -->
      <ul class="hidden md:flex items-center gap-8 text-sm">

        <li v-for="item in menuItems" :key="item.id">
          <a 
            :href="'#' + item.id"
            class="relative transition"
            :class="active === item.id 
              ? 'text-blue-600 font-semibold' 
              : 'text-gray-600 hover:text-blue-500'"
          >
            {{ item.label }}

            <span 
              class="absolute left-0 -bottom-1 h-[2px] bg-blue-500 transition-all duration-300"
              :class="active === item.id ? 'w-full' : 'w-0'"
            ></span>
          </a>
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
        :href="'#' + item.id"
        class="block text-gray-700"
      >
        {{ item.label }}
      </a>

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
</style>