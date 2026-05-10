<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const logout = () => {
  localStorage.clear()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen flex bg-[#050B18] text-white">

    <!-- SIDEBAR (Kita buat sangat stabil) -->
    <aside class="w-64 bg-[#0a0f1d] border-r border-purple-500/20 flex flex-col shrink-0 z-50 relative">
      <div class="p-6">
        <h1 class="text-xl font-bold text-purple-400 tracking-tight">PDD PANEL</h1>
      </div>

      <!-- MENU -->
      <nav class="px-4 space-y-2 flex-1">
        
        <router-link 
          to="/pdd" 
          class="nav-btn"
          :class="{ 'active-btn': route.path === '/pdd' }"
        >
          📊 Dashboard PDD
        </router-link>

        <router-link 
          to="/pdd-data" 
          class="nav-btn"
          :class="{ 'active-btn': route.path === '/pdd-data' }"
        >
          📁 Data Management
        </router-link>

        <router-link 
          to="/pdd-analytics" 
          class="nav-btn"
          :class="{ 'active-btn': route.path === '/pdd-analytics' }"
        >
          📈 Analytics
        </router-link>

      </nav>

      <!-- LOGOUT -->
      <div class="p-4 border-t border-white/5">
        <button 
          @click="logout"
          class="w-full py-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition font-bold text-sm"
        >
          Logout
        </button>
      </div>

    </aside>

    <!-- CONTENT -->
    <main class="flex-1 overflow-y-auto bg-gradient-to-br from-[#050B18] to-[#12051d]">
      <router-view :key="route.fullPath" />
    </main>

  </div>
</template>

<style scoped>
.nav-btn {
  @apply flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-400 font-medium transition duration-200 no-underline cursor-pointer;
}

.nav-btn:hover {
  @apply bg-purple-500/10 text-purple-300;
}

.active-btn {
  @apply bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/10;
}
</style>