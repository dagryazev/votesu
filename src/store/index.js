import Vue from 'vue'
import Vuex from 'vuex'
import {HTTP} from '../http-common'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    presentation:[

    ],
    template: {
      1: {
        id: 1,
        title: "Заголовок",
        html: `<div `
      }
    },
    phone:          "",
    firstName:      "Имя",
    lastName:       "Фамилия",
    email:          "example@example.com",
    selectedSlide:  0
  },
  getters: {
    getPresentation(state){
      return [].concat(state.presentation).reverse()
    },
    getPresentationId: state => id => {
      let presentations = state.presentation,
          indexArr = [],
          returnItem = false
      presentations.forEach(item => {
        if(parseInt( item.id ) == id){
          returnItem = item
          return false;
        }
      })
      return returnItem;
    }
  },
  mutations: {
    set(state, { type, items }) {
      state[type] = items
    },
    updatePhone (state, phone) {
      state.phone = phone
      localStorage.phone = phone
    },
    updateSelectedSlide(state, index) {
      state.selectedSlide = index
    },
    updateToken(){
        HTTP.post('login/refresh')
        .then(response => {
          this.$cookie.set("token", response.data.token, {expires: response.data.expires_in + 's'})
          this.$cookie.set("token_refresh", response.data.token, {expires: '86400s'})
          instance.HTTP.headers['Authorization'] = "Bearer " + response.data.token
        })
        console.log("Токен есть");
    },
    addPresentation(state){
      const index = state.presentation.length
      HTTP.post('presentations',
        JSON.stringify({
          data:{
            type: "presentations",
            attributes: {
              name: "Hello world " + ( index + 1 )
            }
          }
        })
      )
      .then(response => {
        state.presentation.push( response.data.data )
      })
    },
    uploadPresentation(state){
      HTTP.get('presentations')
      .then(response => {
        state.presentation = response.data.data
      })
    },
    addSlide(state, {id_presentataions, slide_name, slide_position, slide}){
      const index = state.presentation.length
      HTTP.post('presentations',
        JSON.stringify({
          data:{
            type: "slides",
            attributes: {
              name: slide_name,
              position: slide_position,
              slide
            },
            relationships: {
              presentation: {
                data: {
                  type: "presentations",
                  id: id_presentataions
                }
              }
            }
          }
        })
      )
      .then(response => {
        state.presentation.push( response.data.data )
      })
    }
  },
  actions: {

  }
})

export default store
