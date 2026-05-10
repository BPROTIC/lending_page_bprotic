<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import SelectClass from '../components/SelectClass.vue'
import BiodataForm from '../components/BiodataForm.vue'
import DashboardHome from './dashboard/Home.vue'

const router = useRouter()
const route = useRoute()

const user = ref({})
const step = ref(1)

// 🔥 LOAD USER
onMounted(() => {
  const data = JSON.parse(localStorage.getItem('user')) || {}
  user.value = data

  if (!data.class) step.value = 1
  else if (!data.name) step.value = 2
  else step.value = 3
})

// 🔥 TITLE DINAMIS
const pageTitle = computed(() => {
  if (step.value === 1) return 'Pilih Program'
  if (step.value === 2) return 'Lengkapi Data'

  if (route.path === '/dashboard') return 'Dashboard'
  if (route.path.includes('/dashboard/event')) return 'Event'
  if (route.path.includes('/dashboard/news')) return 'News'
  if (route.path.includes('/dashboard/material')) return 'Materi Kuliah'
  if (route.path.includes('/dashboard/profile')) return 'Profile'
  if (route.path.includes('/dashboard/certificate')) return 'Certificate'

  return 'Dashboard'
})

// 🔥 LOGOUT
const logout = () => {
  localStorage.clear()
  router.push('/login')
}

// 🔥 KEMBALI
const goBack = () => {
  if (step.value === 2) {
    const userData = JSON.parse(localStorage.getItem('user')) || {}
    delete userData.class
    localStorage.setItem('user', JSON.stringify(userData))

    step.value = 1
  }
}

// 🔥 ACTIVE MENU
const isActive = (path) => route.path === path
</script>

<template>
  <section class="min-h-screen bg-[#050B18] text-white flex">

    <!-- SIDEBAR -->
    <aside class="w-64 bg-white/5 p-6 border-r border-white/10 hidden md:block">

      <h2 class="text-blue-400 font-bold mb-6 tracking-wider">
        BPROTIC
      </h2>

      <!-- 🔥 MENU -->
      <div v-if="step === 3" class="space-y-3 text-gray-300">

        <p 
          @click="router.push('/dashboard')" 
          :class="['menu', isActive('/dashboard') && 'active']"
        >
          Dashboard
        </p>

        <p 
          @click="router.push('/dashboard/event')" 
          :class="['menu', route.path.includes('/dashboard/event') && 'active']"
        >
          Event
        </p>

        <p 
          @click="router.push('/dashboard/news')" 
          :class="['menu', route.path.includes('/dashboard/news') && 'active']"
        >
          News
        </p>

        <p 
          @click="router.push('/dashboard/material')" 
          :class="['menu', route.path.includes('/dashboard/material') && 'active']"
        >
          Materi
        </p>

        <p 
          @click="router.push('/dashboard/profile')" 
          :class="['menu', route.path.includes('/dashboard/profile') && 'active']"
        >
          Profile
        </p>

        <!-- 🔥 TAMBAHAN CERTIFICATE -->
        <p 
          @click="router.push('/dashboard/certificate')" 
          :class="['menu', route.path.includes('/dashboard/certificate') && 'active']"
        >
          Certificate
        </p>

      </div>

      <!-- LOGOUT -->
      <p 
        class="logout"
        @click="logout"
      >
        Logout
      </p>

    </aside>

    <!-- MAIN -->
    <div class="flex-1 p-6">

      <!-- HEADER -->
      <div class="flex items-center justify-between mb-6">

        <h1 class="text-2xl font-bold tracking-wide">
          {{ pageTitle }}
        </h1>

        <!-- 🔥 BACK -->
        <button 
          v-if="step === 2"
          @click="goBack"
          class="px-4 py-2 bg-white/10 border border-white/10 rounded-lg hover:bg-white/20 transition text-sm"
        >
          Kembali
        </button>

      </div>

      <!-- 🔥 STEP ONBOARDING -->
      <SelectClass v-if="step === 1" @selected="step = 2"/>
      <BiodataForm v-else-if="step === 2" @saved="step = 3"/>

      <!-- 🔥 DASHBOARD -->
      <template v-else>

        <!-- DEFAULT -->
        <DashboardHome v-if="route.path === '/dashboard'" />

        <!-- 🔥 ROUTER CHILD -->
        <router-view v-else />

      </template>

    </div>

  </section>
</template>

<style scoped>
.menu {
  @apply px-3 py-2 rounded-lg cursor-pointer transition hover:bg-white/5 hover:text-blue-400;
}

.active {
  @apply bg-blue-500/10 text-blue-400 font-semibold;
}

.logout {
  @apply mt-10 pt-4 border-t border-white/10 text-red-400 hover:text-red-500 cursor-pointer;
}
</style>