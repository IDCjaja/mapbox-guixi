<template>
  <div class="select-container">
    <div class="select-content">
      <div class="select-title">分类</div>
      <div class="select-body">
        <el-checkbox-group v-model="newCheckedCategories">
          <el-checkbox v-for="(category,index) in categoryList" :label="category.name" :key="index">
            <div class="prefix-span">
              <svg height="14px" width="14px">
                <use :xlink:href="'#icon'+category.id" fill="#e2e2e2" stroke="#e2e2e2" class="use-style"></use>
              </svg>
            </div>
            <div class="select-name">{{ category.name }}</div>
            <span class="select-number">{{ category.number }}个</span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="select-content">
      <div class="select-title">颜色</div>
      <div class="select-body">
        <el-checkbox-group v-model="newCheckedTag">
          <el-checkbox v-for="(tag,index) in tagList" :label="tag.name" :key="index">
            <div class="prefix-span">
              <span class="color-block" :style="{ backgroundColor:tag.color }"></span>
            </div>
            <div class="select-name">{{ tag.name }}</div>
            <span class="select-number">{{ tag.number }}个</span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="footer-btn-group">
      <el-button round class="orange-btn" @click="confirmSelect">确认</el-button>
      <el-button round @click="cancelSelect">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newCheckedCategories: [],
      newCheckedTag: [],
      checkedValue: [],
      categoryList: [
        {id:1,name: '全部', number: 2,categoryId:1},
        {id:2,name: '企业', number: 1,categoryId:2},
        {id:3,name: '个人', number: 1,tagId:2,categoryId:3},
        {id:4,name: '法人', number: 0,tagId:3,categoryId:4}
      ],
      tagList: [
        {id:1,name: '等待检查', color: '#a0a0a0', number: 2,defaultColor: true},
        {id:2,name: '不合格', color: '#f52b1f', number: 5,defaultColor: false},
        {id:3,name: '合格', color: '#73b724', number: 1,defaultColor: false},
        {id:4,name: '待整改', color: '#feb902', number: 0,defaultColor: false}
      ]

    };
  },
  mounted() {
    
  },
  methods: {
    confirmSelect() {
      alert(this.newCheckedCategories,this.newCheckedTag);
      var selectValue = [this.newCheckedCategories,this.newCheckedTag]
      this.$emit("listen-select-close",selectValue)
    },
    cancelSelect() {
      this.$emit("listen-select-close",this.checkedValue)
    },
    setNewSelect(value) {
      this.checkedValue = [value[0],value[1]]
      this.newCheckedCategories = value[0];
      this.newCheckedTag = value[1]
    }
  }
}
</script>

<style>

</style>
