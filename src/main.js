// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './stylesheet/index.scss'
import './mobileComponents/style/index.scss'
import marker_data from '../data/markers.js'
import tags from '../data/tags.js'
import categories from '../data/categories.js'
import search_data from '../data/results.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)

var testList = {id: 24,longitude: 104.062087,latitude: 30.609955,name: '四川省城市车辆置业有限责任公司',tagId: 1,categoryId: 1,address: '四川省成都市武侯区石羊场街道火车南站西路865号四川省城市车辆置业有限责任公司'}
const store = new Vuex.Store({
  state: {
    markerList: marker_data,
    existedTags: [],
    existedCategories: [],
    chooseTags: [],
    chooseCategories: [],
    searchResultList: [],
    markerClusterList: [],
    informationShow: false,
    clustererOpenShow: false,
    currentMarkerId: Number,
    currentMarker: Object,
    selectedCategoryId: Number,
    messageBoxShow: false,
    selectedTagId: Number
  },
  mutations: {
    setTagList(state, data) {
      state.existedTags = data.existedTags;
      state.chooseTags = data.chooseTags;
    },
    setCategoryList(state, data) {
      state.existedCategories = data.existedCategories;
      state.chooseCategories = data.chooseCategories;
    },
    setSearchResult(state,data) {
      state.searchResultList = data
    },
    resetCurrentMarkerId(state,id) {
      state.currentMarkerId = id
    },
    resetCurrentMarker(state, obj) {
      state.currentMarker = obj
    },
    changeTag(state,tagId) {
      // 提交选择的tag的id，更改marker的tag
      var current_marker = state.markerList.find(marker => {
        return marker.id === state.currentMarkerId;
      })
      current_marker.tagId = tagId;
    },
    changeCategory(state,categoryId) {
      state.markerList.forEach(marker => {
        if(marker.id == state.currentMarkerId){
          marker.categoryId = categoryId
        }
      })
    },
    setCenterLngLat() {
      state.markerList.forEach( item => {
        if ( state.currentMarkerId === item.id ) {
          this.map.setView([item.latitude,item.longitude], 18)
        }
      })
    },
    setSelectedCategoryId(state,categoryId) {
      state.selectedCategoryId = categoryId
    },
    setSelectedTagId(state,tagId) {
      state.selectedTagId = tagId
    },
    setMarkerClusterList(state,list) {
      state.markerClusterList = list
    },
    openInformation(state) {
      state.informationShow = true
    },
    closeInformation(state) {
      state.informationShow = false
    },
    clustererListOpen(state, bol){
      state.clustererOpenShow = bol;
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
    },
    getSearchResult(context) {
      setTimeout(() => {
        context.commit('setSearchResult',search_data)
      }, 500);
    },
    toggleResetCurrentMarkerId(context,id) {
      context.commit('resetCurrentMarkerId', id)
    },
    toggleResetCurrentMarker(context,obj) {
      context.commit('resetCurrentMarker', obj)
    },
    getChangeTag(context,tagId) {
      context.commit('changeTag',tagId)
    },
    getChangeCategory(context,categoryId) {
      context.commit('changeCategory',categoryId)
    },
    toggleSetCenterLngLat(context) {
      context.commit('setCenterLngLat')
    },
    getSelectedCategoryId(context,categoryId) {
      context.commit('setSelectedCategoryId',categoryId)
    },
    getSelectedTagId(context,tagId) {
      context.commit('setSelectedTagId',tagId)
    },
    toggleSetMarkerClusterList(context,list) {
      context.commit('setMarkerClusterList',list)
    },
    toggleOpenInformation(context) {
      context.commit('openInformation')
    },
    toggleCloseInformation(context) {
      context.commit('closeInformation')
    },
    toggleClustererListOpen(context,bol){
      context.commit('clustererListOpen',bol)
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
