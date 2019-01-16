<template lang="html">
  <div>
    <div v-for="(item, index) in this.$store.getters.getPresentationId($route.params.id).slides">
      <img src="/image/thumbnail.svg" @click="updateSelectedSlide(item.id)" class="img-thumbnail" style="margin: 10px 0px;">
    </div>
    <div class="addSlide">
      <a @click="addSlide">+ Добавить</a>
      <a @click="addSlidePoll">+ Добавить опрос</a>
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
    },
    addSlidePoll: function(){
      this.$store.commit('addSlidePoll', {
        id_slide: this.$store.state.selectedSlide,
        name_poll: "Опрос 1",
        options_poll: [
          {text: "Ответ 1"},
          {text: "Ответ 2"}
        ]
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
