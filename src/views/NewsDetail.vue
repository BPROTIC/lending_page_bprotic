<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { 
  ArrowLeft, Calendar, Users, Info, Flag, Image as ImageIcon,
  ChevronLeft, ChevronRight, Share2
} from 'lucide-vue-next'
import { mockNews } from '../utils/mockData'

const route = useRoute()
const router = useRouter()

const news = ref(null)
const isLoading = ref(false)
const isCopied = ref(false)

const fetchNewsDetail = async () => {
  isLoading.value = true
  try {
    const response = await fetch(`/api/news/${route.params.id}`)
    const result = await response.json()
    if (result.success) {
      news.value = result.data
    } else {
      const found = mockNews.find(item => item.id == route.params.id)
      news.value = found || null
    }
  } catch (error) {
    console.error('Error fetching news detail, using mock fallback:', error)
    const found = mockNews.find(item => item.id == route.params.id)
    news.value = found || null
  } finally {
    isLoading.value = false
  }
}

const shareNews = () => {
  const shareData = {
    title: news.value?.title || 'Berita BPROTIC',
    text: `Baca berita terbaru dari BPROTIC: ${news.value?.title}`,
    url: window.location.href
  }

  // Jika browser mendukung fitur Share bawaan (terutama di HP)
  if (navigator.share) {
    navigator.share(shareData)
      .catch((err) => console.log('Error sharing', err))
  } else {
    // Jika di Laptop/Browser yang tidak mendukung Share API, pakai Copy to Clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      isCopied.value = true
      setTimeout(() => {
        isCopied.value = false
      }, 2000)
    })
  }
}

onMounted(() => {
  fetchNewsDetail()
})
</script>

<template>
  <section class="min-h-screen bg-[#050B18] text-white px-6 py-20">

    <div class="max-w-4xl mx-auto">
      <button @click="router.back()" class="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition group">
        <ArrowLeft size="18" class="group-hover:-translate-x-1 transition" /> 
        <span class="text-sm font-medium">Kembali</span>
      </button>

      <!-- ✅ LOADING STATE -->
      <div v-if="isLoading" class="text-center py-20">
        <div class="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full mb-4 text-blue-500"></div>
        <p class="text-gray-400">Memuat detail berita...</p>
      </div>

      <!-- ✅ JIKA DATA ADA -->
      <div v-else-if="news">
        
        <!-- HEADER IMAGE -->
        <div class="relative w-full h-[450px] rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-blue-500/10">
          <img 
            :src="news.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop'" 
            class="w-full h-full object-cover" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          
          <div class="absolute bottom-8 left-8 right-8">
            <div class="flex items-center gap-3 mb-4">
              <span class="px-3 py-1 bg-blue-500 text-white text-[10px] font-bold uppercase rounded-md">
                Laporan Kegiatan
              </span>
              <p class="text-white/80 text-xs flex items-center gap-2">
                <Calendar size="14" /> {{ new Date(news.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}
              </p>
            </div>
            <h1 class="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              {{ news.title }}
            </h1>
          </div>
        </div>

        <!-- CONTENT GRID -->
        <div class="grid md:grid-cols-3 gap-12">
          
          <!-- LEFT: MAIN CONTENT -->
          <div class="md:col-span-2 space-y-12">
            
            <!-- RINGKASAN -->
            <section class="space-y-4">
              <h2 class="text-xl font-bold flex items-center gap-3 text-blue-400">
                <Info size="20" /> Tentang Kegiatan
              </h2>
              <div class="text-gray-300 leading-relaxed text-lg">
                {{ news.content }}
              </div>
            </section>

            <!-- JALANNYA KEGIATAN -->
            <section class="space-y-4 bg-white/5 p-8 rounded-3xl border border-white/10">
              <h2 class="text-xl font-bold flex items-center gap-3 text-indigo-400">
                <ChevronRight size="20" /> Jalannya Kegiatan
              </h2>
              <p class="text-gray-400 leading-relaxed">
                {{ news.flow || 'Detail jalannya kegiatan belum tersedia.' }}
              </p>
            </section>

            <!-- HASIL KEGIATAN -->
            <section class="space-y-4">
              <h2 class="text-xl font-bold flex items-center gap-3 text-green-400">
                <Flag size="20" /> Hasil Kegiatan
              </h2>
              <div class="p-6 bg-green-500/5 border border-green-500/10 rounded-2xl text-gray-300 italic">
                "{{ news.results || 'Laporan hasil kegiatan sedang dalam proses penyusunan.' }}"
              </div>
            </section>

            <!-- GALERI FOTO -->
            <section class="space-y-6">
              <h2 class="text-xl font-bold flex items-center gap-3 text-purple-400">
                <ImageIcon size="20" /> Dokumentasi Foto
              </h2>
              <div v-if="news.gallery && news.gallery.length > 0" class="grid grid-cols-2 gap-4">
                <div v-for="(img, idx) in news.gallery" :key="idx" class="overflow-hidden rounded-2xl aspect-video group cursor-zoom-in">
                  <img :src="img" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </div>
              </div>
              <p v-else class="text-gray-500 text-sm italic">Belum ada foto dokumentasi.</p>
            </section>
          </div>

          <!-- RIGHT: SIDEBAR INFO -->
          <div class="space-y-6">
            <div class="sticky top-28 space-y-6">
              
              <div class="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-6">
                
                <div>
                  <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Tanggal Pelaksanaan</label>
                  <p class="text-white font-semibold flex items-center gap-2">
                    <Calendar size="16" class="text-blue-500" /> {{ news.event_date || 'Belum Ditentukan' }}
                  </p>
                </div>

                <div class="pt-6 border-t border-white/10">
                  <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Peserta / Sasaran</label>
                  <p class="text-white font-semibold flex items-center gap-2">
                    <Users size="16" class="text-blue-500" /> {{ news.participants || 'Segenap Member BPROTIC' }}
                  </p>
                </div>

                <div class="pt-6 border-t border-white/10">
                  <button 
                    @click="shareNews" 
                    :class="[
                      'w-full py-3 rounded-xl transition text-sm font-bold flex items-center justify-center gap-2',
                      isCopied ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                    ]"
                  >
                    <Share2 v-if="!isCopied" size="18" />
                    {{ isCopied ? 'Link Berhasil Disalin!' : 'Bagikan Berita' }}
                  </button>
                </div>

              </div>

              <!-- ADS / OTHER INFO -->
              <div class="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-3xl text-white">
                <h4 class="font-bold mb-2">BPROTIC 2026</h4>
                <p class="text-xs text-blue-100 leading-relaxed">
                  Terus ikuti perkembangan teknologi terbaru bersama komunitas kami.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      <!-- 🔥 DATA TIDAK DITEMUKAN -->
      <div v-else class="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
        <p class="text-xl text-gray-400">Berita tidak ditemukan atau sudah dihapus 😢</p>
        <button @click="router.push('/news')" class="mt-4 text-blue-400 hover:underline text-sm">
          Lihat Berita Lainnya
        </button>
      </div>
    </div>

  </section>
</template>