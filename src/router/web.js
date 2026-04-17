import Home from '../views/Home.vue'

//  DASHBOARD USER
const Dashboard = () => import('../views/Dashboard.vue')

//  CHILD USER
const DashboardHome = () => import('../views/dashboard/Home.vue')
const DashboardEvent = () => import('../views/dashboard/Event.vue')
const DashboardNews = () => import('../views/dashboard/News.vue')
const DashboardProfile = () => import('../views/dashboard/Profile.vue')
const DashboardCertificate = () => import('../views/dashboard/Certificate.vue')

//  ADMIN
const AdminDashboard = () => import('../views/AdminDashboard.vue')
const AdminEvent = () => import('../views/admin/EventManage.vue')
const AdminNews = () => import('../views/admin/NewsManage.vue')

//  PUBLIC
const News = () => import('../views/News.vue')
const NewsDetail = () => import('../views/NewsDetail.vue')
const EventDetail = () => import('../views/EventDetail.vue')

export default [
  {
    path: '/',
    component: Home
  },

  //  USER DASHBOARD
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      { path: '', component: DashboardHome },
      { path: 'event', component: DashboardEvent },
      { path: 'news', component: DashboardNews },
      { path: 'profile', component: DashboardProfile },
      { path: 'certificate', component: DashboardCertificate }
    ]
  },

  //  ADMIN (JADI LAYOUT)
  {
    path: '/admin',
    component: AdminDashboard,
    children: [
      {
        path: '',
        component: {
          template: '<div />' // biar dashboard default tetap jalan
        }
      },
      {
        path: 'event',
        component: AdminEvent
      },
      {
        path: 'news',
        component: AdminNews
      }
    ]
  },

  //  PUBLIC
  { path: '/news', component: News },
  { path: '/news/:id', component: NewsDetail },
  { path: '/event/:id', component: EventDetail }
]