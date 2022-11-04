import Vue from 'vue'
import Vuex from 'vuex'
import SpriteType from './const'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    mapData: {
      name: '',
      levels: []
    },
    currentLevel: 0
  },
  mutations: {
    createMap(state, data) {
      state.mapData.name = data?.name
      state.mapData.levels.push(data?.map)
    },
    createLevel(state, data) {
      state.mapData.levels.push(data)
    }
  }
})

export default store