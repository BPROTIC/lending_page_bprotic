import Home from '../views/Home.vue'

// 🔥 lazy load
const News = () => import('../views/News.vue')
const NewsDetail = () => import('../views/NewsDetail.vue')

// 🔥 TAMBAHAN EVENT
const EventDetail = () => import('../views/EventDetail.vue')

export default [
  {
    path: '/',
    component: Home
  },

  // ✅ NEWS
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/news/:id',
    name: 'NewsDetail',
    component: NewsDetail
  },

  // 🔥 EVENT DETAIL (INI YANG KAMU TAMBAHKAN)
  {
    path: '/event/:id',
    name: 'EventDetail',
    component: EventDetail
  }
]