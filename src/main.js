// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './stylesheet/index.scss'
import tags from '../data/tags.js'
import categories from '../data/categories.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    existedTags: [],
    existedCategories: [],
    chooseTags: [],
    chooseCategories: []
  },
  mutations: {
    setTagList(state, data) {
      state.existedTags = data.existedTags;
      state.chooseTags = data.chooseTags;
    },
    setCategoryList(state, data) {
      state.existedCategories = data.existedCategories;
      state.chooseCategories = data.chooseCategories;
    }
  },
  actions: {
    getTagList (context) {
      setTimeout(() => {
        context.commit('setTagList',tags)
      }, 500);
    },
    getCategoryList (context) {
      setTimeout(() => {
        context.commit('setCategoryList',categories)
      }, 500);
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  render: h => {
    return h(App)
  }
})
