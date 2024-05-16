import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import ProfileView from '@/views/ProfileView.vue'
import ProfileLibraryView from '@/views/ProfileLibraryView.vue'
import ProjectView from '@/views/ProjectView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/test',
      name: 'test',
      component: HelloWorld
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
      path: '/profile-lib',
      name: 'profile-lib',
      component: ProfileLibraryView
    },
    {
      path: '/project',
      name: 'project',
      component: ProjectView
    },
  ]
})

const isLoggedIn = () => {
  return localStorage.getItem('token')
}
const protectedRoutes = [
  "profile",
]

router.beforeEach((to, from, next) => {
  const isProtected = protectedRoutes.includes(to.name)
  if(isProtected && !isLoggedIn()){
    next({
      path: '/login'
    })
  }else next()
})



export default router
