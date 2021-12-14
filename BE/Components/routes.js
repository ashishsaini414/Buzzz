const router = require("express").Router()
const users = require("./controller")

router.get("/getAllSuggestions",users.getAllSuggestions)
router.post("/getAllFriends",users.getAllFriends)
router.post("/createUser",users.createUser)
router.post("/addFriend",users.addFriend)
router.post("/removeFriend",users.removeFriend)

module.exports = router;