<template>
  <div class="container">
    <div id="map"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import mapboxgl from 'mapbox-gl'
import markers from '../../data/markers.js'
import MySvg from './svg'
import popup from './popup'

mapboxgl.accessToken = 'pk.eyJ1IjoiaWRjamFqYSIsImEiOiJjamt0M3FmdHIwMjJiM3BybjN5M25mZnpqIn0.RKN8x07ZmYzwxCj3_AmU0g';

export default {
  name: 'mapbox',
  components: {
    MySvg
  },
  mounted () {
    var _this = this;
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [104.0723,30.602836],
      zoom: 10
    });
    var clusterRadius = 50;
    map.on('load', function() {
      map.addSource("earthquakes", {
        type: "geojson",
        data: markers,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: clusterRadius
    });
    map.addLayer({
        id: "clusters",
        type: "circle",
        source: "earthquakes",
        filter: ["has", "point_count"],
        paint: {
            "circle-color": [
                "step",
                ["get", "point_count"],
                "#51bbd6",
                100,
                "#f1f075",
                750,
                "#f28cb1"
            ],
            "circle-radius": [
                "step",
                ["get", "point_count"],
                20,
                100,
                30,
                750,
                40
            ]
        }
    });

    map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "earthquakes",
        filter: ["has", "point_count"],
        layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
        }
    });

    map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "earthquakes",
        filter: ["!has", "point_count"],
        paint: {
            "circle-color": "#11b4da",
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff"
        }
    });
    map.on('click', (e) => {
			var cluster = map.queryRenderedFeatures(e.point, { layers: ["clusters"] });
			if (cluster[0]) {
      	var pointsInCluster = markers.features.filter(function(f){
        	var pointPixels = map.project(f.geometry.coordinates)
          var pixelDistance = Math.sqrt(
            Math.pow(e.point.x - pointPixels.x, 2) + 
            Math.pow(e.point.y - pointPixels.y, 2) 
        );
        return Math.abs(pixelDistance) <= clusterRadius;
        });
        console.log(cluster,pointsInCluster);
        new mapboxgl.Popup ({closeOnClick:true})
          .setLngLat(pointsInCluster[0].geometry.coordinates)
          .setHTML(
             `
              <div id="popup"></div>
             `
            )
          .addTo(map)

        new Vue({
          el: '#popup',
          components: { popup },
          store: _this.$store,
          template: `
            <popup></popup>
          `
        })
      }
		})
    // markers.forEach(marker => {
    //   let el = document.createElement('div');
    //   let span = document.createElement('span');
    //   let svg = document.createElement('svg');
    //   let use = document.createElement('use');
    //   span.className = 'marker-title';
    //   span.innerText = '1';
    //   svg.style.height = '30px';
    //   svg.style.width = '30px';
    //   use.className = 'use-style';
    //   use.setAttribute('xlink:href','#chooseIcon1');
    //   use.setAttribute('fill','#f52b1f');
    //   use.setAttribute('stroke','#f52b1f');
    //   svg.appendChild(use);
    //   el.appendChild(span);
    //   el.appendChild(svg);

    //   el.addEventListener('click', function() {
    //       window.alert(marker.name);
    //   });

    //   // add marker to map
    //   new mapboxgl.Marker(el)
    //     .setLngLat([marker.longitude, marker.latitude])
    //     .addTo(map);
    // })
    })
  },
  methods: {
    test () {
      alert("!")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->