<template lang="html">
  <div class="container" style="margin: 25px auto;">
    <form class="form-signin">
      <div class="form-label-group">
        <input v-model="code" type="number" id="inputCode" class="form-control" placeholder="Код подтверждения" required="">
      </div>
      <button @click="sendCode" class="btn btn-lg btn-primary btn-block" type="submit">Отправить код</button>
    </form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      code: ""
    }
  },
  methods:{
    sendCode( event ){
      event.preventDefault()
      let code = this.code

      fetch("https://slide.freel.me/api/v1/register/confirm",
      {
        headers:{
          "Content-Type": "application/vnd.api+json",
          "Accept": "application/vnd.api+json"
        },
        method: "POST",
        body: JSON.stringify({
          data:{
            phone: this.$store.state.phone,
            code
          }
        })
      })
      .then( response => {
        return response.json()
      })
      .then( token => {
        if(token.data.token){
          this.$cookie.set("token", token.data.token, {expires: token.data.expires_in + 's'})
          this.$cookie.set("token_refresh", token.data.token, {expires: '86400s'})
          this.$router.push("presentation")
        }
      })
    }
  }

}
</script>

<style lang="css">
</style>
