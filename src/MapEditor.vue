<template lang="pug">
#map-editor(
  v-if="existingMap"
  :style="{'--width': mapData.levels[currentLevel].gridWidth * mapData.levels[currentLevel].x + 'px', '--height': mapData.levels[currentLevel].gridWidth * mapData.levels[currentLevel].y + 'px'}"
)
  .title {{mapData.name}} -- 第
    select(v-model="currentLevel") 
      option(v-for="(v, k) in mapData.levels" :value="k") {{k+1}}
      option(value="2") 2
    | 关
    button(@click="createLevel()") 添加关卡
    button 保存
  .map-editor(
    :style="{'--row': mapData.levels[currentLevel].x, '--column': mapData.levels[currentLevel].y, '--rowpx': mapData.levels[currentLevel].x + 'px', '--columnpx': mapData.levels[currentLevel].y + 'px'}" 
    )
    .sprite-list
      .sprite-item(v-for="item in spriteList" :key="item.name" draggable="true" @dragstart="drag($event, item)" :title="item.name")
        img(:src="item.image" :width="item.width" :height="item.height" draggable="false")
    .map-editor-container
      template(v-for="v in (mapData.levels[currentLevel].y - 0)")
        template(v-for="i in (mapData.levels[currentLevel].x - 0)" )
          .map-ground(
            @dragover="allowDrop($event)"
            @drop="drop($event)"
            :x="i"
            :y="v"
            @contextmenu.prevent.stop="deleteSprite($event)"
            :key="`${currentLevel}-${i}-${v}`"
            :data-ref="`${currentLevel}-${i}-${v}`"
            ) {{ "(" + i + "," + v + ")" }}
  create-level(
    :createNewMap="createNewMap"
    @create-level="createLevel"
  )
</template>

<script lang="ts">
import { Vue, Watch, Component, Emit, Prop } from 'vue-property-decorator';
import SpriteType from './const';
import CreateLevel from './CreateLevel.vue';

@Component({
  components: {
    CreateLevel
  }
})
export default class MapEditor extends Vue {

  // 获取 Props
  @Prop(Boolean) readonly existingMap: boolean
  @Prop() readonly mapData: GameMap

  // 精灵列表
  spriteList: GameSprite[] = [
    {
      name: '主角',
      type: SpriteType.Player,
      width: 64,
      height: 64,
      image: './assets/player.png'
    },
    {
      name: '传送门',
      type: SpriteType.Transmit,
      width: 64,
      height: 64,
      image: './assets/transmit.png'
    },
    {
      name: '石头',
      type: SpriteType.Stone,
      width: 64,
      height: 64,
      image: './assets/stone.png'
    },
    {
      name: '树精',
      type: SpriteType.Monster,
      width: 64,
      height: 64,
      image: './assets/shujing.png'
    },
    {
      name: '松鼠精',
      type: SpriteType.Monster,
      width: 64,
      height: 64,
      image: './assets/songshu.png'
    },
    {
      name: '南瓜精',
      type: SpriteType.Monster,
      width: 64,
      height: 64,
      image: './assets/nangua.png'
    },
    {
      name: '宝箱',
      type: SpriteType.Gift,
      width: 64,
      height: 64,
      image: './assets/treasure.png'
    }
  ];
  
  currentLevel: number = 0;
  createNewMap: boolean = false;
  dragItem: GameSprite = {};
  
  // 拖拽
  drag(ev, item) {
    //const dom = ev.currentTarget.cloneNode(true);
    this.dragItem = item
  }
  // 允许放下拖拽
  allowDrop(ev) {
    const elements = document.querySelectorAll('.ondrag')
    for(let elem of elements)
      elem.classList.remove('ondrag')
    ev.target.classList.add('ondrag')
    ev.preventDefault();
  }
  // 放下事件
  drop(ev) {
    if(!this.dragItem.name) return ev.preventDefault()
    ev.target.innerHTML = `<img src="${this.dragItem.image}" width="${this.dragItem.width}" height="${this.dragItem.height}" />`
    ev.preventDefault()
    const {name, type, width, height, image} = this.dragItem
    const sprites = this.mapData.levels[this.currentLevel].sprites
    const position = ev.target.getAttribute('x') + '-' + ev.target.getAttribute('y')
    this.mapData.levels[this.currentLevel].sprites.set(position, {
      name,
      type,
      width,
      height,
      x: ev.target.getAttribute('x'),
      y: ev.target.getAttribute('y'),
      image,
    })
    ev.target.setAttribute('data-key', position)
    this.dragItem = {}
  }
  deleteSprite(ev) {
    let myev = {}
    for(let i of ev.path) {
      if(i.classList.contains('map-ground')) {
        myev = i
        break;
      }
    }
    const evN = myev as HTMLDivElement
    if(evN.getAttribute('data-key')) {
      this.mapData.levels[this.currentLevel].sprites.delete(evN.getAttribute('data-key'))
      evN.removeAttribute('data-key')
      evN.innerHTML = `(${evN.getAttribute('x')}, ${evN.getAttribute('y')})`
    }
  }

  /**
   * 关卡选择改变
   */
  selectChange() {
    this.mapData.levels[this.currentLevel].sprites.forEach((item) => {
      const position = `${this.currentLevel}-${item.x}-${item.y}`
      let ev = document.querySelector(`.map-ground[data-ref="${position}"]`)
      ev.innerHTML = `<img src="${item.image}" width="${item.width}" height="${item.height}" />`
      ev.setAttribute('data-key', `${this.currentLevel}-${item.x}-${item.y}`)
    })
  }
  /**
   * 监听关卡改变
   */
  @Watch('currentLevel')
  onCurrentLevelChange() {
    this.$nextTick(() => {
      this.selectChange()
    })
  }

  @Emit('create-level')
  createLevel() {
    this.createNewMap = !this.createNewMap
  }


}
</script>