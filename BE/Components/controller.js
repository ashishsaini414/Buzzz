const users = require("./service")

module.exports.getAllSuggestions = async (req, res) => {
   const response =  await users.getAllSuggestions()
    res.send(response)
}
module.exports.createUser = async (req, res) => {
    const response =  await users.createUser(req.body)
     res.send(response)
 }
module.exports.getAllFriends = async(req, res) => {
    const response  = await users.getAllFriends(req.body)
    res.send(response)
}
module.exports.removeFriend = async(req, res) => {
    const response  = await users.removeFriend(req.body)
    // console.log(response)
    res.send(JSON.stringify(response))
}

module.exports.addFriend = async(req, res) => {
    const response  = await users.addFriend(req.body)
    console.log(response)
    res.send(JSON.stringify(response))
}
module.exports.googleLogin = async (req, res)=>{
    const response = await users.googleLogin(req.body,res);
}


