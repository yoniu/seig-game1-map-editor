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
    currentLevel: 0,
    loadingFile: false
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
    },
    uploadMap(state, json) {
      state.mapData.name = json.name;
      for(let item of json.levels) {
        let level = {
          level: item.level,
          gridWidth: item.gridWidth,
          gridHeight: item.gridHeight,
          x: item.x,
          y: item.y,
          sprites: new Map()
        };
        for(let i of item.sprites) {
          const key = i[0],
                data = i[1];
          level.sprites.set(key, data);
        }
        state.mapData.levels.push(level)
      }
      state.loadingFile = true;
    },
    setLoadingFile(state, value) {
      state.loadingFile = value
    }
  }
})

export default store