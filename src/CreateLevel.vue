<template lang="pug">
.create-map(v-show="createNewMap")
  .title 创建关卡 
    button(@click="toggleCreateNewMap()") 关闭
  input(type="number"
        placeholder="关卡格子宽度"
        v-model="levelInput.gridWidth")
  input(type="number"
        placeholder="关卡格子高度"
        v-model="levelInput.gridHeight")
  input(type="number"
        placeholder="关卡横向格子数"
        v-model="levelInput.x")
  input(type="number"
        placeholder="关卡纵向格子数"
        v-model="levelInput.y")
  input(type="submit" @click="handleCreateNewMap()") 
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class CreateLevel extends Vue {
  @Prop() readonly createNewMap: boolean;

  get currentLevel() {
    return this.$store.state.currentLevel
  }
  
  levelInput = {
    level: '1',
    gridWidth: '',
    gridHeight: '',
    x: '',
    y: ''
  };

  toggleCreateNewMap() {
    this.$emit('create-level')
  }
  handleCreateNewMap() {
    for(let i in this.levelInput)
      if(this.levelInput[i] == '') return alert("请完成关卡设置")
    const {gridWidth, gridHeight, x, y} = this.levelInput
    let map:GameLevel = {
      level: this.currentLevel + 2,
      gridWidth: gridWidth,
      gridHeight: gridHeight,
      x: x,
      y: y,
      sprites: new Map()
    }
    this.levelInput.gridWidth = ''
    this.levelInput.gridHeight = ''
    this.levelInput.x = ''
    this.levelInput.y = ''
    this.$store.commit('createLevel', map)
    this.toggleCreateNewMap()
  }
}
</script>