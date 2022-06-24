'use strict'

const expess = require("express")
const userController = require("../controllers/user.controller")
const router = new expess.Router()

router.get("/", userController.getAll)
router.get("/:id", userController.getId)
router.post("/", userController.add)
router.put("/:id", userController.update)
router.post("/login", userController.login)
router.post("/find", userController.find)
router.delete("/:id", userController.delete)
router.put("/", userController.updatePw)
router.put("/update/:id_user", userController.pwUser)

module.exports = router;