<template lang="html">
  <div v-if="this.$store.getters.getUser" class="container">
    <div class="form-group">
      <label for="fname">Имя</label>
      <input type="text" class="form-control" id="fname" v-model="inputFirstName"/>
    </div>

    <div class="form-group">
      <label for="lname">Фамилия</label>
      <input type="text" class="form-control" id="lname" v-model="inputLastName"/>
    </div>

    <div class="form-group">
      <label for="company">Компания</label>
      <input type="text" class="form-control" id="company" v-model="inputCompany"/>
    </div>

    <div class="form-group">
      <label for="position">Должность</label>
      <input type="text" class="form-control" id="position" v-model="inputPosition"/>
    </div>

    <div class="form-group">
      <label for="phone">Телефон</label>
      <input type="phone" class="form-control" id="phone" v-model="inputPhone"/>
    </div>

    <div class="form-group">
      <label for="email">E-mail</label>
      <input type="email" class="form-control" id="email" v-model="inputEmail"/>
    </div>
    <button type="submit" class="btn btn-primary" @click="saveUser">Сохранить</button>
    <div class="alert alert-success" role="alert" v-if="success" :style="{marginTop:'30px'}">
      Изменения успешно сохранены
    </div>
  </div>
</template>

<script>
import {HTTP} from '../http-common'
export default {
  data: function() {
    return {
      success: false
    }
  },
  computed: {
    inputFirstName: {
      get () {
        return this.$store.getters.getUser.attributes['first_name']
      },
      set (value) {
        this.$store.commit('updateUser',
          {
            input: "first_name",
            value
          }
        )
      }
    },
    inputLastName: {
      get () {
        return this.$store.getters.getUser.attributes['last_name']
      },
      set (value) {
        this.$store.commit('updateUser',
          {
            input: "last_name",
            value
          }
        )
      }
    },
    inputCompany: {
      get () {
        return this.$store.getters.getUser.attributes['company']
      },
      set (value) {
        this.$store.commit('updateUser',
          {
            input: "company",
            value
          }
        )
      }
    },
    inputPosition: {
      get () {
        return this.$store.getters.getUser.attributes['position']
      },
      set (value) {
        this.$store.commit('updateUser',
          {
            input: "position",
            value
          }
        )
      }
    },
    inputPhone: {
      get () {
        return this.$store.getters.getUser.attributes['phone']
      },
      set (value) {
        this.$store.commit('updateUser',
          {
            input: "phone",
            value
          }
        )
      }
    },
    inputEmail: {
      get () {
        return this.$store.getters.getUser.attributes['email']
      },
      set (value) {
        this.$store.commit('updateUser',
          {
            input: "email",
            value
          }
        )
      }
    },
  },
  methods:{
    saveUser(){
      let user = this.$store.getters.getUser
      HTTP.patch(`users/${user.id}`,
        JSON.stringify({
          "data": {
              "type": "users",
              "id": user.id,
              "attributes": user.attributes
          }
        }))
      .then(response => {
        this.success = true
      })
    }
  }
}
</script>

<style lang="css">
</style>
