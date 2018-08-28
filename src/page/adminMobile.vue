<template>
  <div class="mobile-map">
    <router-view></router-view>
    <div id="map"></div>
    <div class="mobile-search-content">
      <el-input class="mobile-search-input"
        placeholder="搜索"
        prefix-icon="el-icon-search"
        @focus="toSearch"></el-input>
    </div>
    <div class="mobile-filter-content" :class="{filterCollapse: filterCollapse}">
      <div class="filter-icon-collapse" :class="{display: !filterCollapse, hidden: filterCollapse}" v-on:click="filterOpen">
        <img src="http://p1ctmsz1g.bkt.clouddn.com/mobileFilter.jpg" />
      </div>
      <div class="mobile-filter-detail" :class="{display: filterCollapse, hidden: !filterCollapse}">
        <div class="select-wrapper">
          <mobile-filter-category :category-selected="categorySelected" :select-category-list="selectCategoryList" v-on:listen-select="toSelect"></mobile-filter-category>
          <mobile-filter-tag :tag-selected="tagSelected" :select-tag-list="selectTagList" v-on:listen-select="toSelect"></mobile-filter-tag>
        </div>
        <div class="mobile-footer">
          <span>共计8个</span>
        </div>
      </div>
    </div>
    <message-box
      v-if="messageBoxShow"
      v-on:get-from-message-footer="toInformation"></message-box>
    <marker-cluster-list
      v-if="clustererOpenShow"
      v-on:listen-marker-cluster="toInformation"
      v-on:get-from-markerlist="closeClustererList"></marker-cluster-list>
    <search v-if="searchShow" v-on:listen-search="searchClose"></search>
    <mobile-select v-if="selectShow" v-on:listen-select-close="selectClose" ref="mobileSelect"></mobile-select>
    <mobile-information v-if="informationShow" v-on:listen-information="informationClose"></mobile-information>
  </div>
</template>

<script>
import Vue from 'vue'
import tags from '../../data/tags.js'
import categories from '../../data/categories.js'
import messageBox from '../mobileComponents/messageBox'
import markerClusterList from '../mobileComponents/markerClusterList'
import mobileInformation from '../mobileComponents/information'
import search from '../mobileComponents/search'
import mobileFilterCategory from '../mobileComponents/filterCategory'
import mobileFilterTag from '../mobileComponents/filterTag'
import mobileSelect from '../mobileComponents/select'
export default {
  data() {
    return {
      map: Object,
      markers: Object,
      searchShow: false,
      messageBoxShow: false,
      informationShow: false,
      filterCollapse: false,
      selectShow: false,
      existedCategories: categories.existedCategories,
      existedTags: tags.existedTags,
      categorySvgMap: ['','monument','embassy','city','town-hall','shop'],
      selectCategoryListArr: [],
      selectTagListArr: [],
      categorySelected: [],
      tagSelected: [],
      selectCategoryList: '',
      selectTagList: '',
    }
  },
  computed: {
    currentMarker() {
      return this.$store.state.currentMarker
    },
    markerList() {
      return this.$store.state.markerList
    },
    clustererOpenShow () {
      return this.$store.state.clustererOpenShow
    },
    categoryList() {
      return this.$store.state.existedCategories
    },
    tagList() {
      return this.$store.state.existedTags
    }
  },
  components: {
    messageBox,
    markerClusterList,
    mobileInformation,
    search,
    mobileFilterCategory,
    mobileFilterTag,
    mobileSelect
  },
  mounted() {
    this.initMap();
    this.setLimit();
  },
  methods: {
    initMap() {
      var _this = this;
      this.map = L.mapbox.map('map', 'mapbox.streets',{
        zoomControl: false,
        attributionControl: false
      })
        .setView([30.602836,104.0723], 15)
      var map = this.map;
      map.on('click',() => {
        this.messageBoxShow = false;
        this.filterCollapse = false;
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
          address: item.address,
          categoryId: category.iconId,
          tagId: tag.id,
          color: tag.color
        });
        marker.on('click', function(){
          var markersInCluster  = []
          _this.$store.dispatch('toggleSetMarkerClusterList',markersInCluster);
          _this.$store.dispatch('toggleResetCurrentMarker',item);
          _this.messageBoxShow = true;
        })
        markers.addLayer(marker);
      });
      map.addLayer(markers);
      markers.on('clusterclick', function(e){
        var markersInCluster = e.layer.getAllChildMarkers();
        _this.$store.dispatch('toggleSetMarkerClusterList',markersInCluster);
        _this.$store.dispatch('toggleResetCurrentMarker',markersInCluster[0].options);
        _this.messageBoxShow = true;
      })
    },
    setLimit() {
      var map = this.map;
      var southWest = L.latLng(30.533126,103.978188),
          northEast = L.latLng(30.625936,104.106075),
          bounds = L.latLngBounds(southWest, northEast);
      map.setMaxBounds(bounds);
    },
    toSearch() {
      this.searchShow = true
    },
    searchClose() {
      this.searchShow = false;
      this.map.setView([this.currentMarker.latitude, this.currentMarker.longitude], 20)
    },
    filterOpen() {
      this.filterCollapse = true;
    },
    toSelect() {
      this.selectShow = true;
      var newSelect = [this.selectCategoryListArr,this.selectTagListArr]
      this.$nextTick(() => {
        this.$refs.mobileSelect.setNewSelect(newSelect)
      })
    },
    selectClose(value) {
      this.selectCategoryListArr = value[0];
      this.selectTagListArr = value[1];
      this.selectCategoryList = value[0].join(',');
      this.selectTagList = value[1].join(',');
      this.categorySelected = [];
      this.tagSelected = []
      value[0].forEach(item => {
        this.categoryList.forEach(category => {
          if(category.name == item) {
            this.categorySelected.push(category)
          }
        })
      })
      value[1].forEach(item => {
        this.tagList.forEach(tag => {
          if(tag.name == item) {
            this.tagSelected.push(tag)
          }
        })
      })
      this.selectShow = false
    },
    toInformation(id) {
      this.informationShow = true
    },
    informationClose() {
      this.informationShow = false
    },
    closeClustererList() {
      this.$store.dispatch('toggleClustererListOpen',false);
    }
  }
}
</script>

<style>

</style>
