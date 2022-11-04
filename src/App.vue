<template lang="pug">
#app
  CreateMap(
    :existingMap="existingMap"
    @create-map-fn="createMapFn"
  )
  map-editor(
    :existingMap="existingMap"
    :mapData="mapData"
  )
</template>

<script lang="ts">
/// <reference path="./app.d.ts" />
import { Vue, Watch, Component, Emit } from 'vue-property-decorator';
import SpriteType from './const';
import CreateMap from './CreateMap.vue';
import MapEditor from './MapEditor.vue';

@Component({
  components: {
    CreateMap,
    MapEditor
  }
})
export default class App extends Vue {
  existingMap: boolean = false;
  // mapData: GameMap = {
  //   name: '',
  //   levels: []
  // };
  // levelInput = {
  //   level: '1',
  //   gridWidth: '',
  //   gridHeight: '',
  //   x: '',
  //   y: ''
  // };
  currentLevel: number = 0;
  dragItem: GameSprite = {};
  // createNewMap: boolean = false;

  // // 拖拽
  // drag(ev, item) {
  //   //const dom = ev.currentTarget.cloneNode(true);
  //   this.dragItem = item
  // }
  // // 允许放下拖拽
  // allowDrop(ev) {
  //   const elements = document.querySelectorAll('.ondrag')
  //   for(let elem of elements)
  //     elem.classList.remove('ondrag')
  //   ev.target.classList.add('ondrag')
  //   ev.preventDefault();
  // }
  // // 放下事件
  // drop(ev) {
  //   if(!this.dragItem.name) return ev.preventDefault()
  //   ev.target.innerHTML = `<img src="${this.dragItem.image}" width="${this.dragItem.width}" height="${this.dragItem.height}" />`
  //   ev.preventDefault()
  //   const {name, type, width, height, image} = this.dragItem
  //   const sprites = this.mapData.levels[this.currentLevel].sprites
  //   const position = ev.target.getAttribute('x') + '-' + ev.target.getAttribute('y')
  //   this.mapData.levels[this.currentLevel].sprites.set(position, {
  //     name,
  //     type,
  //     width,
  //     height,
  //     x: ev.target.getAttribute('x'),
  //     y: ev.target.getAttribute('y'),
  //     image,
  //   })
  //   ev.target.setAttribute('data-key', position)
  //   this.dragItem = {}
  // }
  // deleteSprite(ev) {
  //   let myev = {}
  //   for(let i of ev.path) {
  //     if(i.classList.contains('map-ground')) {
  //       myev = i
  //       break;
  //     }
  //   }
  //   const evN = myev as HTMLDivElement
  //   if(evN.getAttribute('data-key')) {
  //     this.mapData.levels[this.currentLevel].sprites.delete(evN.getAttribute('data-key'))
  //     evN.removeAttribute('data-key')
  //     evN.innerHTML = `(${evN.getAttribute('x')}, ${evN.getAttribute('y')})`
  //   }
  // }
  // handleCreateNewMap() {
  //   for(let i in this.levelInput)
  //     if(this.levelInput[i] == '') return alert("请完成关卡设置")
  //   const {gridWidth, gridHeight, x, y} = this.levelInput
  //   let map1:GameLevel = {
  //     level: '1',
  //     gridWidth: gridWidth,
  //     gridHeight: gridHeight,
  //     x: x,
  //     y: y,
  //     sprites: new Map()
  //   }
  //   this.levelInput.gridWidth = ''
  //   this.levelInput.gridHeight = ''
  //   this.levelInput.x = ''
  //   this.levelInput.y = ''
  //   this.mapData.levels.push(map1)
  //   this.toggleCreateNewMap()
  // }

  @Emit('create-map-fn')
  createMapFn() {
    this.existingMap = true;
  }

  get mapData() {
    return this.$store.state?.mapData
  }

}
</script>

<style lang="less">
input[type="text"], input[type="number"] {
  border: 1px solid #ddd;
  font-size: 1rem;
  padding: 5px;
  width: 100%;
  outline: 0px;
  color: #333;

  &:hover, &:focus {
    border: 1px solid #bbb;
  }
}
#create-map {
  border: 1px solid #eee;
  padding: 10px;
  width: 300px;
  
  .title {
    font-weight: bold;
    padding-bottom: 5px;
    border-bottom: 1px solid #eee;
  }
  .map-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-top: 5px;
    
    &>*:not(:first-child) {
      margin-top: 5px;
    }
    span {
      width: 100%;
    }
  }
}
#map-editor {
  position: relative;
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  align-items: center;
  
  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    
    select {
      font-size: 1.5rem;
    }
  }
  .map-editor {
    flex: 1 0 auto;
    display: grid;
    width: calc(210px + var(--width) + var(--rowpx) + 1px);
    grid-template-columns: 200px calc(var(--width) + var(--rowpx) + 1px);
    align-items: start;
    gap: 8px;
    
    .sprite-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1px;
      wdith: 300px;
      border: 1px solid #eee;
      background-color: #eee;
      
      .sprite-item {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        padding: 5px;
        cursor: move;
      }
    }
    .map-editor-container {
      display: grid;
      grid-template-columns: repeat(var(--row), calc(var(--width) / var(--row)));
      grid-template-rows: repeat(var(--column), calc(var(--height) / var(--column)));
      background-color: #eee;
      border: 1px solid #eee;
      gap: 1px;
      
      .map-ground {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        cursor: pointer;
        overflow: hidden;
        
        &.ondrag {
          background-color: rgba(255, 0, 0, .1);
        }
      }
      
    }
  }
  .create-map {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    background-color: #fff;
    padding: 5px;
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 0 5px 14px 2px rgba(0, 0, 0 , 10%);
    
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      font-size: 1.2rem;
      font-weight: bold;
      padding-bottom: 5px;
      margin-bottom: 5px;
      border-bottom: 1px solid #eee;
    }
    &>*:not(:first-child) {
      margin-top: 5px;
    }
  }
}
</style>
