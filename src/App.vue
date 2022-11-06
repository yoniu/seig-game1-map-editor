<template lang="pug">
#app
  create-map(
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
import { Vue, Component, Emit } from 'vue-property-decorator';
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
</style>
