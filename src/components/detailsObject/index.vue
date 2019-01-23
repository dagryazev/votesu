<template lang="html">
  <div>
    <div>
      <button type="button" @click="saveChangeSlide()" name="button">Сохранить</button><br />
      <b>Свойства презентации</b>
      <button type="button" name="button" @click="propsSlideToggle = 'color'">Заливка</button>
      <button type="button" name="button" @click="propsSlideToggle = 'picture'">Картинка</button>
      <br /><br />
      <template v-if="propsSlideToggle == 'color'">
        <input type="text" v-model="inputColorBG">
      </template>
      <template v-if="propsSlideToggle == 'picture'">
        <button onclick="document.getElementById('uploadPhotoBG').click()">Загрузить</button>
        <button @click="$delete($store.getters.getSlides[ $store.state.selectedSlide ].attributes, 'bg_image')">Удалить</button>
        <form id="uploadPhotoForm">
          <input @change="uploadPhoto" name="photo" type="file" id="uploadPhotoBG" :style="{display:'none'}"/>
        </form>
      </template>
      <br /><br />

    </div>
    <b>Свойства слайда</b>

    <template v-if="this.$store.getters.getSlides[this.$store.state.selectedSlide].attributes['slide_type'] == 'text'">
      <div :style="{display: 'flex'}">
        <button type="button" name="button" @click="changePropTextColumns(0)">Обычный</button>
        <button type="button" name="button" @click="changePropTextColumns(1)">Две колонки</button>
      </div>
    </template>

    <template v-if="this.$store.getters.getSlides[this.$store.state.selectedSlide].attributes['slide_type'] == 'text_picture'">
      <div :style="{display: 'flex'}">
        <button type="button" name="button" @click="changePropTextPictureImagePosition('left')">Картинка слева</button>
        <button type="button" name="button" @click="changePropTextPictureImagePosition('right')">Картинка справа</button>
      </div>
    </template>

    <template v-if="this.$store.getters.getSlides[this.$store.state.selectedSlide].attributes['slide_type'] == 'picture'">
      <div :style="{display: 'flex'}">
        <button type="button" name="button" @click="changePropPictureImagePosition('center')">В центре</button>
        <button type="button" name="button" @click="changePropPictureImagePosition('fullscreen')">На весь экран</button>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import {HTTP, baseURL} from '../../http-common'
export default {
  name: "DetailsObjectComponents",
  data: function() {
    return {
      propsSlideToggle: 'color'
    }
  },
  computed:{
    inputColorBG: {
      get () {
        if( this.$store.getters.getSlides != undefined  )
          if( this.$store.getters.getSlides.length != 0 )
            return this.$store.getters.getSlides[this.$store.state.selectedSlide].attributes['bg_color']
      },
      set (value) {
        this.$store.commit('updateSlideColor', value)
      }
    },
  },
  methods:{
    saveChangeSlide(){
      HTTP.patch(`slides/${this.$store.getters.getSlides[this.$store.state.selectedSlide].id}`, JSON.stringify({
          data:{
            type: "slides",
            id: this.$store.getters.getSlides[this.$store.state.selectedSlide].id,
            attributes: this.$store.getters.getSlides[ this.$store.state.selectedSlide ].attributes
          }
        })
      )
      if(this.$store.getters.getPoll != false)
      HTTP.patch(`polls/${this.$store.getters.getPoll.id}`, JSON.stringify({
          data:{
            type: "polls",
            id: this.$store.getters.getPoll.id,
            attributes: this.$store.getters.getPoll.attributes
          }
        })
      )
    },
    changePropTextColumns(value){
      if( value == 0 ){
        this.$delete(this.$store.getters.getSlides[ this.$store.state.selectedSlide ].attributes.columns, 1)
      }else{
        this.$set(this.$store.getters.getSlides[ this.$store.state.selectedSlide ].attributes.columns, 1, { "text": "", "weight": 1 })
      }
    },
    changePropTextPictureImagePosition( position ){
      this.$store.getters.getSlides[this.$store.state.selectedSlide].attributes['image_position'] = position
    },
    changePropPictureImagePosition( position ){
      this.$store.getters.getSlides[this.$store.state.selectedSlide].attributes['image_position'] = position
    },
    uploadPhoto() {
      let bodyFormData = new FormData();
      let fileInput = document.getElementById('uploadPhotoBG')
      console.log(fileInput);
      bodyFormData.append('file', fileInput.files[0]);
      axios({
        method: 'post',
        url: baseURL + 'files',
        data: bodyFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/vnd.api+json',
          'Authorization': `Bearer ${this.$cookie.get('token')}`
          }
        })
        .then(response => {
            this.$set(this.$store.getters.getSlides[this.$store.state.selectedSlide].attributes, "bg_image", {src: ''})
            this.$store.getters.getSlides[this.$store.state.selectedSlide].attributes.bg_image.src = response.data.data.attributes.url
            this.$store.dispatch('saveChangeSlide')
        })
        .catch(response => {
            console.log(response);
        });
    }
  }
}

</script>

<style lang="css">
</style>
