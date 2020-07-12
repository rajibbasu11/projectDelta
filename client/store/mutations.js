
const mutations = {

    ['SET_LOGIN_STATUS'] (state, payload) {
        state.isUserLogin = payload
    },

    ['SET_USER_DETAILS'] (state, payload) {
        state.userDetails.firstName = payload.firstName,
        state.userDetails.lastName = payload.lastName,
        state.userDetails.userId = payload.userId,
        state.userDetails.email = payload.email,
        state.userDetails.mobileNumber = payload.mobileNumber,
        state.userDetails.Dob = payload.Dob,
        state.userDetails.gender = payload.gender,
        state.userDetails.token = payload.token,
        state.userDetails.friends = payload.friends,
        state.userDetails.pendingRequest = payload.pendingRequest,
        state.userDetails.request = payload.request
    },

    ['REMOVE_USER_DETAILS'] (state) {
        state.userDetails.firstName = '',
        state.userDetails.lastName = '',
        state.userDetails.userId = '',
        state.userDetails.email = '',
        state.userDetails.mobileNumber = '',
        state.userDetails.Dob = '',
        state.userDetails.gender = '',
        state.userDetails.token = ''
        state.userDetails.pendingRequest = [],
        state.userDetails.friends = [],
        state.userDetails.request = []
    },

    ['UPDATE_FRIENDS_AND_REQUEST'] (state, payload) {
        state.userDetails.friends = payload.friends,
        state.userDetails.request = payload.request,
        state.userDetails.pendingRequest = payload.pendingRequest
    },

    ['REMOVE_FRIEND'] (state, payload) {
        state.userDetails.friends.splice(state.userDetails.friends.indexOf(payload), 1)
    },

    ['ADD_FRIEND'] (state, payload) {
        state.userDetails.pendingRequest.push(payload)
    },

    ['ACCEPT_REQUEST'] (state, payload) {
        state.userDetails.friends.push(payload)
        state.userDetails.request.splice(state.userDetails.request.indexOf(payload), 1)
    },

    ['REJECT_REQUEST'] (state, payload) {
        state.userDetails.request.splice(state.userDetails.request.indexOf(payload), 1)
    }

} 

export default mutations