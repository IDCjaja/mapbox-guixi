import Vue from 'vue'
import mapbox from '@/components/mapbox'

describe('mapbox.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(mapbox)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})
