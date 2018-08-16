<template>
  <div class="window-edit">
    <tag-edit-window></tag-edit-window>
    <category-edit-window></category-edit-window>
    <div class="window-edit-footer" @click="openInformation">
      <span>桂溪</span>
      <img src="http://p1ctmsz1g.bkt.clouddn.com/more.png" />
    </div>
  </div>
</template>

<script>
import tagEditWindow from './tagEditWindow'
import categoryEditWindow from './categoryEditWindow'
export default {
  components: {
    tagEditWindow,
    categoryEditWindow
  },
  methods: {
    openInformation () {
      alert("!")
    }
  }
}
</script>

<style>

</style>
