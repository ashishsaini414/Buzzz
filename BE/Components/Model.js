const mongoose = require("mongoose")

const allUsersSchema = mongoose.Schema({
    firstName: {
        type: String, required: true
    },
    lastName: {
        type: String, required: true
    },
    name:{
        type: String, required: true
    },
    username: {
        type: String, required: true
    },
    imageUrl:{
        type: String, default: ""
    },
    friends: {
        type: Array,
        default: []
    }
},{ timestamps: true })

const postsSchema = mongoose.Schema({
    message:{
        type: String, required: true
    },
    user:{
        type: Object, required: true
    },
    imagesUrl:{
        type: Array,
        default: []
    },
    likes:{
        type: Array,
        default: []
    }
},{ timestamps: true})

module.exports.Posts = mongoose.model("POST",postsSchema);
module.exports.User = mongoose.model("USER", allUsersSchema);
