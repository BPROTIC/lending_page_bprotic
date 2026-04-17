<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const logout = () => {
  localStorage.clear()
  router.push('/login')
}

// 🔥 ACTIVE MENU
const isActive = (path) => route.path === path
</script>

<template>
  <section class="min-h-screen bg-[#050B18] text-white flex">

    <!-- SIDEBAR -->
    <aside class="w-64 bg-white/5 p-6 border-r border-white/10">

      <h2 class="text-red-400 font-bold mb-6 tracking-wider">
        ADMIN PANEL
      </h2>

      <!-- 🔥 MENU -->
      <div class="space-y-3 text-gray-300">

        <p 
          class="menu"
          :class="isActive('/admin') && 'active'"
          @click="router.push('/admin')"
        >
          Dashboard
        </p>

        <p 
          class="menu"
          :class="route.path.includes('/admin/event') && 'active'"
          @click="router.push('/admin/event')"
        >
          Kelola Event
        </p>

        <p 
          class="menu"
          :class="route.path.includes('/admin/news') && 'active'"
          @click="router.push('/admin/news')"
        >
          Kelola News
        </p>

      </div>

      <!-- LOGOUT -->
      <p class="logout" @click="logout">
        Logout
      </p>

    </aside>

    <!-- MAIN -->
    <div class="flex-1 p-6">

      <h1 class="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <!-- 🔥 ROUTER VIEW (INI PENTING) -->
      <router-view />

      <!-- DEFAULT DASHBOARD (kalau di /admin) -->
      <div v-if="route.path === '/admin'" class="grid md:grid-cols-3 gap-6 mt-6">

        <div class="card">
          <p>Total User</p>
          <h2 class="text-2xl text-blue-400">120</h2>
        </div>

        <div class="card">
          <p>Total Event</p>
          <h2 class="text-2xl text-green-400">12</h2>
        </div>

        <div class="card">
          <p>Total News</p>
          <h2 class="text-2xl text-purple-400">8</h2>
        </div>

      </div>

    </div>

  </section>
</template>

<style scoped>
.menu {
  @apply px-3 py-2 rounded-lg cursor-pointer transition hover:bg-white/5 hover:text-red-400;
}

.active {
  @apply bg-red-500/10 text-red-400 font-semibold;
}

.logout {
  @apply mt-10 pt-4 border-t border-white/10 text-red-400 hover:text-red-500 cursor-pointer;
}

.card {
  @apply bg-white/5 p-6 rounded-xl border border-white/10;
}
</style>