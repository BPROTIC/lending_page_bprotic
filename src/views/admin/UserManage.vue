<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const token = localStorage.getItem('token')

// Gunakan URL dari .env jika ada
const API_BASE = import.meta.env.VITE_API_URL || ''

const form = ref({
  nama: '',
  email: '',
  nim: '',
  password: '',
  role: 'user'
})

const isEditing = ref(false)
const selectedId = ref(null)

const fetchUsers = async () => {
  isLoading.value = true
  try {
    const response = await fetch(`${API_BASE}/api/admin/users`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const result = await response.json()
    console.log("DEBUG RESPONSE USER:", result)

    if (result.success && result.data) {
      users.value = result.data
    } else if (Array.isArray(result)) {
      users.value = result
    } else if (result.users) {
      users.value = result.users
    } else {
      users.value = []
    }
  } catch (error) {
    console.error('Koneksi API Gagal:', error)
  } finally {
    isLoading.value = false
  }
}

const saveUser = async () => {
  if (!form.value.nama || !form.value.email || !form.value.nim || (!isEditing.value && !form.value.password)) {
    alert('Mohon isi semua field: Nama, Email, NIM, dan Password')
    return
  }

  isSubmitting.value = true
  try {
    const url = isEditing.value ? `${API_BASE}/api/admin/users/${selectedId.value}` : `${API_BASE}/api/admin/users`
    const method = isEditing.value ? 'PATCH' : 'POST'
    
    const response = await fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    const result = await response.json()
    if (result.success) {
      alert(isEditing.value ? 'User berhasil diupdate' : 'User berhasil dibuat')
      resetForm()
      fetchUsers()
    } else {
      alert(result.message || 'Gagal menyimpan user')
    }
  } catch (error) {
    console.error('Error saving user:', error)
    alert('Terjadi kesalahan koneksi ke server')
  } finally {
    isSubmitting.value = false
  }
}

const deleteUser = async (id) => {
  if (!confirm('Yakin ingin menghapus user ini?')) return
  try {
    const response = await fetch(`${API_BASE}/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const result = await response.json()
    if (result.success) {
      alert('User berhasil dihapus')
      fetchUsers()
    }
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}

const editUser = async (id) => {
  isLoading.value = true
  try {
    const response = await fetch(`${API_BASE}/api/admin/users/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const result = await response.json()
    
    if (result.success && result.data) {
      const u = result.data
      form.value = {
        nama: u.nama || u.name,
        email: u.email,
        nim: u.nim || '',
        password: '', 
        role: u.role
      }
      isEditing.value = true
      selectedId.value = id
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  } catch (error) {
    console.error('Error fetching user detail:', error)
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  form.value = { nama: '', email: '', nim: '', password: '', role: 'user' }
  isEditing.value = false
  selectedId.value = null
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div class="max-w-6xl">
    <div class="mb-8">
      <h2 class="text-2xl font-extrabold text-purple-400 uppercase tracking-tight">User Management</h2>
      <p class="text-gray-400 text-sm">Kelola data mahasiswa dan tim BPROTIC</p>
    </div>

    <!-- FORM -->
    <div class="card mb-10">
      <h3 class="text-lg font-bold mb-6 text-white flex items-center gap-2">
        <span class="w-2 h-6 bg-purple-500 rounded-full"></span>
        {{ isEditing ? 'Update User Information' : 'Register New User' }}
      </h3>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="label">Nama Lengkap</label>
          <input v-model="form.nama" class="input" placeholder="Masukkan nama..." />
        </div>
        <div>
          <label class="label">Email Address</label>
          <input v-model="form.email" type="email" class="input" placeholder="email@example.com" />
        </div>
        <div>
          <label class="label">NIM (Nomor Induk Mahasiswa)</label>
          <input v-model="form.nim" class="input" placeholder="Masukkan NIM..." />
        </div>
        <div>
          <label class="label">Role / Hak Akses</label>
          <select v-model="form.role" class="input">
            <option value="user">User / Mahasiswa</option>
            <option value="mentor">Mentor</option>
            <option value="pdd">PDD Team</option>
            <option value="staff">Staff Team</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
        <div v-if="!isEditing" class="md:col-span-2">
          <label class="label">Password Akun</label>
          <input v-model="form.password" type="password" class="input" placeholder="Minimal 6 karakter..." />
        </div>
      </div>

      <div class="mt-8 flex gap-3">
        <button @click="saveUser" class="btn-save" :disabled="isSubmitting">
          {{ isSubmitting ? 'Processing...' : (isEditing ? 'Save Changes' : 'Create Account') }}
        </button>
        <button v-if="isEditing" @click="resetForm" class="btn-cancel">Cancel</button>
      </div>
    </div>

    <!-- TABLE -->
    <div class="card overflow-hidden">
      <div v-if="isLoading" class="text-center py-10">
        <div class="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-gray-400 text-sm italic">Synchronizing with server...</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left text-[10px] uppercase tracking-[0.2em] text-gray-500 border-b border-white/5">
              <th class="p-4">Identity</th>
              <th class="p-4">NIM</th>
              <th class="p-4">Role</th>
              <th class="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-sm text-gray-300">
            <tr v-for="user in users" :key="user.id" class="hover:bg-white/[0.02] transition">
              <td class="p-4">
                <p class="font-bold text-white">{{ user.nama || user.name }}</p>
                <p class="text-xs text-gray-500">{{ user.email }}</p>
              </td>
              <td class="p-4 font-mono text-xs text-purple-300">
                {{ user.nim || '-' }}
              </td>
              <td class="p-4">
                <span :class="{
                  'role-admin': user.role === 'admin',
                  'role-mentor': user.role === 'mentor',
                  'role-pdd': user.role === 'pdd',
                  'role-user': user.role === 'user',
                  'role-staff': user.role === 'staff'
                }" class="role-badge">
                  {{ user.role }}
                </span>
              </td>
              <td class="p-4 text-right">
                <div class="flex justify-end gap-3">
                  <button @click="editUser(user.id)" class="text-blue-400 hover:text-blue-300 text-xs font-bold uppercase tracking-wider">Edit</button>
                  <button @click="deleteUser(user.id)" class="text-red-400 hover:text-red-300 text-xs font-bold uppercase tracking-wider">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div v-if="users.length === 0" class="p-10 text-center text-gray-600 italic">
          No records found in database.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card { @apply bg-[#0d1425] border border-white/5 rounded-3xl p-8; }
.label { @apply text-[10px] uppercase tracking-widest text-gray-500 mb-2 block font-bold; }
.input { @apply w-full p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 text-sm text-white transition placeholder:text-gray-700; }

.btn-save { @apply px-10 py-4 bg-purple-600 hover:bg-purple-700 rounded-2xl font-bold text-sm transition shadow-xl shadow-purple-500/20 disabled:opacity-50; }
.btn-cancel { @apply px-10 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold text-sm transition border border-white/10; }

.role-badge { @apply px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter; }
.role-admin { @apply bg-red-500/20 text-red-400; }
.role-mentor { @apply bg-blue-500/20 text-blue-400; }
.role-pdd { @apply bg-purple-500/20 text-purple-400; }
.role-user { @apply bg-green-500/20 text-green-400; }
.role-staff { @apply bg-gray-500/20 text-gray-400; }
</style>
