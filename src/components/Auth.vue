<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff } from 'lucide-vue-next' // 🔥 icon

const mode = ref('login')

const email = ref('')
const password = ref('')
const name = ref('')
const showPassword = ref(false)

const router = useRouter()

const handleSubmit = () => {
  if (mode.value === 'login') {
    if (!email.value || !password.value) return
    router.push('/')
  }

  if (mode.value === 'register') {
    if (!name.value || !email.value || !password.value) return
    alert('Register berhasil (dummy)')
    mode.value = 'login'
  }

  if (mode.value === 'forgot') {
    if (!email.value) return
    alert('Link reset dikirim ke email')
    mode.value = 'login'
  }
}
</script>

<template>
  <section class="relative min-h-screen bg-[#050B18] text-white flex flex-col justify-between overflow-hidden">

    <!-- 🔥 BACKGROUND GLOW -->
    <div class="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[120px] top-[-100px] left-[-100px]"></div>
    <div class="absolute w-[300px] h-[300px] bg-cyan-400/10 blur-[120px] bottom-[-100px] right-[-100px]"></div>

    <!-- NAVBAR -->
    <div class="w-full py-6 flex justify-center">
  <div class="flex items-center gap-4">

    <!-- LINE -->
    <div class="w-10 h-[1px] bg-blue-400/40"></div>

    <!-- LOGO -->
    <h1 class="text-blue-400 font-semibold text-lg tracking-[0.3em]">
      BPROTIC
    </h1>

    <!-- LINE -->
    <div class="w-10 h-[1px] bg-blue-400/40"></div>

  </div>
</div>
    <!-- CARD -->
    <div class="flex justify-center items-center flex-1">

      <div class="relative w-[380px] p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">

        <!-- TITLE -->
        <h2 class="text-center text-2xl font-semibold mb-1">
          {{
            mode === 'login' ? 'Access Portal' :
            mode === 'register' ? 'Create Account' :
            'Reset Password'
          }}
        </h2>

        <p class="text-center text-gray-400 text-sm mb-6">
          {{
            mode === 'login'
              ? 'Connect to the UKM BPROTIC ecosystem.'
              : mode === 'register'
              ? 'Daftar akun baru'
              : 'Masukkan email untuk reset password'
          }}
        </p>

        <!-- FORM -->
        <form @submit.prevent="handleSubmit" class="space-y-4">

          <!-- NAME -->
          <input 
            v-if="mode === 'register'"
            v-model="name"
            type="text"
            placeholder="Nama Lengkap"
            class="input"
          />

          <!-- EMAIL -->
          <input 
            v-model="email"
            type="email"
            placeholder="Email"
            class="input"
          />

          <!-- PASSWORD -->
          <div v-if="mode !== 'forgot'">

            <div class="flex justify-between text-xs text-blue-400 mb-1">
              <span>Password</span>

              <span 
                v-if="mode === 'login'"
                @click="mode = 'forgot'"
                class="cursor-pointer text-gray-400 hover:text-blue-400 transition"
              >
                Forgot Password?
              </span>
            </div>

            <!-- INPUT + ICON -->
            <div class="relative">
              <input 
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="input pr-10"
              />

              <!--  ICON -->
              <span 
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-blue-400 transition"
              >
                <component :is="showPassword ? EyeOff : Eye" size="18" />
              </span>
            </div>

          </div>

          <!-- BUTTON -->
          <button 
            type="submit"
            class="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 
                   hover:opacity-90 transition font-semibold shadow-lg"
          >
            {{
              mode === 'login' ? 'LOGIN' :
              mode === 'register' ? 'REGISTER' :
              'SEND RESET LINK'
            }}
          </button>

        </form>

        <!-- SWITCH -->
        <p class="text-center text-xs text-gray-400 mt-6">

          <span v-if="mode === 'login'">
            Don't have an account?
            <span 
              @click="mode = 'register'"
              class="text-blue-400 cursor-pointer hover:underline ml-1"
            >
              Sign up
            </span>
          </span>

          <span v-if="mode === 'register'">
            Sudah punya akun?
            <span 
              @click="mode = 'login'"
              class="text-blue-400 cursor-pointer hover:underline ml-1"
            >
              Login
            </span>
          </span>

          <span v-if="mode === 'forgot'">
            Kembali ke
            <span 
              @click="mode = 'login'"
              class="text-blue-400 cursor-pointer hover:underline ml-1"
            >
              Login
            </span>
          </span>

        </p>

      </div>
    </div>

  </section>
</template>

<style scoped>
.input {
  @apply w-full p-3 rounded-lg bg-white/10 border border-white/10 
         focus:outline-none focus:ring-2 focus:ring-blue-500 
         transition text-sm;
}
</style>