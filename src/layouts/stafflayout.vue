<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.clear()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen flex bg-[#050B18] text-white">

    <!-- SIDEBAR -->
    <aside class="w-64 bg-white/5 p-6">

      <h1 class="text-xl font-bold mb-6">
        STAFF PANEL
      </h1>

      <button 
        @click="router.push('/staff')" 
        class="menu"
      >
        Dashboard Staff
      </button>

      <button 
        @click="logout" 
        class="logout"
      >
        Logout
      </button>

    </aside>

    <!-- CONTENT -->
    <main class="flex-1 p-6">
      <router-view />
    </main>

  </div>
</template>

<style scoped>
.menu {
  @apply w-full text-left px-4 py-2 rounded-lg hover:bg-white/10;
}
.logout {
  @apply mt-6 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg;
}
</style>