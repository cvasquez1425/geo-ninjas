import Vue from 'vue'
import Router from 'vue-router'
import GMap from '@/components/home/GMap'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import ViewProfile from '@/components/profile/ViewProfile'
import firebase from 'firebase'

Vue.use(Router)

//export default
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap,
      meta: {
        requireAuth: true   // protect this rounte unless user is authenticated.
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile/:id',
      name: 'ViewProfile',
      component: ViewProfile,
      meta: {
        requireAuth: true   // protect this rounte unless user is authenticated.
      }
    }
  ]
})
// protect these rountes from people that are not authenticated
router.beforeEach((to, from, next) => {
  //check to see if route requires auth
  if (to.matched.some(rec => rec.meta.requireAuth)) {
    //check auth state of user
    let user = firebase.auth().currentUser
    if (user) {
      // user sign in, proceed to route
      next()
    } else {
      // no user sign in, Redirect to Login
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})
export default router
