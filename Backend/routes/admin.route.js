'use strict'

const expess = require("express")
const adminController = require("../controllers/admin.controller")
const router = new expess.Router()

router.get("/", adminController.getAll)
router.get("/:id", adminController.getId)
router.post("/", adminController.add)
router.put("/:id", adminController.update)
router.post("/login", adminController.login)
router.post("/find", adminController.find)
router.delete("/:id", adminController.delete)
router.put("/", adminController.updatePw)
router.put("/update/:id_admin", adminController.pwAdmin)

module.exports = router;