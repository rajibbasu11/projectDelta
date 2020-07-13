const { Users } = require('../models/user');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const saltRounds = 10;
const config = require('../config/config');
const JWTsecret = config.JWTsecret;
const jwt = require('jsonwebtoken');

async function GenerateHash(pass) {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(pass, saltRounds, function(err, hash) {
          if (err) reject(err)
          resolve(hash)
        });
      })
      return hashedPassword
};

function ensureAuthentication(userId) {
    var userObject = {
      'userId': userId,
    };
    userObject.token = jwt.sign(userObject, JWTsecret);
    userObject.permission = true
    return userObject
  }

exports.UserLogin = (req, res) => {
    let userName = req.body.userName
    let passWord = req.body.passWord
    let query = {'mobileNumber': userName}

    if (isNaN (userName)){
        query = {'email': userName}
    }

    Users.findOne( query, (err, userData) => {
        if(err) {
            res.status(200).send({
                    'valid' : false,
                    'msg': "Network issue, tray again!"
            })
        } else {
            if(userData == null) {
                res.status(200).send({
                        'valid' : false,
                        'msg': "Invalid email/phone number"
                })
            } else {
                bcrypt.compare(passWord, userData.hash, function(err, result) {
                    if(result) {
                        let userDetails = {
                            'firstName' : userData.firstName,
                            'lastName' : userData.lastName,
                            'email' : userData.email,
                            'mobileNumber' : userData.mobileNumber,
                            'Dob' : userData.Dob,
                            'gender' : userData.gender,
                            'friends' : userData.friends,
                            'request' : userData.request,
                            'pendingRequest' : userData.pendingRequest
                        }
                        res.status(200).send({
                            'valid' : true,
                            'msg' : 'Succefully Logged in!',
                            'userDetails' : userDetails,
                            'PermissionDetails': ensureAuthentication(userData.userId)
                        })
                    } else {
                        res.status(200).send({
                            'valid' : false,
                            'msg': "Wrong Password"
                        })      
                    }
                });
            }
        }
    })

},
exports.UserRegister = async (req, res) => {
   let user = new Users ({
        firstName: req.body.firstName.toLowerCase(),
        lastName: req.body.lastName.toLowerCase(),
        userId: shortid.generate(),
        email: req.body.email,
        mobileNumber: Math.round(req.body.mobileNumber),
        hash: await GenerateHash(req.body.passWord),
        Dob: req.body.Dob,
        gender: req.body.gender 
    })
    user.save((err, result) => {
        if(err) {
            console.log(err)
            res.send('DB opration faild!');
        } else {
            res.send(result);
        }
    })
},

exports.getFriendsData = (req, res) => {
    var friendList = req.body
    Users.find({'userId': {$in : friendList}}, (err, resp) => {
        if(!err) {
                let friendsData = []
                resp.map(friends => {
                    let data = {
                        name : friends.firstName + ' ' + friends.lastName,
                        email : friends.email,
                        mobileNumber : friends.mobileNumber,
                        gender: friends.gender,
                        userId: friends.userId
                    }
                    friendsData.push(data)
                })
                res.status(200).send(friendsData)
        } else {
        }
    })
}

exports.getFriendsDataById = (req, res) => {
    let userId = req.params.userId
    Users.findOne({'userId': userId}, (err, resp) => {
        if(!err) {
            if (resp) {
                let friendData = {
                    firstName : resp.firstName,
                    lastName : resp.lastName,
                    email : resp.email,
                    mobileNumber : resp.mobileNumber,
                    gender: resp.gender,
                    Dob: resp.Dob,
                    userId: resp.userId,
                    friends: resp.friends
                }
            res.status(200).send(friendData)
            } else {
                res.status(200).send({
                    'msg' : 'No data found'
                })
            }
        } else {
        }
    })
}

exports.getUpdatedFriendsAndRequest = (req, res) => {
    let userId = req.params.userId
    Users.findOne({'userId': userId}, (err, result) => {
        if(!err) {
            res.status(200).send({
                'friends': result.friends,
                'request' : result.request,
                'pendingRequest' : result.pendingRequest
            })   
        }
    })
}


exports.removeFriend = (req, res) => {
    let myId = req.body.myId
    let friendId = req.body.friendId
    Users.updateOne({'userId': myId}, {$pull: { friends: friendId}}, (err, result) => {
        if(result.nModified == 1) {
            Users.updateOne({'userId': friendId}, {$pull: { friends: myId}}, (err) => {
                res.status(200).send({
                    'msg' : 'Friend Removed'
                })
            })
        }
    })
}

exports.addFriend = (req, res) => {
    let myId = req.body.myId
    let friendId = req.body.friendId
    Users.updateOne({'userId': myId}, {$push: { pendingRequest: friendId}}, (err, result) => {
        if(result.nModified == 1) {
            Users.updateOne({'userId': friendId}, {$push: { request: myId}}, (err) => {
                res.status(200).send({
                    'msg' : 'Request send'
                })
            })
        }
    })
}

exports.acceptRequest = (req, res) => {
    let myId = req.body.myId
    let friendId = req.body.friendId
    Users.updateOne({'userId': myId}, {$push: { friends: friendId }, $pull: { request: friendId }}, (err, result) => {
        if(result.nModified == 1) {
            Users.updateOne({'userId': friendId}, {$push: { friends: myId }, $pull: { pendingRequest: myId }}, (err) => {
                if (!err) {
                    res.status(200).send({
                        'msg' : 'Request Accepted'
                    })
                }
            })
        }
    })
}

exports.rejectRequest = (req, res) => {
    let myId = req.body.myId
    let friendId = req.body.friendId
    Users.updateOne({'userId': myId}, {$pull: { request: friendId}}, (err, result) => {
        if(result.nModified == 1) {
            Users.updateOne({'userId': friendId}, {$pull: { pendingRequest: myId}}, (err) => {
                res.status(200).send({
                    'msg' : 'Request rejected'
                })
            })
        }
    })
}

exports.getSearchData = (req, res) => {
    let searchText = req.params.searchText.toLowerCase()
    let query = {'mobileNumber': searchText}
    if (isNaN (searchText)){
        query = {$or: [{ "firstName": searchText}, { "lastName" : searchText }, {'email': searchText}]} 
    }
    Users.find(query, (err, result) => {
        if(!err) {
            let searchData = []
                result.map( data => {
                    searchData.push({
                        name : data.firstName + ' ' + data.lastName,
                        email : data.email,
                        mobileNumber : data.mobileNumber,
                        gender: data.gender,
                        userId: data.userId
                    })
                })
            res.status(200).send(searchData)   
        }
    })
}