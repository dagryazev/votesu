<template lang="html">
  <div>
    <!-- {{this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes.slide_type}} -->
    <div>
      <button type="button" name="button">Заливка</button>
      <button type="button" name="button">Картинка</button>
    <input type="text"v-model="inputColorBG">
    <button type="button" @click="saveChangeSlide()" name="button">Сохранить</button>
    </div>
  </div>
</template>

<script>
import {HTTP} from '../../http-common'
export default {
  name: "DetailsObjectComponents",
  computed:{
    inputColorBG: {
      get () {
        return this.$store.getters.getSlides[this.$store.state.selectedSlide].attributes['bg_color']
      },
      set (value) {
        this.$store.commit('updateSlideColor', value)
      }
    },
  },
  methods:{
    saveChangeSlide(){
      console.log(this.$store.getters.getSlides[this.$store.state.selectedSlide].id);
      console.log(this.$store.getters.getSlides[ this.$store.state.selectedSlide ]);
      HTTP.patch(`slides/${this.$store.getters.getSlides[this.$store.state.selectedSlide].id}`,JSON.stringify({
        data:{
          type: "slides",
          id: this.$store.getters.getSlides[this.$store.state.selectedSlide].id,
          attributes: this.$store.getters.getSlides[ this.$store.state.selectedSlide ].attributes
        }
      }))
    }
  }
}
</script>

<style lang="css">
</style>
