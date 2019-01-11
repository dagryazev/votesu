<template lang="html">
  <div>
    <div v-for="(item, index) in this.$store.getters.getPresentationId($route.params.id).relationships.slides">
      <img :src="item.thumbnail" @click="updateSelectedSlide(index)" class="img-thumbnail" style="margin: 10px 0px;">
    </div>
    <div class="addSlide">
      <a @click="addSlide">+ Добавить</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "SlidesColsComponents",
  methods: {
    updateSelectedSlide: function (index) {
      this.$store.state.selectedSlide = index
      this.$store.commit('updateSelectedSlide', index)
    },
    addSlide: function(){
      this.$store.commit('addSlide', {
        id_presentataions: this.$route.params.id,
        slide_name: "Слайд 1",
        slide_position: 0,
        slide: {}
      })
    }
  }
}
</script>

<style lang="css">
.addSlide{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px; 
  font-size: 1em;
}
</style>
