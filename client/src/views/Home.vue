<template>
  <div class="home">
    <AppBar />
    <Profile :myProfile="true" />
  </div>
</template>

<script>
// @ is an alias to /src
import AppBar from '../components/appBar'
import Profile from '../components/profile'
import apiServices from '../../service/apiServices'

import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    AppBar,
    Profile
  },
  computed: {
    ...mapState({
      isUserLogin: (state) => state.isUserLogin,
      userDetails: state => state.userDetails
    })
  },
  mounted() {
    if (!this.isUserLogin) {
      this.$router.push('/login')
    } else {
      apiServices.getUpdatedFriendsAndRequest(this.userDetails.userId).then( ({ data }) => {
        this.$store.dispatch( 'updateFriendsAndRequest' , data)
      })
    }
  }
}
</script>
