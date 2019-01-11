import Vue from 'vue'
import App from './App.vue'
import store from './store/'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'
import Moment from 'vue-moment'

Vue.use(Moment)
Vue.use(VueCookie)
Vue.use(VueRouter)
// console.log("Ваш токен: " + VueCookie.get('token'));


new Vue({
  el: '#app',
  render: h => h(App),
  store
}).$mount("#container")
