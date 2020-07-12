<template>
  <v-app id="app">
    <router-view/>
    <v-snackbar
      v-model="snackbar"
      :right="true"
      :top="true"
    >
      {{ msgtext }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { bus } from './main'

export default {
  data: () => ({
    snackbar: false,
    msgtext: ''
  }),
  mounted() {
    bus.$on('notification', (msg) => {
      this.snackbar = true
      this.msgtext = msg
    })
  }
}
</script>


<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
