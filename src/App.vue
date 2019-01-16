<template>
  <div id="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div v-if="this.$router.currentRoute.name != 'edit'" style="width: 100%;height: 100%;display: flex;">
      <router-link class="navbar-brand" to="/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118 21" class="app-header__logo" width="131" height="21" fill="#000">
          <path id="Slidecast" class="st0" d="M40.7 17.2c2.9 0 5-1.6 5-4.2 0-2.4-1.5-3.4-4.5-4.1-2.7-.6-3.3-1.1-3.3-2.2 0-1 .8-1.7 2.3-1.7 1.3 0 2.5.5 3.8 1.4l1.3-1.9c-1.4-1.1-3-1.8-5.1-1.8-2.8 0-4.8 1.7-4.8 4.1 0 2.6 1.7 3.5 4.7 4.2 2.6.6 3.2 1.2 3.2 2.2 0 1.1-1 1.8-2.5 1.8-1.7 0-3.1-.7-4.4-1.8L34.9 15c1.6 1.5 3.7 2.2 5.8 2.2zm7-.2h2.4V2.4h-2.4V17zm4.8-12.2h2.6V2.5h-2.6v2.3zm.1 12.2H55V6.4h-2.4V17zm9.1.2c1.7 0 2.8-.9 3.6-2V17h2.4V2.4h-2.4v5.7c-.8-1-1.9-1.9-3.6-1.9-2.5 0-4.9 2-4.9 5.5s2.4 5.5 4.9 5.5zm.6-2.1c-1.6 0-3-1.3-3-3.4 0-2.1 1.4-3.4 3-3.4s3.1 1.3 3.1 3.4c0 2.1-1.5 3.4-3.1 3.4zm12.5 2.1c1.9 0 3.3-.8 4.3-2L77.7 14c-.8.8-1.7 1.3-2.9 1.3-1.6 0-2.8-1-3-2.7h7.8v-.7c0-3-1.7-5.7-5.1-5.7-3 0-5.2 2.5-5.2 5.5.1 3.3 2.4 5.5 5.5 5.5zm-3-6.2c.2-1.7 1.2-2.8 2.7-2.8 1.6 0 2.5 1.2 2.7 2.8h-5.4zm14.3 6.2c2.1 0 3.3-.8 4.3-2L89 13.8c-.8.8-1.6 1.3-2.7 1.3-1.9 0-3.2-1.5-3.2-3.4s1.3-3.4 3-3.4c1.2 0 2 .5 2.7 1.3L90.4 8c-1-1.1-2.2-1.8-4.2-1.8-3.2 0-5.5 2.5-5.5 5.5 0 3.1 2.3 5.5 5.4 5.5zm14.6-.2v-6.3c0-2.8-1.5-4.5-4.6-4.5-1.7 0-2.9.4-4 .9l.7 1.9c1-.4 1.8-.7 3-.7 1.7 0 2.6.8 2.6 2.3v.2c-.8-.3-1.6-.4-2.9-.4-2.5 0-4.3 1.1-4.3 3.5 0 2.2 1.8 3.3 3.8 3.3 1.6 0 2.7-.7 3.4-1.5V17h2.3zm-2.3-3.8c0 1.3-1.2 2.2-2.8 2.2-1.1 0-2-.6-2-1.6 0-1.1.9-1.7 2.4-1.7.9 0 1.8.2 2.4.4v.7zm8 4c2.2 0 3.9-1.1 3.9-3.3 0-1.9-1.7-2.6-3.3-3.1-.1 0-.1 0-.2-.1-1.2-.4-2.2-.7-2.2-1.4s.5-1.1 1.5-1.1c.9 0 2 .4 3 1l1-1.7c-1.1-.7-2.6-1.2-3.9-1.2-2.1 0-3.8 1.2-3.8 3.2 0 2.1 1.7 2.7 3.3 3.2.1 0 .1 0 .2.1 1.2.3 2.2.6 2.2 1.4 0 .7-.6 1.2-1.6 1.2-1.1 0-2.3-.4-3.5-1.3l-1.1 1.6c1.4 1 3 1.5 4.5 1.5zm9.1 0c.9 0 1.6-.2 2.2-.5v-2c-.5.2-1 .4-1.5.4-.8 0-1.3-.4-1.3-1.3V8.5h2.8V6.4h-2.8V3.5h-2.4v2.9h-1.3v2.1h1.3v5.6c0 2.3 1.3 3.1 3 3.1z"></path>
          <path class="st1" d="M0 0v2h2v12c0 1.1.9 2 2 2h8v1.3c-.6.3-1 1-1 1.7 0 1.1.9 2 2 2s2-.9 2-2c0-.7-.4-1.4-1-1.7V16h8c1.1 0 2-.9 2-2V2h2V0H0zm22 14H4V2h18v12z"></path>
          <path class="st2" d="M7.5 6.5l1 1C11 5 15 5 17.5 7.5l1-1c-3-3-8-3-11 0zm4 4L13 12l1.5-1.5c-.8-.8-2.2-.8-3 0zm-2-2l1 1c1.4-1.4 3.6-1.4 5 0l1-1c-1.9-1.9-5.1-1.9-7 0z"></path>
        </svg>
      </router-link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item" v-if="!this.$cookie.get('token')">
              <router-link class="nav-link" to="/login">Войти</router-link>
            </li>
            <li class="nav-item" v-if="!this.$cookie.get('token')">
              <router-link class="nav-link" to="/registration">Регистрация</router-link>
            </li>
            <li class="nav-item" v-if="this.$cookie.get('token')">
              <router-link class="nav-link" to="/presentation">Презентации</router-link>
            </li>
            <li class="nav-item" v-if="this.$cookie.get('token')">
              <router-link class="nav-link" to="/poll">Результаты опросов</router-link>
            </li>
          </ul>
          <div class="logout" v-if="this.$cookie.get('token')">
            {{this.$store.state.phone}}
            <a @click="deleteCookie" class="link_logout">Выйти</a>
          </div>
        </div>
      </div>

      <div v-if="this.$router.currentRoute.name == 'edit'" style="width: 100%;height: 100%;display: flex;">
        <div class="collapse navbar-collapse back_presentation">
          <ul class="navbar-nav">
            <li class="nav-item" >
              <router-link class="nav-link" to="/presentation" style="padding-left: 15px;">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="editor-header__back-icon" width="24" height="24" fill="#fff"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" fill-rule="evenodd"></path></svg>
                <span style="padding-left: 10px;">Все презентации</span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="title_presentation">
          <b>{{this.$store.getters.getPresentationId($route.params.id).attributes.name}}</b>
        </div>
        <div class="start_presentation">
          <button type="button" name="button">НАЧАТЬ ПОКАЗ</button>
        </div>
      </div>

    </nav>
    <content class="content">
      <router-view></router-view>
    </content>
  </div>
