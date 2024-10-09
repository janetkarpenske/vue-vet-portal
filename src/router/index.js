import { createRouter, createWebHistory } from 'vue-router'
import RegisterForm from '../components/forms/RegisterForm.vue'
import SigninForm from '../components/forms/SigninForm.vue'
import Home from '../components/Home.vue'
import About from '../components/About.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/users/register', component: RegisterForm },
    { path: '/users/signin', component: SigninForm },
    { path: '/about', component: About }
  ]
})

export default router