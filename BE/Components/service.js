const users = require("./Model");
const { OAuth2Client } = require("google-auth-library")
const client = new OAuth2Client("539501532126-g3dj34ijo223has1jhjgkff4ofjjk0rt.apps.googleusercontent.com");
const jwt = require("jsonwebtoken");
const { mongo, Types } = require("mongoose");

module.exports.getAllSuggestions = async (dataFromClient) => {
  const { loginUser } = dataFromClient;
  console.log(loginUser)
  try {
    const loginUserObject = await users.User.findOne({username: loginUser}); // 
    const allUsersArray = await users.User.find({});
    console.log(loginUserObject)

    const newAllSuggestions = allUsersArray.filter(user => {
      if(user.username !== loginUserObject.username){
        if(loginUserObject.friends.length !== 0){
          for(const key in loginUserObject.friends){
              if(user.username !== loginUserObject.friends[key]){
                return user
              }
            }
        }
        else{
          return user
        }
      }
    }
    )
    return newAllSuggestions;
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

module.exports.addFriend = async (dataFromClient) => {
  const { loginUser, friendUser } = dataFromClient;
  try {
 
    const loginUserObject = await users.User.findOne({username: loginUser})
    const friendUserObject = await users.User.findOne({username: friendUser})
    // console.log("login and frienduser",loginUserObject,friendUserObject)
    if(!loginUserObject.friends.includes(friendUser) && !friendUserObject.notifications.friendsRequest.includes(loginUser)){
        const response  = await friendUserObject.updateOne({$push : {"notifications.friendsRequest": loginUser}});
        const res = await users.User.findOne({username: friendUser})
        // console.log("output",res)
        return {user: res, message: "Friend Request Sent"}
    }
    else{
      return "Already Friend"
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
    //find the friend user
    const friendUser = await users.User.findOne({
      username: removeFriend.username,
    });
    //now remove the added friend username from loginuser friend array's
    if (loginUser.friends.includes(removeFriend.username)) {
      await loginUser.updateOne({
        $pull: { friends: removeFriend.username },
      });
      await friendUser.updateOne({
        $pull: { friends: removeFriend.loginUser },
      });

      const loginUserResponse = await users.User.findOne({
        username: removeFriend.loginUser,
      });
      //find the friend user
      const FriendUserResponse = await users.User.findOne({
        username: removeFriend.username,
      });
      return {loginUserResponse, FriendUserResponse};
    } else {
      return "Already removed";
    }
  } catch (error) {
    return error.message;
  }
};

module.exports.googleLogin = async (loginData, res) =>{
  const {tokenId, profileObj: { imageUrl}} = loginData;

  // console.log(tokenId)
  //step-2: Verify the token ... Reference: https://developers.google.com/identity/sign-in/web/backend-auth
  //google-auh-library will verify that the token receive from client side is same as the token use in backend.
  try{
   const ticket =  await client.verifyIdToken({
      idToken: tokenId,
      audience: "539501532126-g3dj34ijo223has1jhjgkff4ofjjk0rt.apps.googleusercontent.com"
    })
   const payload = ticket.getPayload();
   const {email, email_verified, name, given_name, family_name, picture} = payload;
    if(email_verified){
      await users.User.findOne({username: email}).exec(async (err,user)=>{
        if(err){
          res.send({error: "Error"});
        }
        else{
          if(user){
            const {_id, email, name } = user;
            console.log("yes user exits")
            //returning the jwt with existing user data
            //here we have to use "jsonwebtoken" npm module to generate the json web token.
            //Refernce- https://www.npmjs.com/package/jsonwebtoken

            const token = jwt.sign({_id: _id },"thisismysecretkey",{ expiresIn: "1d"})
            console.log({token,user})   //returning the existing user with a JWT
            res.cookie("jwt",token,{
              maxAge: 60000,
              httpOnly: true
            })
            res.send({token,user,isNewUserCreated: false})
          }
          else{
            console.log("create new user")
              const newUser = await new users.User({name, username: email, firstName: given_name, lastName: family_name, imageUrl: picture});
              // console.log(newUser)
            const new22= await newUser.save((err,user)=>{
                // console.log(err)
                // console.log(user)
                if(err){
                  res.send(err.message)
                }
                else{
                 const token = jwt.sign({username: email },"thisismysecretkey",{ expiresIn: "1d"})
                //  console.log({token,user})
                res.cookie("jwt",token,{
                  maxAge: 3600000,
                  httpOnly: true
                })
                res.send({token, user,isNewUserCreated: true});
                }
              })
          }
        }
      })
    }
  } 
  catch(err){
    res.send(err.message)
  }
}

module.exports.createPost =async (postData)=>{
        const {message, user, postImages} = postData;
      try{
            const ownerOfPost = await users.User.findOne({username: user})
            const newPost = await users.Posts.create({message, user: ownerOfPost})
            if(postImages.length !== 0){
              for(const key in postImages){
                  const response = await newPost.updateOne({ $push: { imagesUrl: {url: postImages[key]}}});
                }
              }
            else {
                const response = await newPost.updateOne({ $push: { imagesUrl: {url: ""}}});
              }
          const returnPost = await users.Posts.findById(newPost._id)
          return returnPost;
      }
      catch(error){
        return error.message;
      }
}
module.exports.getAllPosts = async (dataReceiveFromClient) => {
  const {username, page } = dataReceiveFromClient;
  const friendsAllPosts = []
  const integerNumberOfPage = parseInt(page)
  const limit = 3;
  const firstIndex = (integerNumberOfPage-1)*limit;
  const lastIndex = integerNumberOfPage*limit;

  try{

    const user = await users.User.findOne({username: username})
    const userAllPosts = await users.Posts.find({"user.username" : username})

    for(const key in user.friends){      
      const result = await users.Posts.find({"user.username": user.friends[key]})
      friendsAllPosts.push(...result)
    }
    const AllPosts = userAllPosts.concat(friendsAllPosts)
    //for pagination
    const returningAllPosts = AllPosts.slice(firstIndex,lastIndex)

    return returningAllPosts;

  }catch(err){
    return err.message
  }

}

module.exports.postReaction = async (dataFromClient) =>{
  const { reaction,postId, user} = dataFromClient;
  try{
    const post = await users.Posts.findById(postId)
    // console.log(post)
    if(reaction === "like"){
      console.log("hii this is starting for like")
        const res = await post.updateOne({$push: {"postReactions.likes" : user}})
        const updatedpost = await users.Posts.findById(postId);
        const totallikes = await updatedpost.postReactions.likes.length
        console.log(totallikes)
        return {updatedpost, totallikes}
    }
    if(reaction === "unlike"){
      console.log("hii this is starting for unlike")
        const response = await post.updateOne({$pull : {"postReactions.likes": user}});
        const updatedpost = await users.Posts.findById(postId);
        const totallikes = await updatedpost.postReactions.likes.length
        console.log(totallikes)
        return {updatedpost, totallikes}
    }
     if(reaction === "dislike"){
      console.log("hii this is starting for dislike")
        const res = await post.updateOne({$push: {"postReactions.dislikes" : user}})
        const updatedpost = await users.Posts.findById(postId);
        const totalDislikes = await updatedpost.postReactions.dislikes.length
        console.log(totalDislikes)
        return {updatedpost, totalDislikes}
    }
    if(reaction === "unDislike"){
      console.log("hii this is starting for unDislike")
        const response = await post.updateOne({$pull : {"postReactions.dislikes": user}});
        const updatedpost = await users.Posts.findById(postId);
        const totalDislikes = await updatedpost.postReactions.dislikes.length
        console.log(totalDislikes)
        return {updatedpost, totalDislikes}
    }
  }
  catch(err){
    return err.message
  }
}

module.exports.postComment =async (dataFromClient)=>{
    const {message, postId, user} = dataFromClient;
    try{
      const ownerOfComment = await users.User.findOne({username: user});
      const currentPost = await users.Posts.findByIdAndUpdate(postId,{$push: {comments: {message,ownerOfComment, _id: new Types.ObjectId()}}});
      const updatedPost = await users.Posts.findById(postId);
      return updatedPost
    }
    catch(error){
      return error.message
    }
    
}

module.exports.getPostAllComments = async (dataFromClient) => {
    const {postId} = dataFromClient;
    const allComments = await users.Posts.findById(postId);
    return allComments.comments;
}

module.exports.getPostLikesDislikesCommentsValues = async (dataFromClient)=>{
  const {postId} = dataFromClient
  const currentPost = await users.Posts.findById(postId)
  const totalLikes = currentPost.postReactions.likes.length;
  const totalDislikes = currentPost.postReactions.dislikes.length;
  const totalComments = currentPost.comments.length;
  return {totalLikes,totalDislikes,totalComments};
}

module.exports.getAllNotifications = async (dataFromClient) => {
  const { loginUser } = dataFromClient;
  // console.log("loginuser",loginUser)
  const AllNotifications = {
    allFriendRequests : []
  };

  //find the login user object
  const loginUserObject = await users.User.findOne({username: loginUser});
  // console.log(loginUserObject)

  //Get all friends requests notifications
  for(const key in loginUserObject.notifications.friendsRequest){
    console.log(loginUserObject.notifications.friendsRequest[key])
    const result = await users.User.findOne({username: loginUserObject.notifications.friendsRequest[key]});
    AllNotifications.allFriendRequests.push(result);
  }
  // console.log("allnotifications",AllNotifications)
  return AllNotifications;
}

module.exports.acceptFriendRequest =async (dataFromClient) => {
  const { loginUser, friendWhoSentTheFriendRequest : friendUser} = dataFromClient;
  //loginUser = JO Friend Request accept kr rha hai
  //friendUser = JISNE Friend Request Beji hai
  //because this api is for accepting friend request
  try{
    const WhoAcceptingTheFriendRequest = await users.User.findOne({username: loginUser});
    const whoSendTheFriendRequest = await users.User.findOne({username: friendUser})
  
    await WhoAcceptingTheFriendRequest.updateOne({$pull : {"notifications.friendsRequest" : friendUser}})
    await WhoAcceptingTheFriendRequest.updateOne({$push: {friends: friendUser}})
    await whoSendTheFriendRequest.updateOne({$push:{friends: loginUser}})
    
    const loginPerson = await users.User.findOne({username: loginUser});
    const friendRequestSendPerson = await users.User.findOne({username: friendUser})
  
    return {loginPerson, friendRequestSendPerson};
  }
  catch(err){
    return {error: err}
  }
  
}
module.exports.getLoginUserAllInformation = async (dataFromClient) => {
  const { loginUser } = dataFromClient;

  const loginUserObject = await users.User.findOne({username: loginUser});
  const postCounts = await users.Posts.find({"user.username": loginUser}).count();
  console.log(loginUserObject, postCounts)
  return {loginUserObject,postCounts};
}
module.exports.getProfileData = async (dataFromClient) => {
  const { profileUserUsername, loginUserUsername } = dataFromClient;
  console.log(profileUserUsername)
  const userObject = await users.User.findOne({username : profileUserUsername})
  if(profileUserUsername === loginUserUsername){
    return {userObject , isAccountOwner: true};
  }
  else{
    return {userObject , isAccountOwner: false};
  }
}

module.exports.updateProfileData = async (dataFromClient)=>{
  const {loginUser , coverImageLink, task} = dataFromClient;
  console.log(loginUser, coverImageLink, task);
  //for cover image
  if(task === "coverImageUpload"){
    const result = await users.User.findOneAndUpdate({username: loginUser},{$set : {coverImageUrl : coverImageLink}},{new: true})
    console.log(result)
    return {coverImageLink: result.coverImageUrl};
  }
  if(task ==="profileImageUpload"){
    const result = await users.User.findOneAndUpdate({username: loginUser},{$set : {imageUrl : coverImageLink}},{new: true})
    return {profileImageLink: result.imageUrl}
  }
  
}