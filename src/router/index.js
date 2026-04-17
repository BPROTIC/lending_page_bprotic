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

// 🔥 ROUTE GUARD FINAL (STABLE & FLEXIBLE)
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('isLogin')
  const role = localStorage.getItem('role')

  // 🔐 PROTEKSI DASHBOARD (SEMUA CHILD)
  if (to.path.startsWith('/dashboard') && !isLogin) {
    return next('/login')
  }

  // 🔐 PROTEKSI ADMIN (SEMUA CHILD)
  if (to.path.startsWith('/admin') && role !== 'admin') {
    return next('/dashboard')
  }

  // 🔥 OPTIONAL: kalau sudah login & buka login → redirect
  // (boleh kamu hapus kalau mau bebas pindah akun)
  if (to.path === '/login' && isLogin) {
    if (role === 'admin') {
      return next('/admin')
    }
    return next('/dashboard')
  }

  next()
})

export default router