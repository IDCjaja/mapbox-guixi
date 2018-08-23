<template>
  <div class="search-container">
    <div class="search-navbar">
      <span class="back el-icon-arrow-left" @click="back"></span>
      <el-input
        clearable
        @input="getResult"
        v-model="searchInputValue"
        placeholder="搜索"
        prefix-icon="el-icon-search">
      </el-input>
      <el-button v-if="btnShow">搜索</el-button>
    </div>
    <div class="result-content">
      <div class="result-list" v-if="resultShow">
        <div class="result-item" v-for="(item,index) in searchResultList" :key="index" v-on:click="changeCenter(item.id,item.longitude,item.latitude)">
          <span class="el-icon-search"></span>
          <div class="item-content">
            <label>{{ item.name }}<small>{{ item.address }}</small></label>
            <img src="http://p1ctmsz1g.bkt.clouddn.com/sign.jpg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mobileSearch',
  data() {
    return {
      btnShow: false,
      resultShow: false,
      searchInputValue: '',
      searchResultList: [
        {
          id: 1,
          longitude: 104.106946,
          latitude: 30.674249,
          name: '华茂广场',
          tagId: 1,
          address: '二环路东二段华茂广场'
        },
        {
          id: 2,
          longitude: 104.109191,
          latitude: 30.671637,
          name: '伊藤洋华堂(建设路店)',
          tagId: 2,
          address: '二环路东二段426号阳光新生活广场'
        },
        {
          id: 3,
          longitude: 114.396345,
          latitude: 30.9454,
          name: '成都',
          tagId: 3
        },
        {
          id: 4,
          longitude: 104.101876,
          latitude: 30.668877,
          name: '第五大道',
          tagId: 4,
          address: '建设路26号'
        },
        {
          id: 5,
          longitude: 121.5273285,
          latitude: 31.21515044,
          name: '上海',
          tagId: 4
        },
        {
          id: 6,
          longitude: 104.108444,
          latitude: 30.670595,
          name: '建设路东站(公交站)',
          tagId: 2,
          address: '6路;14路;42路;71路;72路;社区巴士1010路'
        },
        {
          id: 7,
          longitude: 104.104973,
          latitude: 30.670078,
          name: '万科·钻石广场',
          tagId: 3,
          address: '建设路10号'
        },
        {
          id: 8,
          longitude: 104.104147,
          latitude: 30.669054,
          name: '高地中心',
          tagId: 2,
          address: '建设路9号'
        },
        {
          id: 9,
          longitude: 104.075275,
          latitude: 30.601965,
          name: '成都高新技术产业开发区桂溪街道办事处',
          tagId: 4,
          address: '天仁路176号'
        },
        {
          id: 10,
          longitude: 104.077467,
          latitude: 30.618422,
          name: '桂溪加油站(科华中路)',
          tagId: 1,
          address: '科华中路63号'
        },
        {
          id: 12,
          longitude: 104.062087,
          latitude: 30.599805,
          name: '宜家家居(成都商场店)',
          tagId: 1,
          categoryId: 1,
          address: '四川省成都市武侯区桂溪街道宜家家居(成都商场店)'
        },
        {
          id: 13,
          longitude: 104.06183,
          latitude: 30.601754,
          name: '欧尚(成都高新店)',
          tagId: 1,
          categoryId: 1,
          address: '四川省成都市武侯区桂溪街道欧尚(成都高新店)'
        },
        {
          id: 14,
          longitude: 104.063986,
          latitude: 30.599547,
          name: '迪卡侬',
          tagId: 1,
          categoryId: 1,
          address: '四川省成都市武侯区桂溪街道都会路199号迪卡侬运动场'
        },
        {
          id: 15,
          longitude: 104.060961,
          latitude: 30.601255,
          name: '必胜客',
          tagId: 1,
          categoryId: 1,
          address: '四川省成都市武侯区桂溪街道必胜客(成都高新店)'
        },
        {
          id: 16,
          longitude: 104.060102,
          latitude: 30.601394,
          name: '宜家家居(成都商场店)',
          tagId: 1,
          categoryId: 1,
          address: '四川省成都市武侯区石羊场街道益州大道北段360号英祥·财富领域'
        },
        {
          id: 17,
          longitude: 104.062903,
          latitude: 30.601855,
          name: '凯德广场',
          tagId: 1,
          categoryId: 1,
          address: '四川省成都市武侯区桂溪街道南洋小馆(凯德广场)凯德广场(新南店)'
        },
        {
          id: 18,
          longitude: 104.062087,
          latitude: 30.599805,
          name: '宜家家居(成都商场店)',
          tagId: 1,
          categoryId: 1,
          address: '四川省成都市武侯区桂溪街道宜家家居(成都商场店)'
        },{
          id: 19,
          longitude: 104.05815,
          latitude: 30.599565,
          name: '城市春天',
          tagId: 1,
          categoryId: 1,
          address: '四川省成都市武侯区石羊场街道成都云起茶宿客栈城市春天'
        },
        {
          id: 20,
          longitude: 104.062087,
          latitude: 30.599805,
          name: '四川省城市车辆置业有限责任公司',
          tagId: 1,
          categoryId: 1,
          address: '四川省成都市武侯区石羊场街道火车南站西路865号四川省城市车辆置业有限责任公司'
        }
      ]
    }
  },
  methods: {
    changeCenter(id,longitude,latitude) {
      var currentMarker;
      this.searchResultList.forEach(item => {
        if(item.id == id){
          currentMarker = item
        }
      })
      this.$router.push({
        name:'adminMobile',
        params: {
          messageFooterShow: true,
          centerLongitude: longitude,
          centerLatitude: latitude,
          currentMarker: currentMarker
        }
      })
    },
    back() {
      this.$emit('listen-search')
    },
    getResult() {
      this.clearTimer();
      if(this.searchInputValue !== ""){
        this.timer = setTimeout(() => {
          this.search();
        },500)
      } else {
        this.btnShow = false
        this.resultShow = false
      }
    },
    search() {
      if(this.searchInputValue !== ""){
        this.resultShow = true;
        this.btnShow = true
        if(this.searchResultList.length) {
          this.searchResult = true
        } else {
          this.searchResult = false
        }
      }
    },
    clearTimer() {
      if(this.timer){
        clearTimeout(this.timer)
      }
    }
  }
}
</script>

<style>

</style>
