import Vue from 'vue'
import Vuex from 'vuex'
import {HTTP} from '../http-common'
import router from '../Routes.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    presentation:[],
    polls:[],
    slides: [],
    user: {},
    phone:          "",
    firstName:      "Имя",
    lastName:       "Фамилия",
    email:          "example@example.com",
    selectedSlide:  1,
    selectedPresentation: 1
  },
  getters: {
    getPresentation(state){
      console.log(state.presentation);
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
    },
    getSlideType: state => id =>{
      return store.getters.getPresentationId(id).slides[state.selectedSlide].attributes.slide_type
    },
    getValueObject: state => ({id_presentataions, selectedElement}) => {
      switch (selectedElement) {
        case 'text[0]':
          return "Текст 1"
          break;
        case 'text[1]':
          return "Текст 2"
          break;
        default:
          return "Заголовок"

      }
    },
    getPoll(state) {
      if(!store.getters.getPresentationId(state.selectedPresentation).slides)return false
      let returnPoll = false,
          id_slide   =  store.getters.getPresentationId(state.selectedPresentation).slides[state.selectedSlide].id
      state.polls.forEach((item, i) => {
        if(item.idSlide == id_slide) returnPoll = item
      })
      return returnPoll
    },
    getSlides(state){
      if(store.getters.getPresentationId(state.selectedPresentation).slides)
      return store.getters.getPresentationId(state.selectedPresentation).slides.sort(function (a, b) {
        if (a.attributes.order_id > b.attributes.order_id) {
          return 1;
        }
        if (a.attributes.order_id < b.attributes.order_id) {
          return -1;
        }
        return 0;
      });
    },
    getUser(state){
      if(!state.user.length) store.dispatch("uploadUser")
      return state.user[0]
    }
  },
  mutations: {
    set(state, { type, items }) {
      state[type] = items
    },
    updateUser(state, {input, value}){
      store.getters.getUser.attributes[input] = value
    },
    updateSlidePresentation(state, {index, data}){
      // if(!state.presentation[index].slides[data.id]) Vue.set(state.presentation[index].slides, data.id, [])
      // state.presentation[index].slides[data.id].push(data)
      Vue.set(state.presentation[index], 'slides', [])
      state.presentation[index].slides = data
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
      const index = state.presentation.length;
      HTTP.post('presentations',
        JSON.stringify({
          data:{
            type: "presentations",
            attributes: {
              title: "Hello world " + ( index + 1 )
            }
          }
        })
      )
      .then(response => {
        Vue.set(state.presentation, state.presentation.length, response.data.data)
        router.push({name: 'edit', params:{id: response.data.data.id}})
      })
    },
    addSlide(state, {id_presentataions, slide_name, slide, slide_type}){
      const index = state.presentation.length,
            slide_position = state.selectedSlide
      let   id_slide = false;
      let data = {
          type: "slides",
          attributes: {
            title: slide_name,
            order_id: state.selectedSlide + 1 + "",
            slide_type,
            bg_color: "#ffffff",
            bg_alpha: "100"
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
      switch (slide_type) {
        case "header":
            data.attributes.header = "Заголовок"
            data.attributes.subheader = "Подзаголовок"
          break;

        case "text":
        data.attributes.header = "Заголовок"
        data.attributes.columns = [
          {
            "text": "Текст 1",
            weight: 1
          },
          {
            "text": "Текст 2",
            weight: 0
          }
        ]
          break;

        case "text_picture":
          data.attributes.header = "Заголовок"
          data.attributes.text   = "Текст"
          data.attributes.image_position = "left"
          data.attributes.image = {}
          data.attributes.image.src = "https://st.depositphotos.com/2692701/3194/i/450/depositphotos_31940381-stock-photo-crumpled-five-dollar-bill.jpg"
          break;

        case "picture":
          data.attributes.header = "Заголовок"
          data.attributes.image_position = "center"
          data.attributes.image = {}
          data.attributes.image.src = "https://st.depositphotos.com/2692701/3194/i/450/depositphotos_31940381-stock-photo-crumpled-five-dollar-bill.jpg"
          break;

        case "video":
          data.attributes.header = "Заголовок"
          data.attributes.video = {}
          data.attributes.video.src = "https://www.youtube.com/watch?v=mq760JdoO-E"
          break;

        case "poll":
        data.attributes.header = "Заголовок"
          break;
        default:

      }
      HTTP.post('slides',
        JSON.stringify({data})
      )
      .then(response => {
        id_slide = response.data.data.id
        Vue.set(store.getters.getPresentationId(id_presentataions).slides, store.getters.getPresentationId(id_presentataions).slides.length ,response.data.data)
        state.selectedSlide += 1
        if(slide_type == 'poll'){
          HTTP.post('polls',
            JSON.stringify({
                "data": {
                    "type": "polls",
                    "attributes": {
                        "title": "Опрос",
                        "options": [
                          {"text": "Вариант 1"},
                          {"text": "Вариант 2"},
                          {"text": "Вариант 3"},
                          {"text": "Вариант 4"}
                        ]
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
            Vue.set(state.polls, state.polls.length, response.data.data)
          })
        }
      })


    },
    updateObjectSlide(state, {value, selectedElement, id_presentataions}){
      if( selectedElement == "text[0]" || selectedElement == "text[1]")
        state.presentation[id_presentataions - 1].slides[state.selectedSlide].attributes.columns[selectedElement.match(/(\d+)/g)].text = value
      state.presentation[id_presentataions - 1].slides[state.selectedSlide].attributes[selectedElement] = value
    },
    updatePresentations(state, data){
      state.presentation = data
    },
    addUser(state, user){
      state.user = user
    },
    updateSlideColor(state, value){
      store.getters.getSlides[state.selectedSlide].attributes.bg_color = value
    }
  },
  actions: {
    async uploadPresentation(store){
      if(store.state.presentation.length != 0) return false;
      let response

      try {
          response = await HTTP.get('presentations')
      } catch (ex) {
          return
      }
      store.commit("updatePresentations", response.data.data)
      response.data.data.forEach((item, index) => {
        let slides;
            HTTP.get(`presentations/${item.id}/slides`)
            .then(object => {
              store.commit("updateSlidePresentation", {
                index,
                data: object.data.data
              })
              return object.data.data
            }).then(slides => {
              if(slides)
              slides.forEach((item_poll, i) => {
                if(item_poll.attributes.slide_type == 'poll'){
                  HTTP.get(`slides/${item_poll.id}/poll`)
                  .then(poll => {
                    if(poll.data.data == null)return false;
                      poll.data.data.idSlide = item_poll.id
                      store.state.polls.push(poll.data.data)
                  })

                }
              })
            })
      })
    },
    uploadUser(store){
      HTTP.get('users')
      .then(response => {
        store.commit("addUser", response.data.data)
      })
    }
  }
})

export default store
