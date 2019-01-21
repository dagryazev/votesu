<template lang="html">
  <div class="canvas" :style="{backgroundColor: this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes['bg_color']}">
    <template v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides">
    <div class="canvas_object">
      <div class="canvas_object__header" v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes.slide_type == 'header'">
        <input type="text" class="input_h1 center_align" v-model="input" @focus="focusInput('header')" />
        <input type="text" class="input_p center_align" v-model="input" @focus="focusInput('text')" />
      </div>

      <div class="canvas_object__text" v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes.slide_type == 'text'">
        <input type="text" class="input_h1 left_align" v-model="input" @focus="focusInput('header')" />
        <div :style="{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }">
          <input type="text" class="input_p left_align" v-model="input" @focus="focusInput('text[0]')" :style="{width: '50%'}" />
          <input type="text" class="input_p left_align" v-model="input" @focus="focusInput('text[1]')" :style="{width: '50%'}" />
        </div>
      </div>

      <div class="canvas_object__text row" v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes.slide_type == 'text_picture'" :style="{display: 'flex',flexDirection: 'row', alignItems:'center'}">
        <div class="imageSlide col-6" v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes['image_position'] == 'left'">
          <img class="picture" :src="this.$store.getters.getPresentationId($route.params.id).slides[this.$store.state.selectedSlide].attributes['image'].src">
        </div>
        <div class="col-6">
          <input type="text" class="input_h1 left_align" v-model="input" @focus="focusInput('header')" />
          <input type="text" class="input_p left_align" v-model="input" @focus="focusInput('text')" />
        </div>
        <div class="imageSlide col-6" v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes['image_position'] == 'right'">
          <img class="picture" :src="this.$store.getters.getPresentationId($route.params.id).slides[this.$store.state.selectedSlide].attributes['image'].src">
        </div>
      </div>

      <div class="canvas_object__text row" v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes.slide_type == 'picture'" :style="{display: 'flex',flexDirection: 'column', alignItems:'center', justifyContent: 'center'}">
        <div>
          <input type="text" class="input_h1 center_align" v-model="input" @focus="focusInput('header')" />
        </div>
        <div class="imageSlide">
          <img class="picture" :src="this.$store.getters.getPresentationId($route.params.id).slides[this.$store.state.selectedSlide].attributes['image'].src">
        </div>
      </div>

      <div class="canvas_object__text" v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes.slide_type == 'poll'">
        <input type="text" class="input_h1 left_align" v-model="input" @focus="focusInput('header')" />
        <ul :style="{ width: '100%' }">
          <template v-if="this.$store.getters.getPoll">
            <li v-for="item in this.$store.getters.getPoll.attributes.options">
              <input type="text" :value="item.text">
            </li>
          </template>
        </ul>
      </div>
    </div>
  </template>
  </div>
</template>

<script>
export default {
  name: "CanvasComponents",
  data: function() {
    return {
      selectedElement: 'header'
    }
  },
  methods: {
    focusInput( value ){
      this.selectedElement = value
    }
  },
  computed: {
    input: {
      get (event) {
        console.error(event);
        return this.$store.getters.getValueObject({
            id_presentataions: this.$route.params.id,
            selectedElement: this.selectedElement
          })
      },
      set (value) {
        this.$store.commit('updateObjectSlide',
          {
            selectedElement: this.selectedElement,
            value,
            id_presentataions: this.$route.params.id
          }
        )
      }
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
  width: auto;
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
</style>
