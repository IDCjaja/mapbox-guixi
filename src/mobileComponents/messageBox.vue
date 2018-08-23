<template>
  <div class="message-footer">
    <div v-if="markerClusterList.length" class="message-toggle">
      <span>更多信息</span>
      <a @click="clustererOpen">展开</a>
    </div>
    <div class="message-body">
      <div class="message-content" @click="tellMessageFooter">
        <div class="title">{{ currentMarker.name }}</div>
        <div class="address">{{ currentMarker.address }}</div>
      </div>
      <div class="message-more">
        <span class="el-icon-arrow-right" @click="tellMessageFooter"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nameFooter',
  computed: {
    currentMarker() {
      return this.$store.state.currentMarker
    },
    markerClusterList() {
      return this.$store.state.markerClusterList
    }
  },
  methods: {
    tellMessageFooter() {
      this.$emit('get-from-message-footer',this.currentMarker.id)
    },
    clustererOpen() {
      this.$store.dispatch('toggleClustererListOpen', true)
    }
  }
}
</script>

<style>

</style>
