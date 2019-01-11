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
      let code = this.code,
          headers = new Headers([
            ['Content-Type', 'application/x-www-form-urlencoded']
          ]);
      fetch("https://slide.freel.me/api/v1/register/confirm",
      {
        headers,
        method: "POST",
        body: `phone=${this.$store.state.phone.replace("+","%2B")}&code=${code}`
      })
      .then( response => {
        return response.json()
      })
      .then( token => {
        console.log(token);
        if(token.token){
          this.$cookie.set("token", token.token, {expires: token.expires_in + 's'})
          this.$cookie.set("token_refresh", token.token, {expires: '86400s'})
          this.$router.push("presentation")
        }
      })
    }
  }

}
</script>

<style lang="css">
</style>
