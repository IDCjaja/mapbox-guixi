import Vue from 'vue'
import Router from 'vue-router'
import mapbox from '@/components/mapbox'
import adminMobile from '@/page/adminMobile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'mapbox',
      component: mapbox
    }, {
      path: '/mobile/admin',
      name: 'adminMobile',
      component: adminMobile,
    }, {
      path: '*',
      redirect: '/index'
    }
  ]
})
