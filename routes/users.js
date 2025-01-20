const express = require('express')
const router = express.Router()
const usersControllers = require("../controllers/usersControllers")



router
  .route("/")
  .post(usersControllers.createNewUser)
  .get(usersControllers.getAllUsers)
  .patch(usersControllers.updateUser)
  .delete(usersControllers.deleteUser)








module.exports = router;