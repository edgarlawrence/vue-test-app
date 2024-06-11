import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '@/views/Dashboard.vue'
import NotFound from '@/views/NotFound.vue'
import Form from '@/views/Form/Index.vue'
import MenuGroup from '@/views/MenuGroup/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/home',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true } // Add meta field to indicate that this route requires authentication
    },
    {
      path: '/login',
      name: 'login',
      component: HomeView
    },
    {
      path: '/form/:id',
      name: 'form',
      component: Form,
      props: true
    },
    {
      path: '/menugroup/:id',
      name: 'menugroup',
      component: MenuGroup,
      props: true
    },
    {
      path: '/process/:id',
      name: 'process',
      component: Form,
      props: true
    },
    {
      path: '/:pathMatch(.*)*', // Matches any route that hasn't been matched yet
      name: 'not-found',
      component: NotFound,
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guard to check if the user is authenticated before accessing protected routes
router.beforeEach((to, from, next) => {
  console.log('to', to)
  console.log('from', from)
  const isAuthenticated = localStorage.getItem('token') !== null; // Check if token exists in localStorage
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // Check if route requires authentication
  
  if (requiresAuth && !isAuthenticated) {
    // If the route requires authentication and the user is not authenticated, redirect to the login page
    next({ name: 'login' }); // Redirect to the login page
  } else if (to.name === 'login' && isAuthenticated) {
    // If the user is already authenticated and tries to access the login page, redirect to the not-found route
    next({ name: 'not-found' }); // Redirect to the not-found route
  } else {
    // Otherwise, proceed to the next route
    next();
  }
});

export default router
