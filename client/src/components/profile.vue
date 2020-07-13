<template>
  <div>
    <appBar v-if="!myProfile" />
    <div class="container">
            <v-card
              class="mx-auto profilearea pa-10"
              max-width="800"
              color="#eeeeee"
          >
        <v-row>
              <v-col cols="4">
                  <!-- <img src="../assets/profile.png"> -->
                  <div class="imageArea" :style="prifileImage" />
              </v-col>
              <v-col cols="8">
                  <v-card
                  class="mx-auto detailsArea"
                  > 
                  <v-row>
                    <v-col cols="8">  
                      <p class="text-capitalize"><b>Name: </b> {{user.firstName}} {{user.lastName}}</p>
                      <p><b>Email: </b>{{user.email}}</p>
                      <p><b>Phone No: </b> {{user.mobileNumber}}</p>
                      <p><b>Date of Birth: </b> {{prettyDate(user.Dob)}}</p>
                    </v-col>
                    <v-col v-if="!myProfile" cols="4" style="position: relative;">
                      <v-btn v-if="!isFriend && !isInRequest && !isPendingRequest" @click="addFriend(user.userId)" small color="#8BC34A" dark class="addFriend" >Add Friend</v-btn>
                      <v-btn v-if="isFriend" @click="removeFriend(user.userId)" small color="#8BC34A" dark class="addFriend" >Remove Friend</v-btn>
                      <v-btn v-if="isInRequest" @click.native="acceptRequest(user.userId)" small color="#8BC34A" dark class="addFriend" >accept request</v-btn>
                      <v-btn v-if="isInRequest" @click="rejectRequest(user.userId)" small color="#f44336" dark class="reject" >reject request</v-btn>
                      <p v-if="isPendingRequest">Request send</p> 
                    </v-col>
                  </v-row>
                  </v-card>
              </v-col>
        </v-row>
              </v-card>

          <v-card v-if="!myProfile"
                      class="mx-auto pa-5 ma-5"
                      max-width="600"
                      color="#eeeeee"
                  >
            <p class="ma-5"><b>Mutual Friends</b></p>
            <p v-if="meutualFriends.length === 0"> No mutual friend </p>
            <smallProfile class="my-1" v-for="meutualFriend in meutualFriends" :key="meutualFriend.email" :friendData="meutualFriend"/>
          </v-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import apiServices from '../../service/apiServices'
import appBar from './appBar' 
import { bus } from '../main'
import smallProfile from './smallProfile'

export default {
name: 'profile',
data: () => ({
    user: {},
    prifileImage: '',
    meutualFriends: [],
    
}),
components: {
  appBar,
  smallProfile
},
props: {
    myProfile: {
        type: Boolean,
        default: false
    }
},
computed: {
  ...mapState({
    userDetails: state => state.userDetails
  }),
  isFriend () {
    return this.userDetails.friends.indexOf(this.$route.params.userId) > -1 ? true : false
  }
  ,
  isInRequest () {
    return this.userDetails.request.indexOf(this.$route.params.userId) > -1 ? true : false
  },
  isPendingRequest () {
    return this.userDetails.pendingRequest.indexOf(this.$route.params.userId) > -1 ? true : false
  }
},
mounted() {
  if (this.myProfile) {
    this.user = this.userDetails
  } else {
    // if (this.$route.params.userId === this.userDetails.userId) {
    //   this.$router.push('/')
    // }
    // if (this.userDetails.friends.indexOf(this.$route.params.userId) > -1) {
    //   this.isFriend = true
    // } else if (this.userDetails.request.indexOf(this.$route.params.userId) > -1) {
    //   this.isInRequest = true
    // } else if (this.userDetails.pendingRequest.indexOf(this.$route.params.userId) > -1) {
    //   this.isPendingRequest = true
    // }

    apiServices.getFriendsDataById(this.$route.params.userId).then(data => {
      this.user = data.data
      let meutualFriendsId = this.userDetails.friends.filter(x => this.user.friends.includes(x));
      apiServices.getFriendsData(meutualFriendsId).then((result) => {
            this.meutualFriends = result.data
        })
    })
  }
    if(this.user.gender === 'Female') {
        this.prifileImage = 'background-position-x: -190px;'
    }
},
methods: {
    removeFriend (userId) {
      let myId = this.userDetails.userId
      let friendId = userId
      apiServices.removeFriend({myId, friendId}).then(({ data }) => {
        this.$store.dispatch( 'removeFriend' , userId).then( () => {
          bus.$emit('notification', data.msg)
        })
      })
    },
    addFriend (userId) {
      let myId = this.userDetails.userId
      let friendId = userId
      apiServices.addFriend({myId, friendId}).then(({ data }) => {
        this.$store.dispatch( 'addFriend' , friendId).then( () => {
          bus.$emit('notification', data.msg)
        })
      })
    },
    acceptRequest (userId) {
      let myId = this.userDetails.userId
      let friendId = userId
      apiServices.acceptRequest({myId, friendId}).then(({ data }) => {
        this.$store.dispatch( 'acceptRequest' , friendId).then( () => {
          bus.$emit('notification', data.msg)
        })
      })
    },
    rejectRequest (userId) {
      let myId = this.userDetails.userId
      let friendId = userId
      apiServices.rejectRequest({myId, friendId}).then(({ data }) => {
        this.$store.dispatch( 'rejectRequest' , friendId).then( () => {
          bus.$emit('notification', data.msg)
        })
      })
    },
    prettyDate (dateString) {
    var date = new Date(dateString)
    var d = date.getDate()
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var m = monthNames[date.getMonth()]
    var y = date.getFullYear()
    var StEdRdTh = '';
    var lastone = Number(d.toString().split('').pop());
    if (d === 11 || d === 12 || d === 13) {
      StEdRdTh = 'th';
    } else {
      if (lastone === 1) {
        StEdRdTh = 'st';
      } else if (lastone === 2) {
        StEdRdTh = 'nd';
      } else if (lastone === 3) {
        StEdRdTh = 'rd';
      } else {
        StEdRdTh = 'th';
      }
    }
      return d + StEdRdTh + ' ' + m + ' ' + y
  },
}
}
</script>

<style lang="scss" scoped>
    .imageArea {
        background-image: url("../assets/profile.png");
        height: 200px;
        border-radius: 50% !important;
        background-repeat: no-repeat;
        background-size: cover;
        border: 6px solid #434544;
        background-position-y: 2px;
        width: 200px;
        }
    .detailsArea {
        padding: 25px;
        text-align: left;
        padding-bottom: 5px;
    }
    .addFriend{
      position: absolute;
      right: 25px;
      bottom: 5px;
    }
    .reject{
      position: absolute;
      right: 25px;
      bottom: 40px;
    }
</style>