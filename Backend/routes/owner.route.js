'use strict'

const expess = require("express")
const ownerController = require("../controllers/owner.controller")
const router = new expess.Router()


router.get("/", ownerController.getAll)
router.get("/:id", ownerController.getId)
router.post("/", ownerController.add)
router.put("/:id", ownerController.update)
router.post("/login", ownerController.login)
router.post("/find", ownerController.find)
router.delete("/:id", ownerController.delete)
router.put("/", ownerController.updatePw)
router.put("/update/:id_owner", ownerController.pwOwner) 

module.exports = router;