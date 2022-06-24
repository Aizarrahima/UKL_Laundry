'use strict'

const expess = require("express")
const transaksiController = require("../controllers/transaksi.controller")
const router = new expess.Router()

router.post("/", transaksiController.add)
router.post("/", transaksiController.addDetail)
router.get("/", transaksiController.get)
router.get("/:id", transaksiController.getId)
router.delete("/:id", transaksiController.delete)
router.put("/bayar/:id_transaksi", transaksiController.bayar)

module.exports = router;