<template>
  <div class="color-wrapper">
    <div v-if="!addTag">
      <div class="color-title">
        <span>颜色</span>
        <i class="icon-circle-plus" @click="addOpen">+</i>
      </div>
      <div class="color-list">
        <ul>
          <li
            v-for="(tag,index) in existedTags"
            :key="index"
            v-on:mouseenter="toggleOpenEdit(index)"
            v-on:mouseleave="toggleCloseEdit(index)">
            <div class="color-bar">
              <label class="radio-button">
                <input
                  type="radio"
                  class="radio-button_orig-readio"
                  :value="tag.id"
                  v-model="selectedTagId"
                  @click="changeTag(tag.id)"
                  :name="'tag_select'+radioName"/>
                <span
                  class="color-bar-item radio-button_inner"
                  :class="{active:toggleShow[index]}"
                  :style="{ backgroundColor: tag.color }">{{ tag.name }}
                  <i class="el-icon-check"></i>
                </span>
              </label>
              <span class="edit-operate" :class="{show:toggleShow[index]}">
                <i class="el-icon-edit" @click="editColorOpen('edit',tag.id,tag.name)"></i>
                <i class="el-icon-delete" @click="tagMessageBoxOpen(tag.id)"></i>
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
        <el-input placeholder="" v-model="newTagName"></el-input>
        <div class="radio-group">
          <label
            class="radio-button"
            v-for="(tag,index) in chooseTags"
            :key="index">
            <input
              type="radio"
              class="radio-button_orig-readio"
              @click="colorRepeatConfirm(tag.id)"
              :value="tag.id"
              v-model="tagChoosedId"
              name="tag_select_edit" />
            <span class="radio-button_inner" :style="{backgroundColor: tag.color}">
              <i class="el-icon-check"></i>
            </span>
          </label>
        </div>
        <span v-if="tagRepeatTip" class="tag-repeat-tip">该颜色已存在，确定后会替换之前的颜色</span>
        <div class="submit-btn-group">
          <el-button @click="addClose">取消</el-button>
          <el-button class="orangeBtn" @click="addNewTag">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      addTag: false,
      toggleShow: [false,false,false,false],
      flag: 'add',
      newTagName:'',
      tagChoosedId: Number,
      editTagId: Number,
      tagRepeatTip: false
    }
  },
  mounted() {
    return this.$store.dispatch('getTagList')
  },
  props: {
    radioName: String
  },
  computed: {
    existedTags() {
      return this.$store.state.existedTags
    },
    chooseTags() {
      return this.$store.state.chooseTags
    },
    selectedTagId: {
      get() {
        return this.$store.state.selectedTagId
      },
      set(id) {
        this.$store.commit('setSelectedTagId', id)
      }
    }
  },
  methods: {
    toggleOpenEdit(index) {
      this.$set(this.toggleShow, index, true)
    },
    toggleCloseEdit(index) {
      this.$set(this.toggleShow, index, false)
    },
    tagMessageBoxOpen(id) {
      this.$confirm('<div><h4>您确定要删除这个颜色?</h4><ol><li>您将无法撤销</li><li>将从所有地点移除此颜色，并清除其历史记录，请谨慎对待!</li></ol></div>','删除',{
        dangerouslyUseHTMLString: true,
        showCancelButton: false,
        confirmButtonText: '确认删除'
      }).then(() => {
        this.existedTags.forEach((deleteTag,index) => {
          if(deleteTag.id == id){
            this.existedTags.splice(index,1)
          }
        })
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addOpen () {
      this.newTagName = '';
      this.flag = 'add';
      this.tagRepeatTip = false;
      this.addTag = true
    },
    editColorOpen(flag,tagId,name) {
      this.flag = 'edit';
      this.newTagName = name;
      this.addTag = true;
      this.editTagId = tagId;
      this.tagChoosedId = tagId;
      this.tagRepeatTip = false;
    },
    addClose() {
      this.tagChoosedId = -1;
      this.addTag = false
    },
    changeTag(id) {
      return this.$store.dispatch('getChangeTag',id)
    },
    colorRepeatConfirm(id) {
      if (this.flag == 'add') {
        if(this.existedTags.find( tag => tag.id == id)){
          this.tagRepeatTip = true
        } else {
          this.tagRepeatTip = false
        }
      }
    },
    addNewTag() {
      if(this.newTagName !== ""){
        if(this.flag == 'add'){
          this.chooseTags.forEach( tag => {
            if(tag.id == this.tagChoosedId){
              if(!this.existedTags.find( item => item.id == this.tagChoosedId)){
                this.existedTags.push({
                  id: this.tagChoosedId,
                  name: this.newTagName,
                  color: tag.color,
                  number: '2'
                })
              } else {
                this.existedTags.forEach(editTag => {
                  if(editTag.color == tag.color){
                    editTag.id = this.tagChoosedId;
                    editTag.name = this.newTagName;
                    editTag.color = tag.color
                  }
                })
              }
            }
          });
        } else {
          this.chooseTags.forEach(tag => {
            if(tag.id == this.tagChoosedId){
              if(!this.existedTags.find( item => item.id == this.tagChoosedId)){
                this.existedTags.forEach(editTag => {
                  if(editTag.id == this.editTagId){
                    editTag.id = this.tagChoosedId;
                    editTag.name = this.newTagName;
                    editTag.color = tag.color;
                  }
                })
              } else {
                this.existedTags.forEach(editTag => {
                  if(editTag.color == tag.color) {
                    editTag.id = this.tagChoosedId;
                    editTag.name = this.newTagName;
                    editTag.color = tag.color
                  }
                })
              }
            }
          })
        }
        this.addTag = false;
        this.tagRepeatTip = false;
        this.tagChoosedId = -1;
        // this.$emit('toggleTagInitMap');
      } else {
        this.$message({
          type: 'info',
          message: '输入不能为空'
        })
      }
    }
  }
}
</script>

<style>

</style>
