<template>
<div>
    <AppBar />
    <v-container>
        <v-card
            class="mx-auto pa-10"
            max-width="600"
            color="#eeeeee"
        >
            <span v-if="!norequest">
                <p><b class="ma-10">Requests</b></p>
                <smallProfile class="my-1" v-for="requestData in requestsData" :key="requestData.email" :friendData="requestData"/>
            </span>
            <p class="ma-5"><b>Friends</b></p>
            <p v-if="noFriend"> No friend added </p>
            <smallProfile class="my-1" v-for="friendData in friendsData" :key="friendData.email" :friendData="friendData"/>
        </v-card>
    </v-container>
</div>
</template>

<script>
import { mapState } from 'vuex'
import AppBar from '../components/appBar'
import apiServices from '../../service/apiServices'
import smallProfile from '../components/smallProfile'

export default {
name: 'friendList',
components: {
    AppBar,
    smallProfile
  },
data: () => ({
    noFriend: false,
    norequest: false,
    friendsData: null,
    requestsData: null
}),
computed: {
    ...mapState({
        userDetails: (state) => state.userDetails
    })
},
mounted() {

    if (this.userDetails.friends.length === 0) {
        this.noFriend = true
    } else {
        apiServices.getFriendsData(this.userDetails.friends).then((result) => {
            this.friendsData = result.data
        })
    }
    if (this.userDetails.request.length === 0) {
        this.norequest = true
    } else {
        apiServices.getFriendsData(this.userDetails.request).then((result) => {
            this.requestsData = result.data
        })
    }

}
}
</script>

<style lang="scss" scoped>

</style>