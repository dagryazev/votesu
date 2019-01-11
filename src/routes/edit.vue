<template lang="html">
  <div class="row nopadding" style="margin: 0 auto;">
    <div class="col-2 left-row" style="background-color: #fff;">
      <SlidesColsComponents></SlidesColsComponents>
    </div>
    <div class="col-8 center-row">
      <SlideContainterComponents></SlideContainterComponents>
      <div class="footer-row" style="background-color: #fff;">
        <div class="row col-12">

        </div>
      </div>
    </div>
    <div class="col-2 right-row" style="background-color: #fff;">
      <DetailsObjectComponents></DetailsObjectComponents>
    </div>
  </div>
</template>

<script>
import SlidesColsComponents from "../components/slideCols/"
import SlideContainterComponents from "../components/slideContainer/"
import DetailsObjectComponents from "../components/detailsObject/"

export default {
  name: "edit",
  components: {
    SlidesColsComponents,
    SlideContainterComponents,
    DetailsObjectComponents
  }
}
</script>

<style lang="css">
.footer-row{
  height: 121px;
  width: 100%;
  position: relative;
  top: 0px
}
.left-row{
  height: 925px;
}
.center-row{
  padding: 0px;
  margin: 0px;
}
</style>
