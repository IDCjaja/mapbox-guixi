<template>
  <div class="color-wrapper">
    <div v-if="!addTag">
      <div class="color-title">
        <span>颜色</span>
        <i class="icon-circle-plus" @click="addOpen">+</i>
      </div>
      <div class="color-list">
        <ul>
          <li v-for="(tag,index) in existedTags" :key="index">
            <div class="color-bar">
              <label class="radio-button">
                <input
                  type="radio"
                  class="radio-button_orig-readio"
                  :value="tag.id"
                  name="tag_select"/>
                <span
                  class="color-bar-item radio-button_inner"
                  :style="{ backgroundColor: tag.color }">{{ tag.name }}
                  <i class="el-icon-check"></i>
                </span>
              </label>
              <span class="edit-operate">
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="addTag">
      <div class="color-title">
        <span>颜色</span>
      </div>
      <div class="color-list">
        <el-input placeholder=""></el-input>
        <div class="radio-group">
          <label
            class="radio-button"
            v-for="(tag,index) in chooseTags"
            :key="index">
            <input
              type="radio"
              class="radio-button_orig-readio"
              :value="tag.id"
              name="tag_select_edit" />
            <span class="radio-button_inner" :style="{backgroundColor: tag.color}">
              <i class="el-icon-check"></i>
            </span>
          </label>
        </div>
        <span class="tag-repeat-tip">该颜色已存在，确定后会替换之前的颜色</span>
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
      addTag: false
    }
  },
  mounted() {
    return this.$store.dispatch('getTagList')
  },
  computed: {
    existedTags() {
      return this.$store.state.existedTags
    },
    chooseTags() {
      return this.$store.state.chooseTags
    }
  },
  methods: {
    addOpen () {
      this.addTag = true
    }
  }
}
</script>

<style>

</style>
