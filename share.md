# mapbox
mapbox地图可视化
## 创建地图
    var map = L.mapbox.map('map', 'mapbox.streets')
## 创建marker
    var marker = L.marker(new L.LatLng(item.latitude, item.longitude),{
      id: 1,
      icon: L.mapbox.marker.icon({'marker-symbol': 'city', 'marker-color': '#a0a0a0'}),
      name: '宜家家居'
    });
    marker.addTo(map)
### 修改marker样式
    marker.setIcon()
## 创建点聚合
    var markers = new L.MarkerClusterGroup({
      zoomToBoundsOnClick: false
    });
    this.markerList.forEach(item => {
      var marker = L.marker(new L.LatLng(item.latitude, item.longitude),{
        id: 1,
        icon: L.mapbox.marker.icon({'marker-symbol': 'city', 'marker-color': '#a0a0a0'}),
        name: '宜家家居'
      })
      markers.addLayer(marker);
    })
    map.addLayer(markers)
## 绑定弹出框
    marker.bindPopup("<div>Hello world!</div>")
    
