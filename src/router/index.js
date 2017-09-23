import Vue from 'vue'
import Router from 'vue-router'
import Level from '@/memoryGame/Level'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Level',
      component: Level,
      props: (route) => ({ level: 1 })
    }
  ]
})
