<template lang="html">
  <div class="canvas"
    :style="
      {
        backgroundColor: (this.$store.getters.getPresentationId(this.$route.params.id).slides != undefined ? this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes['bg_color'] : '#fff')
      }
  ">
    <template v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides != undefined">
    <div class="canvas_object">
      <div class="canvas_object__header" v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes.slide_type == 'header'">
        <ObjectSlide element-type="header" :class-list="['center_align']"></ObjectSlide>
        <ObjectSlide element-type="text" :class-list="['center_align']"></ObjectSlide>
      </div>

      <div class="canvas_object__text" v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes.slide_type == 'text'">
        <ObjectSlide element-type="header" :class-list="['left_align']"></ObjectSlide>
        <div :style="{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }">
          <ObjectSlide element-type="text[0]" :class-list="['left_align']" :style="{width: '50%'}"></ObjectSlide>
          <ObjectSlide element-type="text[1]" :class-list="['left_align']" :style="{width: '50%'}"></ObjectSlide>
        </div>
      </div>

      <div class="canvas_object__text_picture row" v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes.slide_type == 'text_picture'" :style="{display: 'flex',flexDirection: 'row', alignItems:'center'}">
        <ObjectPicture
          :src="this.$store.getters.getPresentationId($route.params.id).slides[this.$store.state.selectedSlide].attributes['image'].src"
          v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes['image_position'] == 'left'"
          :classList="['col-6']"
          ></ObjectPicture>
        <div class="col-6">
          <ObjectSlide element-type="header" :class-list="['left_align']"></ObjectSlide>
          <ObjectSlide element-type="text" :class-list="['left_align']"></ObjectSlide>
        </div>

        <ObjectPicture
          :src="this.$store.getters.getPresentationId($route.params.id).slides[this.$store.state.selectedSlide].attributes['image'].src"
          v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes['image_position'] == 'right'"
          :classList="['col-6']"
          ></ObjectPicture>
      </div>

      <div class="canvas_object__picture row" v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes.slide_type == 'picture'" :style="{display: 'flex',flexDirection: 'column', alignItems:'center', justifyContent: 'center'}">
        <div>
          <ObjectSlide element-type="header" :class-list="['center_align']"></ObjectSlide>
          <ObjectPicture
          :src="this.$store.getters.getPresentationId($route.params.id).slides[this.$store.state.selectedSlide].attributes['image'].src"
          :classList="['col-12']"
          ></ObjectPicture>
        </div>
      </div>

      <div class="canvas_object__poll" v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes.slide_type == 'poll'">
        <ObjectSlide element-type="header" :class-list="['left_align']"></ObjectSlide>
        <ul :style="{ width: '100%' }">
          <template v-if="this.$store.getters.getPoll">
            <li v-for="item in this.$store.getters.getPoll.attributes.options">
              <input type="text" :value="item.text">
            </li>
          </template>
        </ul>
      </div>

      <div class="canvas_object__video row" v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes.slide_type == 'video'" :style="{display: 'flex',flexDirection: 'column', alignItems:'center', justifyContent: 'center'}">
        <div>
          <ObjectSlide element-type="header" :class-list="['center_align']"></ObjectSlide>
          <ObjectPicture
          :src="this.$store.getters.getPresentationId($route.params.id).slides[this.$store.state.selectedSlide].attributes['video'].src"
          :classList="['col-12']"
          ></ObjectPicture>
        </div>
      </div>


    </div>
  </template>
  </div>
</template>

<script>
import ObjectSlide from "../../object.vue"
import ObjectPicture from "../../objectPicture.vue"
import axios from 'axios'
import {HTTP, baseURL} from "../../../http-common"
export default {
  name: "CanvasComponents",
  data: function() {
    return {
      selectedElement: 'header'
    }
  },
  components:{
    ObjectSlide,
    ObjectPicture
  },
  methods: {

  }
}
</script>

<style lang="css">
.canvas{
  width: 700px;
  height: 500px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.canvas_object > div{
  display: flex;
}
.canvas_object__header{
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.canvas_object__text{
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}
.canvas_object input{
  border: 1px solid transparent;
  width: 100%;
  background-color: transparent;
}
.canvas_object input.center_align{
  text-align: center;
}
.center{
  text-align: center;
}
input.input_h1{
  font-size: 2.5rem;
  width: 100%;
}
img.picture{
  width: 100%;
}
.imageSlide{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.imageSlide:hover button{
  opacity: 1;
}
.imageSlide button{
  cursor: pointer;
  opacity: 0;
  transition: .2s linear;
}
</style>
