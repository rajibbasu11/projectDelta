import * as axios from 'axios'
const config = require('../config/config.json')
const apiURL = config.apiKey[process.env.NODE_ENV]

export default {
//   user login
    login (data) {
    const url = `${apiURL}/userlogin`
    return axios.post(url, {
        userName: data.userName,
        passWord: data.passWord
    },
    {
        'Content-Type': 'application/json'
    })
},
// new user register
 register (data) {
    const url = `${apiURL}/registerUser`
    return axios.post(url, data,
    {
        'Content-Type': 'application/json'
    })
},
getFriendsData (data) {
    const url = `${apiURL}/getFriendsData`
    return axios.post(url, data,
        {
            'Content-Type': 'application/json'
        })
},

getFriendsDataById (id) {
    const url = `${apiURL}/getFriendsDataById/${id}`
    return axios.get(url)
},

getUpdatedFriendsAndRequest (id) {
    const url = `${apiURL}/getUpdatedFriendsAndRequest/${id}`
    return axios.get(url)
},

removeFriend(data) {
    const url = `${apiURL}/removeFriend`
    return axios.post(url, data,
        {
            'Content-Type': 'application/json'
        })
},

addFriend(data) {
    const url = `${apiURL}/addFriend`
    return axios.post(url, data,
        {
            'Content-Type': 'application/json'
        })
},

acceptRequest(data) {
    const url = `${apiURL}/acceptRequest`
    return axios.post(url, data,
        {
            'Content-Type': 'application/json'
        })
},

rejectRequest(data) {
    const url = `${apiURL}/rejectRequest`
    return axios.post(url, data,
        {
            'Content-Type': 'application/json'
        })
},

getSearchData (searchText) {
    const url = `${apiURL}/getSearchData/${searchText}`
    return axios.get(url)
}

}