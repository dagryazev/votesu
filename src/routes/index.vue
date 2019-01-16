<template lang="html">
  <div class="container main">
    <h1 class="container_header">Вход</h1>
    <form class="form-signin">
      <div class="form-label-group">
        <label>Телефон:</label>
        <input type="phone" v-model="phone" id="inputPhone" class="form-control" placeholder="" required="" autofocus="">
      </div>
      <div class="alert alert-danger" role="alert" v-if="this.error">
        {{this.error}}
      </div>
      <button @click="sendData" class="btn btn-lg btn-primary btn-block" type="submit">Отправить код</button>
    </form>
    <form class="form-signin">
      <div class="form-label-group">
        <label>Код подтверждения:</label>
        <input type="number" v-model="code" id="inputCode" class="form-control" placeholder="" required="" autofocus="">
      </div>
      <div class="alert alert-danger" role="alert" v-if="this.error">
        {{this.error}}
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
import Inputmask from 'inputmask'
export default {
  mounted() {
    Inputmask("89999999999").mask( document.getElementById('inputPhone') );
  },
  methods: {
    sendData( event ){
      event.preventDefault();

      fetch('https://slide.freel.me/api/v1/login',
      {
        headers:{
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json'
        },
        method: "POST",
        body: JSON.stringify({
          data:{
            phone:  this.phone
          }
        })
      })
      .then( response => {
        return response.json()
      })
      .then( object => {
        if(object.data.code)
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
  margin-bottom: 20px;
  width: 300px;
}
form.form-signin{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.form-label-group label{
  margin-top: 20px;
}
button.btn-block{
  margin: 0 auto;
  width: auto;
}
.container.main{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.container_header{
  display: inline-block;
}
</style>
