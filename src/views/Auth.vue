<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff } from 'lucide-vue-next'

const mode = ref('login')

const email = ref('')
const password = ref('')
const name = ref('')
const showPassword = ref(false)

const router = useRouter()

const handleSubmit = () => {

  // 🔥 LOGIN
  if (mode.value === 'login') {
    if (!email.value || !password.value) return

    // 🔥 ROLE DETECTION
    const role = email.value === 'admin@gmail.com' ? 'admin' : 'user'

    const userData = {
      name: role === 'admin' ? 'Admin' : (name.value || 'User'),
      email: email.value,
      role
    }

    // 🔥 SIMPAN DATA
    localStorage.setItem('isLogin', true)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('role', role)

    // 🔥 REDIRECT BERDASARKAN ROLE
    if (role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/dashboard')
    }
  }

  // 🔥 REGISTER
  if (mode.value === 'register') {
    if (!name.value || !email.value || !password.value) return

    // 🔥 SIMPAN USER REGISTER
    const userData = {
      name: name.value,
      email: email.value,
      role: 'user'
    }

    localStorage.setItem('user', JSON.stringify(userData))

    alert('Register berhasil')
    mode.value = 'login'
  }
}
</script>

<template>
  <section class="min-h-screen bg-[#050B18] text-white flex items-center justify-center">
    
    <div class="w-[350px] p-6 bg-white/5 rounded-xl border border-white/10">

      <h2 class="text-center text-xl font-bold mb-4">
        {{ mode === 'login' ? 'Login' : 'Register' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">

        <!-- NAME -->
        <input 
          v-if="mode==='register'" 
          v-model="name" 
          placeholder="Nama" 
          class="input"
        />

        <!-- EMAIL -->
        <input 
          v-model="email" 
          placeholder="Email" 
          class="input"
        />

        <!-- PASSWORD -->
        <div class="relative">
          <input 
            :type="showPassword?'text':'password'" 
            v-model="password" 
            placeholder="Password" 
            class="input pr-10"
          />

          <span 
            @click="showPassword=!showPassword" 
            class="eye"
          >
            <component :is="showPassword?EyeOff:Eye"/>
          </span>
        </div>

        <!-- BUTTON -->
        <button class="btn">
          {{ mode === 'login' ? 'Login' : 'Register' }}
        </button>

      </form>

      <!-- SWITCH MODE -->
      <p class="text-center text-sm mt-4">
        <span 
          v-if="mode==='login'" 
          @click="mode='register'" 
          class="link"
        >
          Register
        </span>

        <span 
          v-else 
          @click="mode='login'" 
          class="link"
        >
          Login
        </span>
      </p>

    </div>
    
  </section>
</template>

<style scoped>
.input { @apply w-full p-3 bg-white/10 rounded-lg outline-none }
.btn { @apply w-full bg-blue-500 py-2 rounded-lg hover:bg-blue-600 transition }
.eye { @apply absolute right-3 top-3 cursor-pointer text-gray-300 }
.link { @apply text-blue-400 cursor-pointer }
</style>