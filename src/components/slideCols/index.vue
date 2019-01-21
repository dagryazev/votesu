<template lang="html">
  <div v-if="this.$store.getters.getSlides">
    <div v-for="(item, index) in this.$store.getters.getSlides">
      <img src="/image/thumbnail.svg" @click="updateSelectedSlide(index)" class="img-thumbnail" style="margin: 10px 0px;">
      <b :style='{display: "block", width: "100%", textAlign: "center"}'>{{item.attributes.slide_type}}</b>
      <div class="addSlide" v-if="$store.state.selectedSlide == index">
        <a @click="visibleAddSlide = true">+ Добавить</a>
      </div>
    </div>
    <template v-if="this.$store.getters.getSlides">
      <div class="addSlide" v-if="this.$store.getters.getSlides.length == 0">
        <a @click="visibleAddSlide = true">+ Добавить</a>
      </div>
    </template>
    <div class="container__addslide" v-if="visibleAddSlide">
      <div class="container__addslide__block">
        <div class="container row">
          <div class="col-4 container__addslide__block__slide" @click="addSlide('header')">
            <img src="/image/header-slide.png" class="img-thumbnail" >
            <label class="label_slide">Заголовок</label>
          </div>
          <div class="col-4 container__addslide__block__slide" @click="addSlide('text')">
            <img src="/image/text-slide.png" class="img-thumbnail" >
            <label class="label_slide">Текст</label>
          </div>
          <div class="col-4 container__addslide__block__slide" @click="addSlide('text_picture')">
            <img src="/image/text_image-slide.png" class="img-thumbnail" >
            <label class="label_slide">Картинка + текст</label>
          </div>
          <div class="col-4 container__addslide__block__slide">
            <img src="/image/image-slide.png" class="img-thumbnail" @click="addSlide('picture')">
            <label class="label_slide">Картинка</label>
          </div>
          <div class="col-4 container__addslide__block__slide">
            <img src="/image/video-slide.png" class="img-thumbnail" @click="addSlide('video')">
            <label class="label_slide">Видео</label>
          </div>
          <div class="col-4 container__addslide__block__slide">
            <img src="/image/contacts-slide.png" class="img-thumbnail" @click="addSlide('contacts')">
            <label class="label_slide">Контакты</label>
          </div>
          <div class="col-4 container__addslide__block__slide" @click="addSlide('poll')">
            <img src="/image/poll-slide.png" class="img-thumbnail" >
            <label class="label_slide">Опрос</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SlidesColsComponents",
  props: ['presentation'],
  data: function() {
    return {
      visibleAddSlide: false
    }
  },
  methods: {
    updateSelectedSlide: function (index) {
      this.$store.state.selectedSlide = index
      this.$store.commit('updateSelectedSlide', index)
    },
    addSlide: function(slide_type){
      this.$store.commit('addSlide', {
        id_presentataions: this.$route.params.id,
        slide_name: "Слайд 1",
        slide_type,
        slide: {}
      })
      this.visibleAddSlide = false;
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
.container__addslide{
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  background: #2e2c4f;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  justify-content: center;
  align-items: center;
}
.container__addslide__block{
  display: flex;
  width: 800px;
  height: 600px;
  color: #fff;
}
label.label_slide{
  width: 100%;
  text-align: center;
}
.container__addslide__block__slide{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
}
</style>
