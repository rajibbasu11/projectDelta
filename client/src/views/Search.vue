<template>
    <div>
        <AppBar />
        <v-card
        class="mx-auto pa-5 ma-5"
        max-width="600"
        color="#eeeeee"
        >
            <v-text-field
            solo
            label="search frends..."
            v-model="searchText"
            append-icon="mdi-magnify"
            @click:append="search"
            @keyup.enter="search"
          ></v-text-field>
            <p v-if="noresult"> No user Found... </p>
            <v-text-field v-show="showLoader" color="success" loading disabled></v-text-field>
            <smallProfile class="my-1" v-for="friendData in friendsData" :key="friendData.email" :friendData="friendData"/>

        </v-card>
    </div>
</template>

<script>
import AppBar from '../components/appBar'
import apiServices from '../../service/apiServices'
import smallProfile from '../components/smallProfile'

export default {
name: 'Search',
data: () => ({
    searchText: null,
    friendsData: null,
    showLoader: false,
    noresult: false
}),
components: {
    AppBar,
    smallProfile
  },
  methods: {
      search() {
          this.noresult = false
          this.showLoader = true
          apiServices.getSearchData(this.searchText).then( ({ data }) => {
              if ( data.length === 0 ) {
                  this.noresult = true
              }
              this.friendsData = data
              this.showLoader = false
              this.searchText = null
          })
      }
  }
}
</script>

<style>

</style>