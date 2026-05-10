import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import MentorLayout from '../layouts/MentorLayout.vue'
import PDDLayout from '../layouts/PDDLayout.vue'
import StaffLayout from '../layouts/StaffLayout.vue'

// 🔥 CHILD USER
const DashboardHome = () => import('../views/dashboard/Home.vue')
const DashboardEvent = () => import('../views/dashboard/Event.vue')
const DashboardNews = () => import('../views/dashboard/News.vue')
const DashboardMaterial = () => import('../views/dashboard/Material.vue')
const DashboardProfile = () => import('../views/dashboard/Profile.vue')
const DashboardCertificate = () => import('../views/dashboard/Certificate.vue')

// 🔥 ADMIN CHILD
const AdminEvent = () => import('../views/admin/EventManage.vue')
const AdminNews = () => import('../views/admin/NewsManage.vue')
const AdminClass = () => import('../views/admin/ClassManage.vue')
const AdminDivision = () => import('../views/admin/DivisionManage.vue')
const AdminUser = () => import('../views/admin/UserManage.vue')

// 🔥 MENTOR CHILD
const MentorHome = () => import('../views/mentor/Home.vue')
const MentorMaterials = () => import('../views/mentor/MaterialManage.vue')

// 🔥 PDD CHILD
const PDDHome = () => import('../views/team/PDD.vue')
const PDDData = () => import('../views/pdd/DataManagement.vue')
const PDDAnalytics = () => import('../views/pdd/Analytics.vue')

// 🔥 OTHERS
const News = () => import('../views/News.vue')
const NewsDetail = () => import('../views/NewsDetail.vue')
const EventDetail = () => import('../views/EventDetail.vue')
const Mentor = () => import('../views/team/Mentor.vue')
const Staff = () => import('../views/team/Staff.vue')

export default [
  { path: '/', component: Home },

  // 🔐 USER DASHBOARD
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      { path: '', component: DashboardHome },
      { path: 'event', component: DashboardEvent },
      { path: 'news', component: DashboardNews },
      { path: 'material', component: DashboardMaterial },
      { path: 'profile', component: DashboardProfile },
      { path: 'certificate', component: DashboardCertificate }
    ]
  },

  // 🔥 ADMIN
  {
    path: '/admin',
    component: AdminDashboard,
    children: [
      { path: '', component: { template: '<div />' } },
      { path: 'event', component: AdminEvent },
      { path: 'news', component: AdminNews },
      { path: 'class', component: AdminClass },
      { path: 'division', component: AdminDivision },
      { path: 'user', component: AdminUser }
    ]
  },

  // 🔥 MENTOR
  {
    path: '/mentor',
    component: MentorLayout,
    children: [
      { path: '', component: MentorHome },
      { path: 'materials', component: MentorMaterials }
    ]
  },

  // 🔥 PDD (MENGGUNAKAN FLAT ROUTES AGAR TIDAK ERROR)
  {
    path: '/pdd',
    component: PDDLayout,
    children: [{ path: '', name: 'pdd-dashboard', component: PDDHome }]
  },
  {
    path: '/pdd-data',
    component: PDDLayout,
    children: [{ path: '', name: 'pdd-data', component: PDDData }]
  },
  {
    path: '/pdd-analytics',
    component: PDDLayout,
    children: [{ path: '', name: 'pdd-analytics', component: PDDAnalytics }]
  },

  // 🔥 STAFF
  {
    path: '/staff',
    component: StaffLayout,
    children: [
      { path: '', component: Staff }
    ]
  },

  // 🌍 PUBLIC
  { path: '/news', component: News },
  { path: '/news/:id', component: NewsDetail },
  { path: '/event/:id', component: EventDetail },
  { path: '/team/mentor', component: Mentor }
]