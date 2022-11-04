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
    },
    setCurrentLevel(state, data) {
      state.currentLevel = data
    },
    addSprite(state, data) {
      const currentLevel = state.currentLevel
      const { position, sprite } = data
      state.mapData.levels[currentLevel].sprites.set(position, sprite)
    },
    deleteSprite(state, position) {
      const currentLevel = state.currentLevel
      state.mapData.levels[currentLevel].sprites.delete(position)
    }
  }
})

export default store