import Vue from 'vue'
import Router from 'vue-router'
import mapbox from '@/components/mapbox'
import adminMobile from '@/page/adminMobile'
import mapPie from '@/page/mapPie'

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
      path: '/pie',
      name: 'mapPie',
      component: mapPie,
    }, {
      path: '*',
      redirect: '/index'
    }
  ]
})
