<template lang="html">
  <div class="canvas" v-if="this.$store.getters.getSlides != undefined"
    :style="{
        backgroundSize: 'contain', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat',
        backgroundColor: (this.$store.getters.getSlides != undefined ? this.$store.getters.getSlides[this.$store.state.selectedSlide].attributes['bg_color'] : '#fff'),
        backgroundImage: (`url(${this.$store.getters.getSlides[ this.$store.state.selectedSlide ].attributes.bg_image ? this.$store.getters.getSlides[ this.$store.state.selectedSlide ].attributes.bg_image.src : ''})`)
      }">
    <!-- <div :style="{height: '100%', backgroundSize: 'contain', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundImage: (`url(${this.$store.getters.getSlides[ this.$store.state.selectedSlide ].attributes['image_position'] == 'fullscreen' ? this.$store.getters.getSlides[this.$store.state.selectedSlide].attributes['image'].src : ''})`) }"> -->
    <div class="canvas_object container" style="width: 100%;">
      <div class="canvas_object__header" v-if="this.$store.getters.getSlides[this.$store.state.selectedSlide].attributes.slide_type == 'header'">
        <ObjectSlide element-type="header" :class-list="['center_align']"></ObjectSlide>
        <ObjectSlide element-type="text" :class-list="['center_align']"></ObjectSlide>
      </div>

      <div class="canvas_object__text" v-if="this.$store.getters.getSlides[this.$store.state.selectedSlide].attributes.slide_type == 'text'">
        <ObjectSlide element-type="header" :class-list="['left_align']"></ObjectSlide>
        <div :style="{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }" v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes.columns.length == 2">
          <ObjectSlide element-type="text[0]" :class-list="['left_align']" :style="{width: '50%'}"></ObjectSlide>
          <ObjectSlide element-type="text[1]" :class-list="['left_align']" :style="{width: '50%'}"></ObjectSlide>
        </div>
        <div :style="{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }" v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes.columns.length == 1">
          <ObjectSlide element-type="text[0]" :class-list="['left_align']" :style="{width: '100%'}"></ObjectSlide>
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
          <ObjectSlide element-type="header" :class-list="['center_align']"></ObjectSlide>
          <ObjectPicture
          :src="this.$store.getters.getSlides[ this.$store.state.selectedSlide ].attributes['image_position'] == 'center' ? this.$store.getters.getPresentationId($route.params.id).slides[this.$store.state.selectedSlide].attributes['image'].src : ''"
          :classList="['col-12']"
          ></ObjectPicture>
      </div>

      <div class="canvas_object__poll" v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes.slide_type == 'poll'" :style="{flexDirection: 'column'}">
        <ObjectSlide element-type="header" :class-list="['left_align']"></ObjectSlide>
        <ul :style="{ width: '100%' }">
          <template v-if="this.$store.getters.getPoll">
            <li v-for="(item, index) in this.$store.getters.getPoll.attributes.options" :style="{display: 'flex', flexDirection: 'row'}">
              <ObjectSlide :element-type="{type: 'option', index}" :class-list="['left_align']"></ObjectSlide>
              <span class="deleteOption" @click="deleteOptionPoll(index)">x</span>
            </li>
            <a @click="addOptionPoll" class="addOptionPoll">Добавить вариант ответа</a>
          </template>
        </ul>
      </div>

      <div class="canvas_object__video row" v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes.slide_type == 'video'" :style="{display: 'flex',flexDirection: 'column', alignItems:'center', justifyContent: 'center'}">
          <ObjectSlide element-type="header" :class-list="['center_align']"></ObjectSlide>
          <ObjectVideo
            element-type="video"
            :classList="['col-12']"
          ></ObjectVideo>
      </div>


      <div class="canvas_object__contacts row" v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes.slide_type == 'contacts'" :style="{display: 'flex',flexDirection: 'column', alignItems:'center', justifyContent: 'center'}">
          <ObjectSlide element-type="header" :class-list="['center_align']"></ObjectSlide>
          <ObjectSlide element-type="subheader" :class-list="['center_align']"></ObjectSlide>
          <div class="row">
            <div class="col-7">
              <ObjectSlide :element-type="{ type: 'contacts', value: 'email'}" :class-list="['left_align']" placeholder="Email"></ObjectSlide>
              <ObjectSlide :element-type="{ type: 'contacts', value: 'phone'}" :class-list="['left_align']" placeholder="Телефон"></ObjectSlide>
              <ObjectSlide :element-type="{ type: 'contacts', value: 'site'}" :class-list="['left_align']" placeholder="Сайт"></ObjectSlide>
              <ObjectSlide :element-type="{ type: 'contacts', value: 'address'}" :class-list="['left_align']" placeholder="Адрес"></ObjectSlide>
            </div>
            <div class="col-5">
              <ObjectSlide :element-type="{ type: 'contacts', value: 'facebook'}" :class-list="['left_align']" placeholder="Facebook"></ObjectSlide>
              <ObjectSlide :element-type="{ type: 'contacts', value: 'linkedin'}" :class-list="['left_align']" placeholder="Linkedin"></ObjectSlide>
              <ObjectSlide :element-type="{ type: 'contacts', value: 'twitter'}" :class-list="['left_align']" placeholder="twitter"></ObjectSlide>
              <ObjectSlide :element-type="{ type: 'contacts', value: 'vkontakte'}" :class-list="['left_align']" placeholder="vkontakte"></ObjectSlide>
            </div>
          </div>
      </div>

    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import ObjectSlide from "../../object.vue"
import ObjectPicture from "../../objectPicture.vue"
import ObjectVideo from "../../objectVideo.vue"
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
    ObjectPicture,
    ObjectVideo
  },
  methods: {
    addOptionPoll(){
      this.$set( this.$store.getters.getPoll.attributes.options, this.$store.getters.getPoll.attributes.options.length ,{count: 0, id: this.$store.getters.getPoll.attributes.options.length + 1, text: ''})
    },
    deleteOptionPoll( index ){
      this.$delete( this.$store.getters.getPoll.attributes.options, index)
    }
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
span.deleteOption{
  cursor: pointer;
  color: red;
}
.addOptionPoll{
  color: #ccc !important;
  transition: .1s linear;
}
.addOptionPoll:hover{
  color: #000 !important;
}
</style>
