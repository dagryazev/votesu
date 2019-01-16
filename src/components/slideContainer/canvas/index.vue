<template lang="html">
  <div class="canvas">
    <div v-if="this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes.slide_type == 'poll'" class="canvas_object">
      <h1 class="center">{{this.$store.getters.getPresentationId(this.$route.params.id).slides[this.$store.state.selectedSlide].attributes.name}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "CanvasComponents",
  computed: {

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
}
.canvas_object input{
  border: none;
}
.center{
  text-align: center;
}
</style>
