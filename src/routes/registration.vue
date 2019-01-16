<template lang="html">
  <div class="container" style="margin: 25px auto;">
    <form class="form-signin">
      <div class="form-label-group">
        <input v-model="firstname" type="name" id="inputNameL" class="form-control" placeholder="Имя" required="">
      </div>
      <div class="form-label-group">
        <input v-model="lastname" type="name" id="inputNameF" class="form-control" placeholder="Фамилия" required="">
      </div>
      <div class="form-label-group">
        <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="E-mail" required="">
      </div>
      <div class="form-label-group">
        <input v-model="phone" type="text" id="inputPhone" class="form-control" placeholder="Телефон" required="">
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
      firstname: "",
      lastname: "",
      email: ""
    }
  },
  mounted() {
    Inputmask("89999999999").mask(document.getElementById('inputPhone'));
  },
  methods: {
    sendData( event ){
      event.preventDefault();

      fetch('https://slide.freel.me/api/v1/register',
      {
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json'
        },
        method: "POST",
        body: JSON.stringify({
          data:{
            "first_name": this.firstname,
            "last_name":  this.lastname,
            "phone":      localStorage.phone,
            "email":      this.email
          }
        })
      })
            .then( response => {
              return response.json()
            })
            .then( object => {
              if(object.data.code)
                this.$router.push("verify_reg")
              else console.error("Error");
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
.form-label-group{
  margin: 10px 0px;
}
</style>
