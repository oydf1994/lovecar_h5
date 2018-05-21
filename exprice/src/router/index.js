import Vue from 'vue'
import Router from 'vue-router'
import WIN from '@/components/WIN'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'WIN',
      component: WIN
    }
  ]
})
