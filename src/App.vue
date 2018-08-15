<template>
  <div id="app">
    <router-view/>
    <my-svg></my-svg>
  </div>
</template>

<script>
import MySvg from './components/svg'
export default {
  name: 'App',
  components: { MySvg }
}
</script>