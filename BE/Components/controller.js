const users = require("./service")

module.exports.getAllUsers = async (req, res) => {
   const response =  await users.getAllUsers()
    res.send(response)
}
module.exports.updateMyFriends = async(req, res) => {
    const response  = await users.updateMyFriends(req.body)
    res.send(response)
}
module.exports.getAllFriends = async(req, res) => {
    const response  = await users.getAllFriends()
    res.send(response)
}
module.exports.removeFriend = async(req, res) => {
    const response  = await users.removeFriend(req.body)
    res.send(response)
}


