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
        type: String, required: true, unique: true
    },
    friends: {
        type: Array,
        default: []
    }
},{ timestamps: true })

module.exports.User = mongoose.model("ALLUSER", allUsersSchema)
