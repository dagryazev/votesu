<template lang="html">
  <div :class="['imageSlide', ...classList]" :style="{backgroundImage:`url('${src}')`}">
    <button onclick="document.getElementById('uploadPhoto').click()">Загрузить</button>
    <form id="uploadPhotoForm">
      <input @change="uploadPhoto" name="photo" type="file" id="uploadPhoto" :style="{display:'none'}"/>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import {baseURL} from '../http-common'
export default {
  props: ['src', 'classList'],
  methods:{
    uploadPhoto() {
      let bodyFormData = new FormData();
      let fileInput = document.getElementById('uploadPhoto')
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
            this.$store.getters.getPresentationId(this.$store.state.selectedPresentation).slides[this.$store.state.selectedSlide].attributes.image.src = response.data.data.attributes.url
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
.imageSlide{
  display: flex;
  height: 340px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
}
</style>
