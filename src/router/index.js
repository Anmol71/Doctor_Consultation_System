//import Vue from 'vue';
import { createRouter, createWebHistory} from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";

import ProfilePage from '@/components/ProfilePage.vue';
import PatientProfile from '@/components/PatientProfile.vue';
import DoctorProfile from '@/components/DoctorProfile.vue';

//import HomePage from '@/components/HomePage.vue'
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '@/components/RegisterPage.vue';

import Dashboard from '@/components/DashBoard.vue'
import PatientDashboard from '@/components/PatientDashboard.vue';
import DoctorDashboard from '@/components/DoctorDashboard.vue';

import MyDoctor from '@/components/MyDoctor.vue';
import MyPatient from '@/components/MyPatient.vue';
import MyAppointments from '@/components/MyAppointments.vue';

import ChatPage from '@/components/ChatPage.vue'
import MessagePage from '@/components/MessagePage.vue'

//import ReportMaker from '@/components/ReportMaker.vue'
//Vue.use(VueRouter);

const routes = [
  
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children:[{
      path: '/PatientDashboard/:docId',
      name: 'PatientDashboard',
      component: PatientDashboard,
      meta: { requiresAuth: true } 
   
  },
  {
    path: '/DoctorDashboard/:docId',
    name: 'DoctorDashboard',
    component: DoctorDashboard,
    meta: { requiresAuth: true } 
    
  },
  {
    path:'/MyAppointments/:docId',
    name:'MyAppointments',
    component:MyAppointments,
    meta:{
      requiresAuth: true,
      role: 'doctor'
    }
  },
  {
    path:"/profile",
    name:"ProfilePage",
    component:ProfilePage,
    children:[
      {
        path: '/DoctorProfile/:docId',
        name: 'DoctorProfile',
        component: DoctorProfile,
        meta: { requiresAuth: true } 
      },
      {
        path: '/PatientProfile/:docId',
        name: 'PatientProfile',
        component: PatientProfile,
        meta: { requiresAuth: true } 
      }
    ]
  
  },
  {
  
    path: '/MyDoctor/:docId',
    name: 'MyDoctor',
    component: MyDoctor,
      meta: { requiresAuth: true,
      role: 'doctor' } 
  },
  {
    path: '/MyPatient/:docId',
    name: 'MyPatient',
    component: MyPatient,
      meta: { requiresAuth: true,
      role: 'patient'  } 
},

]
},
{
  path:'/ChatPage/:docId',
  name:'ChatPage',
  component:ChatPage,
  meta:{
    requiresAuth: true,
  }
},
{
  path:'/MessagePage/:docId',
  name:'MessagePage',
  component:MessagePage,
  meta:{
    requiresAuth: true,
  }
}
  
  
];

const router=createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // If the route requires authentication
  if (requiresAuth) {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is logged in, proceed to the next route
        next();
      } else {
        // User is not logged in, redirect to the login page
        next({ name: "Login" });
      }
    });
  } else {
    // Route doesn't require authentication, proceed to the next route
    next();
  }
});

export default router
