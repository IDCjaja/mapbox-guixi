<template>
  <div class="window-edit">
    <tag-edit-window></tag-edit-window>
    <category-edit-window></category-edit-window>
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
    
  }
}
</script>

<style>

</style>
