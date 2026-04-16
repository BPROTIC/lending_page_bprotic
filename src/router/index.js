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

export default router