</template>

<script>
import IndexPage from './routes/index'
import LoginPage from './routes/login'
import RegistrationPage from './routes/registration'
import PresentationPage from './routes/presentation'
import EditPage from './routes/edit'
import PollPage from './routes/poll'
import VerifyRegPage from './routes/verifyReg'
import VerifyLoginPage from './routes/verifyLogin'
import VueRouter from 'vue-router'

const routes = [
  { path: '/', component: IndexPage, name: "main" },
  { path: '/registration', component: RegistrationPage, name: "registration" },
  { path: '/login', component: LoginPage, name: "login" },
  { path: '/presentation', component: PresentationPage, name: "presentation" },
  { path: '/poll', component: PollPage, name: "poll" },
  { path: '/edit/:id', name: "edit", component: EditPage },
  { path: '/verify_reg', component: VerifyRegPage, name: "verify_reg" },
  { path: '/verify_login', component: VerifyLoginPage, name: "verify_login" }
]
const router = new VueRouter({
  routes,
  mode: "history"
})

const Access = function(token) {
  let nameRoute = router.currentRoute.name

  switch (nameRoute) {
    case 'registration':
      if(token) router.push({name: "presentation"})
      return false;
      break;
    case 'login':
      if(token) router.push({name: "presentation"})
      return false;
      break;
    case 'presentation':
      if(!token) router.push({name: "main"})
      return true;
      break;
    case 'edit':
      if(!token) router.push({name: "main"})
      return true;
      break;
    case 'verify_reg':
      if(token) router.push({name: "presentation"})
      if(!this.$store.state.phone == '') router.push({name: "registration"})
      return false;
      break;
    case 'verify_login':
      if(token) router.push({name: "presentation"})
      if(this.$store.state.phone == '') router.push({name: "login"})
      return false;
      break;
    default:
      break;
  }
}
export default {
  name: 'app',
  router,
  watch: {
    '$route' (to, from) {
      Access(this.$cookie.get("token"))
    }
  },
  methods: {
    deleteCookie(){
      this.$cookie.delete('token')
      this.$cookie.delete('token_refresh')
      router.push({name: "login"})
    }
  },
  created(){
    this.$store.commit("uploadPresentation")
    this.$store.commit('updatePhone', localStorage.phone)
    if( Access(this.$cookie.get("token")) ){
      if(this.$cookie.get("token") == null)
          this.$store.commit("updateToken")
      setInterval(() => {
        if(this.$cookie.get("token") == null){
            this.$store.commit("updateToken")
          }
      }, 50000)

    }
  },
  mounted(){

  }
}
</script>

<style>
a{
  cursor: pointer;
}
@font-face {
  font-family: 'Helvetica Neue Cyr Roman';
  src: url('../fonts/HelveticaNeueCyr-Roman.eot');
  src: url('../fonts/HelveticaNeueCyr-Roman.eot?#iefix') format('embedded-opentype'),
  url('../fonts/HelveticaNeueCyr-Roman.woff') format('woff'),
  url('../fonts/HelveticaNeueCyr-Roman.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
body{
  background-color: #f6f6f6;
  font-family: 'Helvetica Neue Cyr Roman';
}
.navbar{
  background-color: #2e2e4e !important;
  color: #fff;
  padding: 0 !important;
  height: 50px;
}
#navbarNav{
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.logout{
  margin-right: 50px;
}
ul.navbar-nav{
  height: 100%;
}
.navbar a{
  color: #fff !important;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: .25s linear;
}
.navbar li.nav-item a.router-link-active{
  background-color: #2d99ff !important;
}
.navbar li.nav-item a:hover{
  background-color: #2d99ff !important;
}
.navbar li.nav-item a{
  padding: 0 20px !important;
}
.app-header__logo{
  margin:0px 50px;
}
.st0{fill:#fff}
.st1{fill:#2d99ff}
.st2{fill:#01d5ac}
.title_presentation{
  width: 70%;
  justify-content: center;
  align-items: center;
  display: flex;
}
.back_presentation{
  width: 15%;
}
.start_presentation{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 15%;
  padding-right: 30px;
}
a.link_logout{
  margin-left: 50px;
}
.content{
  width: 100%;
}
</style>
