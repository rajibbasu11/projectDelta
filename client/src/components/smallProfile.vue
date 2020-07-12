<template>
  <v-card
            class="mx-auto pa-2"
            max-width="400"
        >
    <v-row>
        <v-col cols="3">
            <div class="imageArea" :style="imageStyle"/>
        </v-col>
        <v-col cols="5">
            <div class="textArea">
                <p class="name mb-0 text-capitalize">{{ friendData.name }}</p>
                <p class="email mb-0">{{ friendData.email }}</p>
                <p class="phone mb-0">{{ friendData.mobileNumber }}</p>
            </div>
        </v-col>
        <v-col cols="4" class="pt-5" style="position: relative;">
            <v-btn 
                small
                dark
                color="#4caf50"
                class="mb-2 viewBtn"
                @click="() => {this.$router.push(`/friendList/${friendData.userId}`)}"
                > 
                View 
            </v-btn>
            <!-- <v-btn x-small dark color="#4caf50" right> Remove </v-btn> -->
        </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
name: 'smallProfile',
data: () => ({
    imageStyle: ''
}),
props: {
    friendData: {
        type: Object,
        required: true
    }
},
mounted() {
    if(this.friendData.gender === 'Female') {
        this.imageStyle = 'background-position-x: -68px'
    } 
}
}
</script>

<style lang="scss" scoped>
.imageArea {
            background-image: url(/img/profile.14fa49ae.png);
            height: 70px;
            background-repeat: no-repeat;
            background-size: cover;
            border: 2px solid #434544;
            width: 70px;
            float: right;
            background-position-y: 2px;
            border-radius: 5px;
        }
.textArea {
    text-align: left;
}
.name {
    font-weight: 700;
    padding-top: 4px;
}
.email, .phone {
    font-size: 12px;
}
.viewBtn{
    position: absolute;
    right: 25px;
    bottom: 5px;
}
</style>