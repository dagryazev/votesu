<template lang="html">
    <div style="width: 100%;">
      <template v-if="elementType == 'text' || elementType == 'text[0]' || elementType == 'text[1]'">
        <textarea type="text" :class="[elementType, ...classList]" v-model="input" :placeholder="this.placeholder || 'Введите значение'"></textarea>
      </template>
      <template v-else-if="elementType.type == 'contacts'">
        <input type="text" :class="[elementType, ...classList]" v-model="input" :placeholder="placeholder"/>
      </template>
      <template v-else>
        <input type="text" :class="[elementType, ...classList]" v-model="input" :placeholder="this.placeholder || 'Введите значениe'"/>
      </template>
    </div>
</template>

<script>
import autosize from 'autosize'
export default {
  name: "ObjectSlide",
  props: ['elementType','classList', 'placeholder'],
  computed: {
    input: {
      get () {
        return this.$store.getters.getValueObject({
            selectedElement: this.elementType
          })
      },
      set (value) {
        this.$store.commit('updateObjectSlide',
          {
            selectedElement: this.elementType,
            value
          }
        )
      }
    }
  },
  mounted(){
    let textarea = document.querySelectorAll('textarea')
    if(this.elementType == 'text' || this.elementType == 'text[0]' || this.elementType == 'text[1]') autosize(textarea);

  },
  updated(){
    let textarea = document.querySelectorAll('textarea')
    autosize.update(textarea);
  }
}

</script>

<style lang="css">
input, textarea{
  background-color: transparent;
  border: none;
  width: 100%;
}
.left_align{
  text-align: left;
}
.center_align{
  text-align: center;
}
input.header{
  font-size: 2.5em;
}
</style>
