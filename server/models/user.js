const mongoose = require('mongoose');

let Users = mongoose.model('Users', {
    firstName: {type:String, unique: false},
    lastName: {type:String, unique: false},
    userId: {type:String, unique: true},
    email: {type:String, unique: true},
    mobileNumber: {type:String, unique: true},
    Dob: {type: Date},
    gender: {type:String, unique: false},
    hash: {type:String, unique: false},
    friends: {type:Array},
    request: {type:Array},
    pendingRequest: {type:Array}
})

module.exports = { Users }