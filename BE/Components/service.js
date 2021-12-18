const users = require("./Model");
const { OAuth2Client } = require("google-auth-library")
const client = new OAuth2Client("434076698303-4vqlab3auqoeeclm3tkm2c2ki7cpghvp.apps.googleusercontent.com");
const jwt = require("jsonwebtoken");

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
    if(!(addFriend.loginUser == addFriend.username)){
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
    }
    else{
      return "You can't add Yourself"
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
      audience: "434076698303-4vqlab3auqoeeclm3tkm2c2ki7cpghvp.apps.googleusercontent.com"
    })
   const payload = ticket.getPayload();
   const {email, email_verified, name, given_name, family_name, picture} = payload;
    if(email_verified){
      await users.User.findOne({email}).exec(async (err,user)=>{
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
            const new22= await newUser.save((err,data)=>{
                // console.log(err)
                // console.log(data)
                if(err){
                  res.send(err.message)
                }
                else{
                 const token = jwt.sign({username: email },"thisismysecretkey",{ expiresIn: "1d"})
                 console.log({token,data})
                res.cookie("jwt",token,{
                  maxAge: 60000,
                  httpOnly: true
                })
                res.send({token, data,isNewUserCreated: true});
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
        // console.log(postData)
      try{
            const ownerOfPost = await users.User.findOne({username: user})
            const newPost = await users.Posts.create({message, user: ownerOfPost})
            for(const key in postImages){
            const response = await newPost.updateOne({ $push: { imagesUrl: postImages[key]}});
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