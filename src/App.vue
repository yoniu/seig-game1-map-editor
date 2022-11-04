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
