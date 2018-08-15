<template>
  <div class="icon-edit-wrapper">
    <div v-if="!editCategoryShow">
      <div class="icon-title">
        <span>分类</span>
        <i class="icon-circle-plus" @click="addOpen">+</i>
      </div>
      <div class="existed-icon-wrapper">
        <label
          class="radio-button"
          v-for="(category,index) in existedCategories"
          :key="index">
          <input type="radio"
            class="radio-button_orig-readio"
            :value="category.id"
            name="category_select_edit"
            >
          <div class="existed-icon-list radio-button_inner">
            <svg class="radio-button_inner" height="16px" width="16px">
              <use xlink:href="#icon1" fill="#a2a2a2" stroke="#a2a2a2"></use>
            </svg>
            <span>{{ category.name }}</span>
            <i class="el-icon-edit"></i>
            <i class="el-icon-delete"></i>
          </div>
        </label>
      </div>
    </div>
    <div v-if="editCategoryShow">
      <div class="icon-title">
        <span>分类</span>
      </div>
      <div class="edit-icon-content">
        <el-input placeholder="请输入内容"></el-input>
        <div class="edit-icon-list">
          <div class="svg-box">
            <label
              class="radio-button"
              v-for="(category, index) in chooseCategories"
              :key="index">
              <input
                type="radio"
                class="radio-button_orig-readio"
                :value="category.id"
                name="category_select" />
              <svg class="radio-button_inner" height="16px" width="16px">
                <use :xlink:href="'#icon' + category.id" fill="#a2a2a2" stroke="#a2a2a2"></use>
                <!-- <use xlink:href="#icon１" fill="#f07235" stroke="#f07235"></use> -->
              </svg>
            </label>
          </div>
          <span class="tag-repeat-tip">该图标已存在，确定后会替换之前的图标</span>
        </div>
        <div class="submit-btn-group">
          <el-button>取消</el-button>
          <el-button class="orangeBtn">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editCategoryShow: false
    }
  },
  mounted() {
    return this.$store.dispatch('getCategoryList')
  },
  computed: {
    existedCategories() {
      return this.$store.state.existedCategories
    },
    chooseCategories() {
      return this.$store.state.chooseCategories
    }
  },
  methods: {
    addOpen() {
      this.editCategoryShow = true
    }
  }
}
</script>

<style>

</style>
