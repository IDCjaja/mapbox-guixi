<template>
  <ul class="marker-list">
    <li class="list-title">
      <span>详细信息</span>
      <a @click="closeMarkerList">收起</a>
    </li>
    <li class="item"
      v-for="(item,index) in markerClusterList"
      :key="index"
      @click="toInformation(item.options.id)">
      <span>{{ item.options.name }}
        <small>{{ item.options.address }}</small>
      </span>
      <i class="el-icon-arrow-right"></i>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'markerClusterList',
  computed: {
    markerClusterList() {
      return this.$store.state.markerClusterList
    }
  },
  methods: {
    toInformation(id) {
      var currentMarker;
      this.markerClusterList.forEach(marker => {
        if(marker.id === id){
          currentMarker = marker
        }
      });
      this.$emit('listen-marker-cluster',id)
    },
    closeMarkerList() {
      this.$emit('get-from-markerlist')
    }
  }
}
</script>