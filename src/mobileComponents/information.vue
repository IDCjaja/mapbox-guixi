<template>
  <div class="information-container">
    <div class="back">
      <span class="el-icon-arrow-left" @click="back"></span>
      <label>桂溪加油站</label>
    </div>
    <div class="information-content">
      <ul>
        <li>
          <div class="item-title">经营者姓名</div>
          <div class="item-content">张萌萌</div>
        </li>
        <li>
          <div class="item-title">经营地址</div>
          <div class="item-content">四川省成都市高新区天府一街北50米银湖公园（天府一街）附近</div>
        </li>
        <li>
          <div class="item-title">有效期开始时间</div>
          <div class="item-content">2018-6-11</div>
        </li>
        <li>
          <div class="item-title">有效期结束时间</div>
          <div class="item-content">2018-8-10</div>
        </li>
        <li>
          <div class="item-title">国有土地使用证</div>
          <div class="item-content">2018-6-11</div>
        </li>
        <li>
          <div class="item-title">经营环境</div>
          <div class="item-content">2018-6-11</div>
        </li>
        <li>
          <div class="item-title">经营者姓名</div>
          <div class="item-content">张萌萌</div>
        </li>
        <li>
          <div class="item-title">经营地址</div>
          <div class="item-content">四川省成都市高新区天府一街北50米银湖公园（天府一街）附近</div>
        </li>
        <li>
          <div class="item-title">有效期开始时间</div>
          <div class="item-content">2018-6-11</div>
        </li>
        <li>
          <div class="item-title">有效期结束时间</div>
          <div class="item-content">2018-8-10</div>
        </li>
        <li>
          <div class="item-title">国有土地使用证</div>
          <div class="item-content">2018-6-11</div>
        </li>
        <li>
          <div class="item-title">经营环境</div>
          <div class="item-content">2018-6-11</div>
        </li>
        <li>
          <div class="item-title">经营者姓名</div>
          <div class="item-content">张萌萌</div>
        </li>
        <li>
          <div class="item-title">经营地址</div>
          <div class="item-content">四川省成都市高新区天府一街北50米银湖公园（天府一街）附近</div>
        </li>
        <li>
          <div class="item-title">有效期开始时间</div>
          <div class="item-content">2018-6-11</div>
        </li>
        <li>
          <div class="item-title">有效期结束时间</div>
          <div class="item-content">2018-8-10</div>
        </li>
        <li>
          <div class="item-title">国有土地使用证</div>
          <div class="item-content">2018-6-11</div>
        </li>
        <li>
          <div class="item-title">经营环境</div>
          <div class="item-content">2018-6-11</div>
        </li>
        <li>
          <div class="item-image">
            <div class="item-title">经营环境</div>
            <img><img>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mobileInformation',
  methods: {
    back() {
      this.$emit('listen-information')
    }
  }
}
</script>
