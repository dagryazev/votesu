<template lang="html">
  <div :class="['videoSlide', ...classList]" :style="{ backgroundImage: `url('${`https://img.youtube.com/vi/${
      this.$store.getters.getSlides[ this.$store.state.selectedSlide ].attributes['video'].src
        .match(/\?v\=(.*)/m)[1]
    }/mqdefault.jpg`}')` }">
    <form id="uploadPhotoForm">
      <input type="text" placeholder="Ссылка на Youtube или Vimeo видео" v-model="input"/>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import {baseURL} from '../http-common'
export default {
  props: ['elementType', 'classList'],
  computed: {
    input: {
      get () {
        return this.$store.getters.getValueObject({
            selectedElement: this.elementType
          })
      },
      set (value) {
        this.$store.commit('updateObjectSlide',
          {
            selectedElement: this.elementType,
            value
          }
        )
      }
    }
  },
}
</script>

<style lang="css">
.videoSlide{
  display: flex;
  height: 340px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
}
.videoSlide > form{
  display: flex;
  border: 3px dashed #eee;
  padding: 20px;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
}
.videoSlide > form input{
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 15px 10px;
}
</style>
