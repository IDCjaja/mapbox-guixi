<template>
  <div class="container">
    <div id="map"></div>
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
  </div>
</template>

<script>
import Vue from 'vue'
import markerList from '../../data/markers.js'
import tags from '../../data/tags.js'
import categories from '../../data/categories.js'
import MySvg from './svg'
import popup from './popup'
import filterCategory from './filterCategory'
import filterTag from './filterTag'

L.mapbox.accessToken = 'pk.eyJ1IjoiaWRjamFqYSIsImEiOiJjamt0M3FmdHIwMjJiM3BybjN5M25mZnpqIn0.RKN8x07ZmYzwxCj3_AmU0g';

export default {
  name: 'mapbox',
  data () {
    return {
      filterShow: false,
      existedCategories: categories.existedCategories,
      existedTags: tags.existedTags,
      categorySvgMap: ['','monument','embassy','city','town-hall','commercial']
    }
  },
  components: {
    MySvg,
    popup,
    filterCategory,
    filterTag
  },
  mounted () {
    var _this = this;
    var map = L.mapbox.map('map')
      .setView([30.602836,104.0723], 13)
      .addLayer(L.mapbox.tileLayer('mapbox.streets'));
    var storeIcon = L.icon({
      iconUrl: '../image/store.png',
      iconSize: [38, 95]
    })
    var markers = new L.MarkerClusterGroup({
      zoomToBoundsOnClick: false
    });
    markerList.forEach(item => {
      var category = this.existedCategories.find(catgy => item.categoryId === catgy.iconId );
      var tag = this.existedTags.find(t => item.tagId === t.id);
      
      var marker = L.marker(new L.LatLng(item.latitude, item.longitude),{
        id: item.id,
        icon: L.mapbox.marker.icon({'marker-symbol': this.categorySvgMap[category.iconId-1], 'marker-color': tag.color}),
        title: item.name
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
      markers.addLayer(marker);
    })
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
      new L.popup()
        .setLatLng(markersInCluster[0]._latlng)
        .setContent(vm.$el).openOn(map);
      console.log(markersInCluster)
    })
  },
  methods: {
    filterOpen() {
      this.filterShow = true
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->