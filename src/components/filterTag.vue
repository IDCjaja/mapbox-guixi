<template>
  <div class="filter-body">
    <div class="filter-select">
      <span class="filter-select-title">颜色</span>
      <el-select
        v-model="tag"
        multiple
        placeholder="请选择"
        @change="tagSelect"
        ref="filterTag">
        <el-option
          v-for="(item,index) in existedTags"
          :key="index"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
    </div>
    <div class="filter-list-wrapper">
      <ul>
        <li
          v-for="item in tagSelectList"
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
      tag:'',
      tagSelectList: []
    }
  },
  props: {
    existedTags: Array
  },
  methods: {
    tagSelect() {
      this.tagSelectList = [];
      this.tag.map(item => {
        this.existedTags.forEach(tag => {
          if(tag.name == item){
            this.tagSelectList.push(tag)
          }
        });
      });
    },
    closeSelect(){
      this.$refs.filterTag.blur();
    }
  }
}
</script>

<style>

</style>
