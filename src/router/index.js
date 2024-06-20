import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ProfileLibraryView from '@/views/ProfileLibraryView.vue'
import ProjectView from '@/views/ProjectView.vue'

import FavoritesView from '@/views/FavoritesView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/',
      name: 'profile-lib',
      component: ProfileLibraryView
    },
    {
      path: '/project/:id',
      name: 'ProjectView',
      component: ProjectView,
      props: true
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView
    },
  ]
})

const isLoggedIn = () => {
  return localStorage.getItem('accessToken') ;
}
const protectedRoutes = [
  "profile",
  "favorites"
]

router.beforeEach((to, from, next) => {
  const isProtected = protectedRoutes.includes(to.name)

  if (isProtected && !isLoggedIn()) {
    next({ path: '/login' })
  } else if ((to.name === 'login' || to.name === 'register') && isLoggedIn()) {
    next({ path: '/' })
  } else {
    next()
  }
})



export default router
