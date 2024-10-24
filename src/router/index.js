import { createRouter, createWebHistory } from 'vue-router'
import RegisterForm from '../components/forms/RegisterForm.vue'
import SigninForm from '../components/forms/SigninForm.vue'
import Home from '../components/views/Home.vue'
import About from '../components/views/About.vue'
import Dashboard from '../components/views/Dashboard.vue'
import { userStore } from '@/store/userStore';

const isAuth = async (to,from,next) => {
  const userStoreRef = userStore();
  let user = userStoreRef.getUser;
  if(!user){
    next({path:'/users/signin'});
    return;
  }
  next();
  return;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/users/register', component: RegisterForm },
    { path: '/users/signin', component: SigninForm },
    { path: '/about', component: About },
    { path: '/dashboard', component: Dashboard, beforeEnter: isAuth }
  ]
})

export default router