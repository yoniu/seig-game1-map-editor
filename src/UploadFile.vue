<template lang="pug">
#update
  .title 导入地图
  input(
    type="file"
    accept=".json"
    @change="upload"
  )
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';

@Component
export default class UploadFile extends Vue {

  upload(e) {
    const file = e.target.files[0];

    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const text = reader.result;
      let json = JSON.parse(text as string);
      this.$store.commit('uploadMap', json);
      this.$emit('create-map-fn');
    };

    reader.onerror = () => {
      alert('读取文件失败')
    };
  }

}
</script>

<style lang="less">
#update {
  margin: .5rem -10px;
  padding: .5rem 10px 0;
  border-top: 1px solid #eee;

  [type=file] {
    margin-top: .5rem;
  }
}
</style>