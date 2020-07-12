<template>
  <div>
    <v-app-bar
      color="blue darken-1 accent-4"
      dense
      dark
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title style="cursor: pointer;" @click="() => {
        this.$router.push('/').catch(err => {})
        count = 0 
        }">Project Delta</v-toolbar-title>

      <v-spacer></v-spacer>

      
        <v-btn icon @click=" () => this.$router.push('/friendList').catch(err => {})">
          <v-badge
        :content="count"
        :value="count"
        color="green"
        overlap
      >
        <v-icon>mdi-account-multiple</v-icon>
      </v-badge>
      </v-btn>
      <v-btn icon @click="() => {this.$router.push('/search').catch(err => {})}">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
          >
            <v-list-item-title @click="logout">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AppBar',
  data: () => ({
    count: 0
  }),
  computed: {
    ...mapState({
      userDetails: state => state.userDetails
    })
  },
  mounted () {
    this.count = this.userDetails.request.length
  },
  methods: {
    logout() {
      this.$store.dispatch( 'removeUserDetails')
      this.$store.dispatch('setLoginState', false).then(() => {
        this.$router.push('/login')
      })
    }
  }

}
</script>

<style>

</style>