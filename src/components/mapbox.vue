<template>
  <div class="container">
    <div id="map"></div>
    <div class="search-wrapper">
      <el-input
        class="search-input"
        placeholder=""
        :value="searchInputValue"
        suffix-icon="el-icon-search"
        @change="handleInput"></el-input>
      <search-drop-down
        v-if="searchDropDownShow"
        v-on:triggerSetCenter="toggleSetCenterLngLat"></search-drop-down>
    </div>
    <div class="filter-wrapper" :class="{filterShow: filterShow}">
      <div class="filter-icon" @click="filterOpen" :class="{display: !filterShow, hidden: filterShow}">
        <img src="http://p1ctmsz1g.bkt.clouddn.com/filter.jpg" class="filter-icon-info"/><span>筛选</span>
      </div>
      <div class="filter-content" :class="{display: filterShow, hidden: !filterShow}">
        <filter-category :existedCategories="existedCategories" ref="filterCategory"></filter-category>
        <filter-tag :existedTags="existedTags" ref="filterTag"></filter-tag>
        <div class="filter-footer">
          <span class="filter-footer-title">共计</span>
          <span>12个</span>
        </div>
      </div>
    </div>
    <information v-if="informationShow"></information>
  </div>
</template>

<script>
import Vue from 'vue'
import tags from '../../data/tags.js'
import categories from '../../data/categories.js'
import results from '../../data/results.js'
import MySvg from './svg'
import popup from './popup'
import filterCategory from './filterCategory'
import filterTag from './filterTag'
import searchDropDown from './searchDropDown'
import information from './information'

L.mapbox.accessToken = 'pk.eyJ1IjoiaWRjamFqYSIsImEiOiJjamt0M3FmdHIwMjJiM3BybjN5M25mZnpqIn0.RKN8x07ZmYzwxCj3_AmU0g';

export default {
  name: 'mapbox',
  data () {
    return {
      map: Object,
      markers: Object,
      searchInputValue: '',
      searchDropDownShow: false,
      filterShow: false,
      existedCategories: categories.existedCategories,
      existedTags: tags.existedTags,
      categorySvgMap: ['','monument','embassy','city','town-hall','commercial']
    }
  },
  computed: {
    markerList() {
      return this.$store.state.markerList
    },
    currentMarkerId() {
      return this.$store.state.currentMarkerId
    },
    informationShow() {
      console.log(this.$store.state.informationShow)
      return this.$store.state.informationShow
    }
  },
  watch: {
    markerList: {
      handler:function (new_value, old_value) {
        var _this = this
        this.markers.eachLayer(function(marker){
          var current_marker = new_value.find(marker => {
            return marker.id === _this.currentMarkerId;
          })
          if(marker.options.id == _this.currentMarkerId) {
            var category = _this.existedCategories.find(catgy => current_marker.categoryId === catgy.iconId );
            var tag = _this.existedTags.find(t => current_marker.tagId === t.id)
            marker.setIcon(L.mapbox.marker.icon({'marker-symbol': _this.categorySvgMap[category.iconId-1], 'marker-color': tag.color}))
          }
        })
      },
      deep: true
    }
  },
  components: {
    MySvg,
    popup,
    filterCategory,
    filterTag,
    searchDropDown,
    information
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap() {
      var _this = this;
      this.map = L.mapbox.map('map')
        .setView([30.602836,104.0723], 15)
        .addLayer(L.mapbox.tileLayer('mapbox.streets'));
      var map = this.map;
      var southWest = L.latLng(30.533126,103.978188),
          northEast = L.latLng(30.625936,104.106075),
          bounds = L.latLngBounds(southWest, northEast);
      map.setMaxBounds(bounds);
      map.on('click',() => {
        this.handleBlur();
        this.$store.dispatch('toggleCloseInformation')
      })
      this.markers = new L.MarkerClusterGroup({
        zoomToBoundsOnClick: false
      });
      var markers = this.markers;
      this.markerList.forEach(item => {
        var category = this.existedCategories.find(catgy => item.categoryId === catgy.iconId );
        var tag = this.existedTags.find(t => item.tagId === t.id);
        
        var marker = L.marker(new L.LatLng(item.latitude, item.longitude),{
          id: item.id,
          icon: L.mapbox.marker.icon({'marker-symbol': this.categorySvgMap[category.iconId-1], 'marker-color': tag.color}),
          name: item.name,
          latitude: item.latitude,
          longitude: item.longitude,
          categoryId: category.iconId,
          tagId: tag.id,
          color: tag.color
        });

        var _popup_el = document.createElement('div');
        _popup_el.setAttribute('id', 'markerpopup');
        var vm = new Vue({
          el: _popup_el,
          components: { popup },
          store: _this.$store,
          template: `
            <popup></popup>
          `
        });
        marker.bindPopup(vm.$el);
        marker.on('click', function(){
          _this.$store.dispatch('toggleResetCurrentMarkerId',item.id);
          _this.$store.commit('setSelectedCategoryId',item.categoryId);
          _this.$store.commit('setSelectedTagId', item.tagId);
          var markersInCluster  = []
          _this.$store.dispatch('toggleSetMarkerClusterList',markersInCluster)
        })
        markers.addLayer(marker);
      });
      map.addLayer(markers);
      markers.on('clusterclick', function(e){
        var markersInCluster = e.layer.getAllChildMarkers();
        var _popup_cluster_el = document.createElement('div');
        _popup_cluster_el.setAttribute('id','popup');
        var vm = new Vue({
          el: _popup_cluster_el,
          components: { popup },
          store: _this.$store,
          template: `
            <popup></popup>
          `
        });
        _this.$store.dispatch('toggleResetCurrentMarkerId',markersInCluster[0].options.id)
        _this.$store.commit('setSelectedCategoryId',markersInCluster[0].options.categoryId);
        _this.$store.commit('setSelectedTagId', markersInCluster[0].options.tagId);
        new L.popup()
          .setLatLng(markersInCluster[0]._latlng)
          .setContent(vm.$el).openOn(map);
        _this.$store.dispatch('toggleSetMarkerClusterList',markersInCluster)
      })
    },
    filterOpen() {
      this.filterShow = true
    },
    handleInput(event) {
      this.searchInputValue = event;
      if(event !== ""){
        this.searchDropDownShow = true;
        return this.$store.dispatch('getSearchResult')
      } else {
        this.searchDropDownShow = false
      }
    },
    handleBlur () {
      this.searchInputValue = '',
      this.searchDropDownShow = false
    },
    toggleSetCenterLngLat() {
      return this.$store.dispatch('toggleSetCenterLngLat')
    },
    listenToInformation() {
      this.informationShow = false
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->