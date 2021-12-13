const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: {
        type: String, required: true
    },
    lastName: {
        type: String, required: true
    },
    name:{
        type: String, required: true
    },
    email: {
        type: String, required: true
    }
})

const friendSchema = mongoose.Schema({
    firstName: {
        type: String, required: true
    },
    lastName: {
        type: String, required: true
    },
    name:{
        type: String, required: true
    },
    email: {
        type: String, required: true
    }
},)

module.exports.User = mongoose.model("MYUSER", userSchema)
module.exports.Myfriend = mongoose.model("MYFRIEND", friendSchema)


// module.exports = User;