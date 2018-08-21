<template>
  <div class="search-dropdown">
    <ul v-if="searchResultList.length">
      <li v-for="(item,index) in searchResultList" :key="index" v-on:click="triggerSetCenter(item.id)">
        <i class="el-icon-search"></i>
        <span>{{item.name}}</span>
        <small>{{item.address}}</small>
      </li>
    </ul>
    <div v-else class="no-result">
      <label><span class="el-icon-search"></span>没有找到想要的结果</label>
    </div>
  </div>
</template>

<script>
export default {
  name:'searchDropdown',
  computed: {
    searchResultList () {
      return this.$store.state.searchResultList
    }
  },
  methods: {
    triggerSetCenter(id) {
      this.$emit('triggerSetCenter',id)
    }
  }
}
</script>

<style>

</style>
