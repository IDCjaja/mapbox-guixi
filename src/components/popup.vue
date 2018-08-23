<template>
<div>
  <div v-if="!markerClusterList.length" class="window-edit">
    <tag-edit-window :radio-name="radioName"></tag-edit-window>
    <category-edit-window :radio-name="radioName"></category-edit-window>
    <div class="window-edit-footer" @click="openInformation">
      <span>桂溪</span>
      <img src="http://p1ctmsz1g.bkt.clouddn.com/more.png" />
    </div>
  </div>
  <el-tabs
    v-if="markerClusterList.length"
    type="card"
    tabPosition="left"
    v-model="activeName"
    @tab-click="handleClick">
    <el-tab-pane v-for="(item,index) in markerClusterList"
      :key="index">
      <span slot="label" :name="index">
        <svg height="16px" width="16px">
          <use :xlink:href="'#icon'+item.options.categoryId" :fill="item.options.color" :stroke="item.options.color"></use>
        </svg>
      {{item.options.name}}</span>
      <div class="window-edit">
        <tag-edit-window :radio-name="item.options.name"></tag-edit-window>
        <category-edit-window :radio-name="item.options.name"></category-edit-window>
        <div class="window-edit-footer" @click="openInformation">
          <span>桂溪</span>
          <img src="http://p1ctmsz1g.bkt.clouddn.com/more.png" />
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import tagEditWindow from './tagEditWindow'
import categoryEditWindow from './categoryEditWindow'
export default {
  data() {
    return {
      activeName: '0',
      radioName: 'default'
    }
  },
  computed: {
    currentMarkerId() {
      return this.$store.state.currentMarkerId
    },
    markerClusterList() {
      return this.$store.state.markerClusterList
    }
  },
  components: {
    tagEditWindow,
    categoryEditWindow
  },
  methods: {
    openInformation () {
      this.$store.dispatch('toggleOpenInformation')
    },
    handleClick(tab,event) {
      this.activeName = tab.index.toString();
      this.$store.dispatch('toggleResetCurrentMarker',this.markerClusterList[tab.index].options.id);
      this.$store.dispatch('getSelectedCategoryId',this.markerClusterList[tab.index].options.categoryId);
      this.$store.dispatch('getSelectedTagId',this.markerClusterList[tab.index].options.tagId);
      console.log(this.currentMarkerId)
    },
  }
}
</script>

<style>

</style>
