"use strict"

const express = require("express")
const outletController = require("../controllers/outlet.controller")
const router = new express.Router()

router.get("/", outletController.getAll)
router.get("/:id", outletController.getId)
router.post("/", outletController.add)
router.put("/:id", outletController.update)
router.delete("/:id", outletController.delete)
router.post("/find", outletController.find)

module.exports = router;