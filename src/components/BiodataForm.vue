<script setup>
import { ref } from 'vue'
const emit = defineEmits(['saved'])

const form = ref({
  name:'',
  nim:'',
  kelas:'',
  prodi:'',
  angkatan:''
})

const save = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {}
  Object.assign(user, form.value)

  localStorage.setItem('user', JSON.stringify(user))
  emit('saved')
}
</script>

<template>
  <div class="max-w-md mx-auto space-y-3">

    <input v-model="form.name" placeholder="Nama" class="input"/>
    <input v-model="form.nim" placeholder="NIM" class="input"/>
    <input v-model="form.kelas" placeholder="Kelas" class="input"/>
    <input v-model="form.prodi" placeholder="Prodi" class="input"/>
    <input v-model="form.angkatan" placeholder="Angkatan" class="input"/>

    <button @click="save" class="btn">Simpan</button>

  </div>
</template>

<style scoped>
.input { @apply w-full p-3 bg-white/10 rounded-lg }
.btn { @apply w-full bg-blue-500 py-2 rounded-lg }
</style>