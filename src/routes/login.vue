<template lang="html">
  <div class="container" style="margin: 25px auto;">
    <form class="form-signin">
      <div class="form-label-group">
        <input type="phone" v-model="phone" id="inputPhone" class="form-control" placeholder="Телефон" required="" autofocus="">
      </div>
      <div class="alert alert-danger" role="alert" v-if="this.error">
        {{this.error}}
      </div>
      <button @click="sendData" class="btn btn-lg btn-primary btn-block" type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
import Inputmask from 'inputmask'
export default {
  data: function() {
    return {
      error: ""
    }
  },
  mounted() {
    Inputmask("89999999999").mask(document.getElementById('inputPhone'));
  },
  methods: {
    sendData( event ){
      event.preventDefault();

      fetch('https://slide.freel.me/api/v1/login',
      {
        headers:{
          "Content-Type": "application/vnd.api+json",
          "Accept": "application/vnd.api+json"
        },
        method: "POST",
        body: JSON.stringify({
          data:{
            phone: this.phone
          }
        })
      })
      .then( response => {
        return response.json()
      })
      .then( object => {
        if(object.data)
          this.$router.push("verify_login")
        else this.error = "Код ошибки: " + object.error.code + " - " + object.error.title
      })
    }
  },
  computed: {
    phone: {
      get () {
        return this.$store.state.phone
      },
      set (value) {
        this.$store.commit('updatePhone', value)
      }
    }
  }
}
</script>

<style lang="css">
  input.form-control{
    margin: 20px 0px;
  }
  button.btn-block{
    margin: 0 auto;
    width: auto;
  }
</style>
