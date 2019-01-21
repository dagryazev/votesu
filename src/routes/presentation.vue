<template lang="html">
  <div class="container__presentaition container">
    <div class="container__add_presentation card" style="width: 18rem; margin: 10px;" @click="addPresentation">
      <div class="container__add_presentation__plus card-body">
        +
      </div>
    </div>
    <div class="card row_presentation"  v-for="item in $store.getters.getPresentation">
      <router-link :to="{ name: 'edit', params: {id: item.id} }">
        <img :src="item.attributes.name" class="card-img-top">
        <div class="card-body">
          <p class="card-text">{{ item.attributes.title }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    addPresentation(){
      const id = this.$store.commit("addPresentation")
    },
  },
  mounted(){
    console.log("creadted");
    this.$store.dispatch("uploadPresentation")
  }
}
</script>

<style lang="css">
.container__add_presentation__plus{
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 42px;
  font-weight: bold;
  color: rgba(204,204,204,1);
  transition: .1s linear;
}
.card-img-top{
  height: 150px;
  background-color: #ccc;
}
.container__add_presentation__plus:hover{
  color: rgba(204,204,204,.5);
}
.container__presentaition{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.row_presentation{
  width: 18rem;
  margin: 10px;
}
</style>
