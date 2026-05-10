<script setup>
import { ref, onMounted } from 'vue'

const divisions = ref([])
const mentors = ref([])
const isLoading = ref(false)
const isSubmitting = ref(false)

const token = localStorage.getItem('token')
const API_BASE = import.meta.env.VITE_API_URL || ''

const form = ref({
  name: '',
  mentor_id: ''
})

const isEditing = ref(false)
const selectedId = ref(null)

const fetchDivisions = async () => {
  isLoading.value = true
  try {
    const response = await fetch(`${API_BASE}/api/admin/divisions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const result = await response.json()
    console.log("DEBUG DIVISI ALL:", result)

    if (result.success && result.data) {
      divisions.value = result.data
    } else if (Array.isArray(result)) {
      divisions.value = result
    } else {
      divisions.value = []
    }
  } catch (error) {
    console.error('Error fetching divisions:', error)
  } finally {
    isLoading.value = false
  }
}

const fetchMentors = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/admin/users`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const result = await response.json()
    let rawData = result.data || result.users || (Array.isArray(result) ? result : [])
    mentors.value = rawData.filter(u => String(u.role || '').toLowerCase().includes('mentor'))
  } catch (error) {
    console.error('Gagal mengambil data mentor:', error)
  }
}

const getDivisionDetail = async (id) => {
  isLoading.value = true
  try {
    const response = await fetch(`${API_BASE}/api/admin/divisions/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const result = await response.json()
    console.log("DEBUG DIVISI DETAIL:", result)

    if (result.success && result.data) {
      const d = result.data
      form.value = {
        name: d.name,
        mentor_id: d.mentor_id
      }
      isEditing.value = true
      selectedId.value = id
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  } catch (error) {
    console.error('Error fetching detail:', error)
    alert('Gagal mengambil detail divisi')
  } finally {
    isLoading.value = false
  }
}

const saveDivision = async () => {
  if (!form.value.name || !form.value.mentor_id) {
    alert('Isi semua data!')
    return
  }
  
  isSubmitting.value = true
  try {
    const url = isEditing.value ? `${API_BASE}/api/admin/divisions/${selectedId.value}` : `${API_BASE}/api/admin/divisions`
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
      alert(isEditing.value ? 'Divisi berhasil diperbarui' : 'Divisi berhasil ditambahkan')
      resetForm()
      fetchDivisions()
    } else {
      alert(result.message || 'Gagal menyimpan divisi')
    }
  } catch (error) {
    console.error('Error saving division:', error)
    alert('Terjadi kesalahan koneksi')
  } finally {
    isSubmitting.value = false
  }
}

const deleteDivision = async (id) => {
  if (!confirm('Yakin ingin menghapus divisi ini?')) return
  try {
    const response = await fetch(`${API_BASE}/api/admin/divisions/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const result = await response.json()
    if (result.success) {
      fetchDivisions()
    }
  } catch (error) {
    console.error('Gagal menghapus divisi:', error)
  }
}

const resetForm = () => {
  form.value = { name: '', mentor_id: '' }
  isEditing.value = false
  selectedId.value = null
}

onMounted(() => {
  fetchDivisions()
  fetchMentors()
})
</script>

<template>
  <div class="max-w-6xl">
    <div class="mb-8">
      <h2 class="text-2xl font-extrabold text-green-400 uppercase tracking-tight">Division Management</h2>
      <p class="text-gray-400 text-sm">Kelola struktur divisi dan penugasan mentor pendamping</p>
    </div>

    <!-- FORM -->
    <div class="card mb-10">
      <h3 class="text-lg font-bold mb-6 text-white flex items-center gap-2">
        <span class="w-2 h-6 bg-green-500 rounded-full"></span>
        {{ isEditing ? 'Edit Division Detail' : 'Create New Division' }}
      </h3>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="label">Nama Divisi</label>
          <input v-model="form.name" placeholder="Contoh: Web Development" class="input" />
        </div>
        <div>
          <label class="label">Assign Mentor</label>
          <select v-model="form.mentor_id" class="input">
            <option value="" disabled>-- Pilih Mentor --</option>
            <option v-for="m in mentors" :key="m.id" :value="m.id">
              {{ m.nama || m.name }} ({{ m.email }})
            </option>
          </select>
        </div>
      </div>
      <div class="mt-8 flex gap-3">
        <button @click="saveDivision" class="btn-save" :disabled="isSubmitting">
          {{ isSubmitting ? 'Processing...' : (isEditing ? 'Save Changes' : 'Create Division') }}
        </button>
        <button v-if="isEditing" @click="resetForm" class="btn-cancel">Cancel</button>
      </div>
    </div>

    <!-- LIST -->
    <div v-if="isLoading && divisions.length === 0" class="text-center py-10">
       <div class="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto"></div>
    </div>
    
    <div v-else class="grid md:grid-cols-3 gap-6">
      <div v-for="item in divisions" :key="item.id" class="card-item group relative overflow-hidden">
        
        <!-- Hover Overlay for Actions -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 z-10">
          <button @click="getDivisionDetail(item.id)" class="px-4 py-2 bg-blue-500 text-white rounded-lg text-xs font-bold hover:bg-blue-600 transition">
            Edit
          </button>
          <button @click="deleteDivision(item.id)" class="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-bold hover:bg-red-600 transition">
            Delete
          </button>
        </div>

        <div class="mb-4">
          <h3 class="font-bold text-white text-lg">{{ item.name }}</h3>
          <p class="text-[10px] text-gray-500 font-mono mt-1">ID: {{ item.id }}</p>
        </div>
        
        <div class="pt-4 border-t border-white/5 flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 text-sm font-bold border border-green-500/20">
            {{ (item.mentor_name || 'M').charAt(0) }}
          </div>
          <div class="leading-none">
            <p class="text-[9px] text-gray-500 uppercase tracking-[0.1em] mb-1 font-bold">Mentor In Charge</p>
            <p class="text-sm text-gray-200 font-semibold truncate max-w-[150px]">
              {{ item.mentor_name || 'Not Assigned' }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="divisions.length === 0" class="col-span-full py-20 text-center text-gray-600 italic">
        No divisions found in database.
      </div>
    </div>
  </div>
</template>

<style scoped>
.card { @apply bg-[#0d1425] border border-white/5 rounded-3xl p-8; }
.card-item { @apply bg-[#0d1425] border border-white/5 rounded-3xl p-6 transition duration-300; }
.label { @apply text-[10px] uppercase tracking-widest text-gray-500 mb-2 block font-bold; }
.input { @apply w-full p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 text-sm text-white transition; }

.btn-save { @apply px-10 py-4 bg-green-600 hover:bg-green-700 rounded-2xl font-bold text-sm transition shadow-xl shadow-green-500/20 disabled:opacity-50; }
.btn-cancel { @apply px-10 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold text-sm transition border border-white/10; }
</style>
