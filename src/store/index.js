import Vue from 'vue'
import Vuex from 'vuex'
import {HTTP} from '../http-common'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    presentation:[

    ],
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
    async uploadPresentation(state){
      let response

      try {
          response = await HTTP.get('presentations')
      } catch (ex) {
          // Handle error
          return
      }

      response.data.data.forEach((item, index) => {
        let slides
          HTTP.get(`presentations/${item.id}/slides`)
          .then(object => {
              response.data.data[index].slides = object.data.data
              if(object.data.data)
              object.data.data.forEach((item_poll, i) => {
                if(item.attributes.slide_type == 'poll'){
                  HTTP.get(`slides/${item_poll.id}/poll`)
                  .then(poll => {
                    response.data.data[index].slides[i].poll = poll
                  })
                }
              })

          })
      })
      state.presentation = response.data.data
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
              body:{
                field1:{
                  type: "title",
                  text: "Заголовок",
                  style: "bold",
                  size: "24px",
                  align: "center"
                },
                field2:{
                  type: "subtitle",
                  text: "Подзаголовок",
                  style: "normal",
                  size: "18px",
                  align: "left"
                }
              }
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
    },
    addSlidePoll(state, {id_slide, name_poll, options_poll}){
      HTTP.post('polls',
        JSON.stringify({
            "data": {
                "type": "polls",
                "attributes": {
                    "name": name_poll,
                    "options": options_poll
                },
                "relationships": {
                    "slide": {
                        "data": {
                            "type": "slides",
                            "id": "" + id_slide
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
