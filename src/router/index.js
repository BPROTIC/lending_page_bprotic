import { createRouter, createWebHistory } from 'vue-router'

import authRoutes from './auth'
import webRoutes from './web'

const routes = [
  ...authRoutes,
  ...webRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔥 ROUTE GUARD VERSION 2.1 (TOKEN-BASED AUTH)
router.beforeEach((to, from, next) => {
  // Gunakan TOKEN sebagai bukti otentik login
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const isLogin = !!token 

  // 1. DAFTAR HALAMAN PUBLIK
  const publicPaths = ['/', '/login', '/register', '/news', '/event']
  const isPublic = publicPaths.some(path => 
    to.path === path || to.path.startsWith('/news/') || to.path.startsWith('/event/')
  )

  // 2. CEK STATUS LOGIN (Jika tidak ada token dan bukan halaman publik)
  if (!isLogin && !isPublic) {
    console.warn("Akses ditolak: Tidak ada token. Kembali ke /login")
    return next('/login')
  }

  // 3. LOGIKA REDIRECT JIKA SUDAH LOGIN
  if (isLogin) {
    // Jika mencoba akses login/register padahal sudah ada token
    if (to.path === '/login' || to.path === '/register') {
      if (role === 'admin') return next('/admin')
      if (role === 'mentor') return next('/mentor')
      if (role === 'pdd') return next('/pdd')
      return next('/dashboard')
    }

    // PROTEKSI ROLE BERDASARKAN PATH
    if (to.path.startsWith('/admin') && role !== 'admin') {
      console.error("Akses dilarang: Anda bukan admin")
      return next('/')
    }
    if (to.path.startsWith('/mentor') && role !== 'mentor') {
      console.error("Akses dilarang: Anda bukan mentor")
      return next('/')
    }
    if (to.path.startsWith('/pdd') && role !== 'pdd') {
      console.error("Akses dilarang: Anda bukan tim PDD")
      return next('/')
    }
  }

  next()
})

export default router