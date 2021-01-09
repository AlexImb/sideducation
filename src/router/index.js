import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from '@/pages/Landing.vue';
import Login from '@/pages/Login.vue';
import Register from '@/pages/Register.vue';
import Forgot from '@/pages/Forgot.vue';
import Overview from '@/pages/Overview.vue';
import Course from '@/pages/Course.vue';

import { firebaseAuth } from '@/services/firebase';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'landing',
    component: Landing,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: Forgot,
  },
  {
    path: '/overview',
    name: 'overview',
    component: Overview,
    meta: {
      auth: true,
    },
  },
  {
    path: '/:id',
    name: 'course',
    component: Course,
    meta: {
      auth: false,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.meta.auth && !firebaseAuth.currentUser) {
    next('login');
  } else next();
});

export default router;
