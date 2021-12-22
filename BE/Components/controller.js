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
module.exports.createPost = async (req, res) => {
    const response = await users.createPost(req.body);
    res.send(JSON.stringify(response))
}
module.exports.getAllPosts = async (req, res) => {
    const response = await users.getAllPosts(req.body);
    res.send(JSON.stringify(response))
}
module.exports.postReaction = async (req, res)=>{
    const response  = await users.postReaction(req.body)
    res.send(JSON.stringify(response))
}
module.exports.postComment = async (req, res)=>{
    const response = await users.postComment(req.body)
    res.send(JSON.stringify(response))
}
module.exports.getPostAllComments = async (req, res)=>{
    const response = await users.getPostAllComments(req.body)
    res.send(JSON.stringify(response))
}   
module.exports.getPostLikesDislikesCommentsValues = async(req, res)=>{
    // console.log(req.body)
    const response = await users.getPostLikesDislikesCommentsValues(req.body)
    res.send(JSON.stringify(response))
    // console.log(response)
}


