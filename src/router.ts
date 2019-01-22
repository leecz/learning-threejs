import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/perio',
      name: '/perio',
      component: () =>
        import(/* webpackChunkName: "perio" */ './views/periodictable/index.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () =>
        import(/* webpackChunkName: "perio" */ './views/periodictable/test.vue')
    },
    {
      path: '/perio/local',
      name: 'perio-local',
      component: () =>
        import(/* webpackChunkName: "perio" */ './views/periodictable/local.vue')
    },
    {
      path: '/three/one',
      name: 'three-one',
      // @ts-ignore
      component: () =>
        import(/* webpackChunkName: "three-one" */ '@/views/three/one.vue')
    },
    {
      path: '/three/two',
      name: 'three-two',
      // @ts-ignore
      component: () =>
        import(/* webpackChunkName: "three-two" */ '@/views/three/two.vue')
    },
    {
      path: '/three/two/two',
      name: 'three-two-two',
      // @ts-ignore
      component: () =>
        import(/* webpackChunkName: "three-two" */ '@/views/three/two-two.vue')
    }
  ]
})
