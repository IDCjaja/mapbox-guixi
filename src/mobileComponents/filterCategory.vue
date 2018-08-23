<template>
  <div class="filter-body">
    <div class="filter-select">
      <span class="filter-select-title">分类</span>
      <el-input v-model="selectCategoryList" placeholder="请选择" suffix-icon="el-icon-arrow-right" @focus="toSelect"></el-input>
    </div>
    <div class="filter-list-wrapper">
      <ul>
        <li
          v-for="item in categorySelected"
          :key="item.value">
          <span class="filter-category-icon">
            <svg height="16px" width="16px"><use :xlink:href="'#icon'+item.categoryId" fill="rgb(204, 204, 204)" stroke="rgb(204, 204, 204)" class="use-style"></use></svg>
          </span>
          <span class="filter-tag-title">{{ item.name }}</span>
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
      category: '',
    }
  },
  props: {
    categorySelected: Array,
    selectCategoryList: String
  },
  methods: {
    toSelect() {
      this.$emit("listen-select")
    }
  }
}
</script>