<template>
  <div class="information-wrapper">
    <div class="information-title"><span>桂溪加油站</span><a class="information-close" @click="closeInformation">×</a></div>
    <div class="information-list">
      <ul>
        <li>
          <span class="item-title">经营者姓名</span>
          <span class="item-content">张萌萌</span>
        </li>
        <li>
          <span class="item-title">经营地址</span>
          <span class="item-content">四川省成都市高新区天府一街北50米银湖公园（天府一街）附近</span>
        </li>
        <li>
          <span class="item-title">有效期开始时间</span>
          <span class="item-content">2018-6-11</span>
        </li>
        <li>
          <span class="item-title">有效期结束时间</span>
          <span class="item-content">2018-8-10</span>
        </li>
        <li>
          <span class="item-title">国有土地使用证</span>
          <span class="item-content">2018-6-11</span>
        </li>
        <li>
          <span class="item-title">经营环境</span>
          <span class="item-content">2018-6-11</span>
        </li>
        <li>
          <span class="item-title">经营者姓名</span>
          <span class="item-content">张萌萌</span>
        </li>
        <li>
          <span class="item-title">经营地址</span>
          <span class="item-content">四川省成都市高新区天府一街北50米银湖公园（天府一街）附近</span>
        </li>
        <li>
          <span class="item-title">有效期开始时间</span>
          <span class="item-content">2018-6-11</span>
        </li>
        <li>
          <span class="item-title">有效期结束时间</span>
          <span class="item-content">2018-8-10</span>
        </li>
        <li>
          <span class="item-title">国有土地使用证</span>
          <span class="item-content">2018-6-11</span>
        </li>
        <li>
          <span class="item-title">经营环境</span>
          <span class="item-content">2018-6-11</span>
        </li>
        <li>
          <span class="item-title">经营者姓名</span>
          <span class="item-content">张萌萌</span>
        </li>
        <li>
          <span class="item-title">经营地址</span>
          <span class="item-content">四川省成都市高新区天府一街北50米银湖公园（天府一街）附近</span>
        </li>
        <li>
          <span class="item-title">有效期开始时间</span>
          <span class="item-content">2018-6-11</span>
        </li>
        <li>
          <span class="item-title">有效期结束时间</span>
          <span class="item-content">2018-8-10</span>
        </li>
        <li>
          <span class="item-title">国有土地使用证</span>
          <span class="item-content">2018-6-11</span>
        </li>
        <li>
          <span class="item-title">经营环境</span>
          <span class="item-content">2018-6-11</span>
        </li>
        <li>
          <div class="item-image">
            <div class="item-image-title">经营环境</div>
            <img><img>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeInformation() {
      this.$store.dispatch('toggleCloseInformation')
    }
  }
}
</script>

<style>

</style>
