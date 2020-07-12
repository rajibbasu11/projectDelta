import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const state = () => ({
    isUserLogin: false,
    userDetails: {
        firstName: '',
        lastName: '',
        userId: '',
        email: '',
        mobileNumber: '',
        Dob: '',
        gender: '',
        token: '',
        friends: [],
        request: [],
        pendingRequest: []
    }
})

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    plugins: [createPersistedState()]
})

export default store