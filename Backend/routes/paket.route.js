"use strict"

const express = require("express")
const paketController = require("../controllers/paket.controller")
const router = new express.Router()

router.get("/", paketController.getAll)
router.get("/:id", paketController.getId)
router.post("/", paketController.add)
router.put("/:id", paketController.update)
router.delete("/:id", paketController.delete)
router.post("/find", paketController.find)

module.exports = router;