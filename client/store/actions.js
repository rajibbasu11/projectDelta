
const actions = {

    // set loginf true or false
    async setLoginState (context, loginStatus) {
            await context.commit('SET_LOGIN_STATUS', loginStatus)
    },

    // UPDATE FRIENDS AND REQUEST FOR LOGGEDIN USER
    async updateFriendsAndRequest (context, friendsAndRequest) {
        await context.commit('UPDATE_FRIENDS_AND_REQUEST', friendsAndRequest)
    },

    // set user details after login
    async setUserDetails (context, userDetails) {
        await context.commit('SET_USER_DETAILS', userDetails)
    },

    async removeFriend (context, Id) {
        await context.commit('REMOVE_FRIEND', Id)
    },

    async addFriend (context, Id) {
        await context.commit('ADD_FRIEND', Id)
    },

    async acceptRequest (context, Id) {
        await context.commit('ACCEPT_REQUEST', Id)
    },

    async rejectRequest (context, Id) {
        await context.commit('REJECT_REQUEST', Id)
    },

    // remove user details after logout
    async removeUserDetails (context) {
        await context.commit('REMOVE_USER_DETAILS')
    }
} 

export default actions