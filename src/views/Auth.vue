<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff } from 'lucide-vue-next'

const mode = ref('login')

const email = ref('')
const password = ref('')
const name = ref('')
const nim = ref('')
const role = ref('user')
const showPassword = ref(false)
const isLoading = ref(false)

const router = useRouter()

// 🔥 LOGIN
const handleLogin = async () => {
  isLoading.value = true
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const result = await response.json()

    if (response.ok && result.success) {
      const { user, token } = result.data
      
      localStorage.setItem('isLogin', 'true')
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('role', user.role || 'user')

      // 🔥 REDIRECT
      const role = user.role || 'user'
      if (role === 'admin') {
        router.push('/admin')
      } else if (role === 'mentor') {
        router.push('/mentor')
      } else if (role === 'pdd') {
        router.push('/pdd')
      } else if (role === 'staff') {
        router.push('/staff')
      } else {
        router.push('/dashboard')
      }
    } else {
      alert(result.message || 'Login gagal: Email atau Password salah')
    }
  } catch (error) {
    console.error('Error login:', error)
    alert('Terjadi kesalahan koneksi')
  } finally {
    isLoading.value = false
  }
}

// 🔥 REGISTER
const handleRegister = async () => {
  isLoading.value = true
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nama: name.value,
        email: email.value,
        nim: nim.value,
        password: password.value,
        role: role.value
      })
    })

    const result = await response.json()

    if (response.ok) {
      alert('Register berhasil')
      mode.value = 'login'
    } else {
      alert(result.message || 'Register gagal')
    }
  } catch (error) {
    console.error('Error register:', error)
    alert('Terjadi kesalahan koneksi')
  } finally {
    isLoading.value = false
  }
}

// 🔥 HANDLE
const handleSubmit = () => {
  if (!email.value || !password.value) return

  if (mode.value === 'login') {
    handleLogin()
  } else {
    if (!name.value || !nim.value) return
    handleRegister()
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
          placeholder="Nama Lengkap" 
          class="input"
          required
        />

        <!-- NIM -->
        <input 
          v-if="mode==='register'" 
          v-model="nim" 
          placeholder="NIM" 
          class="input"
          required
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

          <span @click="showPassword=!showPassword" class="eye">
            <component :is="showPassword?EyeOff:Eye"/>
          </span>
        </div>

        <!-- 🔥 ROLE SELECT (REGISTER ONLY) -->
        <select v-if="mode==='register'" v-model="role" class="input">
          <option value="user">User</option>
          <option value="mentor">Mentor</option>
          <option value="pdd">PDD</option>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>

        <!-- BUTTON -->
        <button class="btn" :disabled="isLoading">
          <span v-if="isLoading">Loading...</span>
          <span v-else>{{ mode === 'login' ? 'Login' : 'Register' }}</span>
        </button>

      </form>

      <p class="text-center text-sm mt-4">
        <span v-if="mode==='login'" @click="mode='register'" class="link">
          Register
        </span>
        <span v-else @click="mode='login'" class="link">
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