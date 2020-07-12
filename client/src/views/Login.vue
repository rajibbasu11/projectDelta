<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    label="Email/Phone Number"
                    name="userName"
                    v-model="userName"
                    prepend-icon="mdi-account"
                    type="text"
                    :rules="[v => !!v || 'Enter email/phone number']"
                    required
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    v-model="passWord"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="[v => !!v || 'Enter password']"
                    required
                    @keyup.enter="login"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <p class="pr-10">Not an user?<a href="/register"> register here </a></p>
                <v-btn @click="login" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import apiServices from '../../service/apiServices'
import { bus } from '../main'

export default {
name: 'login',
data () {
    return {
        userName: null,
        passWord: null,
        snackbar: false,
        msgtext: null
    }
},
methods: {
    login () {
      if(this.$refs.form.validate()) {
        var data = {
            userName: this.userName,
            passWord: this.passWord
        }
        apiServices.login(data).then( (result) => {
            if(result.data.valid) {
                var userDetails = result.data.userDetails
                userDetails.token = result.data.PermissionDetails.token
                userDetails.userId = result.data.PermissionDetails.userId
                this.$store.dispatch( 'setUserDetails' , userDetails)
                this.$store.dispatch('setLoginState', true).then(() => {
                bus.$emit('notification', result.data.msg)
                this.$router.push('/')            
            })
            } else {
              bus.$emit('notification', result.data.msg)
            }

        })
      }
       
    }
}
}
</script>

<style>

</style>