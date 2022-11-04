<template lang="pug">
#create-map(v-show="!existingMap")
  .title 创建地图
  .map-container
    input(type="text" placeholder="地图名称" v-model="mapName")
    span 关卡 1 设置
    input(type="number"
          placeholder="关卡 1 格子宽度"
          v-model="levelInput.gridWidth")
    input(type="number"
          placeholder="关卡 1 格子高度"
          v-model="levelInput.gridHeight")
    input(type="number"
          placeholder="关卡 1 横向格子数"
          v-model="levelInput.x")
    input(type="number"
          placeholder="关卡 1 纵向格子数"
          v-model="levelInput.y")
    input(type="submit" @click="createMap()") 
</template>

<script lang="ts">
export default {
  props: ['existingMap'],
  data() {
    return {
      mapName: '',
      levelInput: {
        level: '1',
        gridWidth: '',
        gridHeight: '',
        x: '',
        y: ''
      },
    }
  },
  methods: {
    createMap() {
      if(this.mapName == '')
        return alert("请输入地图名称")
      for(let i in this.levelInput)
        if(this.levelInput[i] == '') return alert("请完成关卡 1 设置")
      const {gridWidth, gridHeight, x, y} = this.levelInput
      let map:GameLevel = {
        level: '1',
        gridWidth: gridWidth,
        gridHeight: gridHeight,
        x: x,
        y: y,
        sprites: new Map()
      }
      this.$store.commit('createMap', {name: this.mapName, map})
      this.mapName = ''
      this.levelInput.gridWidth = ''
      this.levelInput.gridHeight = ''
      this.levelInput.x = ''
      this.levelInput.y = ''
      this.$emit('create-map-fn')
    }
  }
}
</script>