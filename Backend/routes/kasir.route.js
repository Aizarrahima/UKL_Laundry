'use strict'

const expess = require("express")
const kasirController = require("../controllers/kasir.controller")
const router = new expess.Router()

router.get("/", kasirController.getAll)
router.get("/:id", kasirController.getId)
router.post("/", kasirController.add)
router.put("/:id", kasirController.update)
router.post("/login", kasirController.login)
router.post("/find", kasirController.find)
router.delete("/:id", kasirController.delete)
router.put("/", kasirController.updatePw)
router.put("/update/:id_kasir", kasirController.pwKasir) 

module.exports = router;