<script setup>
import { ref, onMounted } from 'vue'

const news = ref([])
const form = ref({ title: '', date: '' })
const editIndex = ref(null)

onMounted(() => {
  news.value = JSON.parse(localStorage.getItem('news')) || []
})

const saveNews = () => {
  if (!form.value.title || !form.value.date) return

  if (editIndex.value !== null) {
    news.value[editIndex.value] = { ...form.value }
    editIndex.value = null
  } else {
    news.value.push({ ...form.value })
  }

  localStorage.setItem('news', JSON.stringify(news.value))
  form.value = { title: '', date: '' }
}

const editNews = (i) => {
  form.value = { ...news.value[i] }
  editIndex.value = i
}

const deleteNews = (i) => {
  news.value.splice(i, 1)
  localStorage.setItem('news', JSON.stringify(news.value))
}
</script>

<template>
  <div class="max-w-5xl">

    <!-- HEADER -->
    <div class="mb-8">
      <h2 class="text-2xl font-extrabold text-purple-400">
        Kelola News
      </h2>
      <p class="text-gray-400 text-sm mt-1">
        Tambahkan dan atur berita terbaru
      </p>
    </div>

    <!-- FORM -->
    <div class="card mb-8">

      <div class="grid md:grid-cols-2 gap-4">

        <input 
          v-model="form.title"
          placeholder="Judul News"
          class="input"
        />

        <input 
          v-model="form.date"
          placeholder="Tanggal (contoh: 10 April 2026)"
          class="input"
        />

      </div>

      <button @click="saveNews" class="btn-primary mt-5">
        {{ editIndex !== null ? 'Update News' : 'Tambah News' }}
      </button>

    </div>

    <!-- LIST -->
    <div class="space-y-4">

      <div 
        v-for="(n, i) in news" 
        :key="i"
        class="card flex items-center justify-between hover:scale-[1.01]"
      >

        <!-- INFO -->
        <div>
          <p class="font-semibold text-white">
            {{ n.title }}
          </p>
          <p class="text-sm text-gray-400">
            {{ n.date }}
          </p>
        </div>

        <!-- ACTION -->
        <div class="flex gap-2">

          <button 
            @click="editNews(i)" 
            class="btn-edit"
          >
            Edit
          </button>

          <button 
            @click="deleteNews(i)" 
            class="btn-delete"
          >
            Hapus
          </button>

        </div>

      </div>

      <!-- EMPTY -->
      <div 
        v-if="news.length === 0" 
        class="text-center text-gray-500 mt-10"
      >
        Belum ada news 😢
      </div>

    </div>

  </div>
</template>

<style scoped>
.card {
  @apply bg-white/5 backdrop-blur-xl border border-white/10 
         rounded-2xl p-6 transition duration-300;
}

.input {
  @apply w-full p-3 bg-white/10 rounded-xl outline-none 
         focus:ring-2 focus:ring-purple-500 text-sm;
}

.btn-primary {
  @apply px-5 py-2 bg-purple-500 hover:bg-purple-600 
         rounded-xl transition text-sm font-medium;
}

.btn-edit {
  @apply px-3 py-1 text-sm bg-blue-500/20 text-blue-400 
         rounded-lg hover:bg-blue-500/30 transition;
}

.btn-delete {
  @apply px-3 py-1 text-sm bg-red-500/20 text-red-400 
         rounded-lg hover:bg-red-500/30 transition;
}
</style>