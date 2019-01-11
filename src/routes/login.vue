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
    Inputmask("+99999999999").mask(document.getElementById('inputPhone'));
  },
  methods: {
    sendData( event ){
      event.preventDefault();

      let headers = new Headers([
        ['Content-Type', 'application/x-www-form-urlencoded']
      ]);

      fetch('https://slide.freel.me/api/login',
      {
        headers,
        method: "POST",
        body: `phone=${this.phone.replace("+","%2B")}`
      })
      .then( response => {
        return response.json()
      })
      .then( object => {
        if(object.code)
          this.$router.push("verify_login")
        else this.error = object.error
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
