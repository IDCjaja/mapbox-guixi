<template>
  <div class="container">
    <div id="map"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import markerList from '../../data/markers.js'
import tags from '../../data/tags.js'
import categories from '../../data/categories.js'
import MySvg from './svg'
import popup from './popup'

L.mapbox.accessToken = 'pk.eyJ1IjoiaWRjamFqYSIsImEiOiJjamt0M3FmdHIwMjJiM3BybjN5M25mZnpqIn0.RKN8x07ZmYzwxCj3_AmU0g';

export default {
  name: 'mapbox',
  data () {
    return {
      existedCategories: categories.existedCategories,
      existedTags: tags.existedTags
    }
  },
  components: {
    MySvg
  },
  mounted () {
    var _this = this;
    var map = L.mapbox.map('map')
      .setView([30.602836,104.0723], 13)
      .addLayer(L.mapbox.tileLayer('mapbox.streets'));
    var markers = new L.MarkerClusterGroup({
      zoomToBoundsOnClick: false
    });
    markerList.forEach(item => {
      var category = this.existedCategories.find(catgy => item.categoryId === catgy.iconId );
      var tag = this.existedTags.find(t => item.tagId === t.id);
      
      var marker = L.marker(new L.LatLng(item.latitude, item.longitude),{
        id: item.id,
        icon: L.mapbox.marker.icon({'marker-symbol': 'post', 'marker-color': tag.color}),
        title: item.name
      });
      marker.bindPopup('<div id="markerpopup"></div>');
      new Vue({
        el: '#markerpopup',
        components: { popup },
        store: _this.$store,
        template: `
          <popup></popup>
        `
      });
      markers.addLayer(marker);
    })
    map.addLayer(markers);
    markers.on('clusterclick', function(e){
      var markersInCluster = e.layer.getAllChildMarkers();
      var popup = L.popup()
        .setLatLng(markersInCluster[0]._latlng)
        .setContent(
          `
          <div id="popup"></div>
          `
        ).openOn(map)
      new Vue({
        el: '#popup',
        components: { popup },
        store: _this.$store,
        template: `
          <popup></popup>
        `
      });
      console.log(e.layer.getAllChildMarkers())
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->