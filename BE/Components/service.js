const users = require("./Model");

module.exports.getAllSuggestions = async () => {
  try {
    const response = await users.User.find({});
    return response;
  } catch (error) {
    return error.message;
  }
};

module.exports.createUser = async (data) => {
  try {
    const response = await users.User.create({ ...data });
    return response;
  } catch (error) {
    return error.message;
  }
};

module.exports.getAllFriends = async (loginUser) => {
  try {
    //find the login user
    const response = await users.User.findOne({
      username: loginUser.loginUser,
    });
    //getting all friends of login user

    const result = await response.friends.map(async (user) => {
      var new2 = await users.User.findOne({ username: user });
      return new2;
    });
    return Promise.all(result).then((res) => {
      var Myfriends = [];
      for (const key in res) {
        Myfriends.push(res[key]);
      }
      return Myfriends;
    });
  } catch (err) {
    return "Not Found";
  }
};

module.exports.addFriend = async (addFriend) => {
  try {
    //find the login user
    const loginUser = await users.User.findOne({
      username: addFriend.loginUser,
    });
    //now add the added friend username to loginuser friend array's
    if (!loginUser.friends.includes(addFriend.username)) {
      const response = await loginUser.updateOne({
        $push: { friends: addFriend.username},
      });
      return response;
    } else {
      return "User already added";
    }
  } catch (error) {
    return error.message;
  }
};
module.exports.removeFriend = async (removeFriend) => {
  try {
    //find the login user
    const loginUser = await users.User.findOne({
      username: removeFriend.loginUser,
    });
    //now remove the added friend username from loginuser friend array's
    if (loginUser.friends.includes(removeFriend.username)) {
      const response = await loginUser.updateOne({
        $pull: { friends: removeFriend.username },
      });
      return response;
    } else {
      return "User not found";
    }
  } catch (error) {
    return error.message;
  }
};
