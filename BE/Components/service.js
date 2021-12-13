const users = require("./Model")

module.exports.getAllUsers = async () => {
    const response = await users.User.find({})
    return response;
}

module.exports.updateMyFriends = async (newAddFriend) => {
    const response = await users.Myfriend.create({...newAddFriend});
    const res = await users.User.findByIdAndDelete(newAddFriend._id)
    const fetchFriends = await users.Myfriend.find({})
    return fetchFriends;
}

module.exports.getAllFriends = async () => {
    const response = await users.Myfriend.find({})
    return response;
}


module.exports.removeFriend = async (removeFriend) => {
    const response = await users.Myfriend.findByIdAndDelete(removeFriend._id)
    const res = await users.User.create({...removeFriend})
    return response;
}
