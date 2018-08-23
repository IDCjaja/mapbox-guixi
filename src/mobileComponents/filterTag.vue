<template>
  <div class="filter-body">
    <div class="filter-select">
      <span class="filter-select-title">颜色</span>
      <el-input v-model="selectTagList" placeholder="请选择" suffix-icon="el-icon-arrow-right" @focus="toSelect"></el-input>
    </div>
    <div class="filter-list-wrapper">
      <ul>
        <li
          v-for="item in tagSelected"
          :key="item.value">
          <span class="filter-color-block" :style="{backgroundColor: item.color}"></span>
          <span class="filter-tag-title">
            <span class="filter-color-badge"></span>
            {{ item.name }}
          </span>
          <span>{{ item.number }}个</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tag: '',
    }
  },
  props: {
    tagSelected: Array,
    selectTagList: String
  },
  methods: {
    toSelect() {
      this.$emit("listen-select")
    }
  }
}
</script>