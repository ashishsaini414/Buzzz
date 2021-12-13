const router = require("express").Router()
const users = require("./controller")

router.get("/getAllUsers",users.getAllUsers)
router.post("/updateMyFriends",users.updateMyFriends)
router.get("/getAllFriends",users.getAllFriends)
router.post("/removeFriend",users.removeFriend)


module.exports = router;