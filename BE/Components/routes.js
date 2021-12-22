const router = require("express").Router()
const users = require("./controller")

router.get("/getAllSuggestions",users.getAllSuggestions);
router.post("/getAllFriends",users.getAllFriends);
router.post("/createUser",users.createUser);
router.post("/addFriend",users.addFriend);
router.post("/removeFriend",users.removeFriend);
router.post("/googleLogin",users.googleLogin);
router.post("/createPost",users.createPost);
router.post("/getAllPosts", users.getAllPosts);
router.post("/postReaction",users.postReaction);
router.post("/postComment",users.postComment);
router.post("/getPostAllComments",users.getPostAllComments);
router.post("/getPostLikesDislikesCommentsValues",users.getPostLikesDislikesCommentsValues);

module.exports = router;