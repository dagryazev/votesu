<template lang="html">
  <div class="canvas_container">
    <CanvasComponents></CanvasComponents>
  </div>
</template>

<script>
import CanvasComponents from './canvas/'
export default {
  name: "SlideContainterComponents",
  components:{
    CanvasComponents
  }
}
</script>

<style lang="css">
.canvas_container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 810px;
}
</style>
