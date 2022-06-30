'use strict'

const expess = require("express")
const transaksiController = require("../controllers/transaksi.controller")
const router = new expess.Router()

router.post("/", transaksiController.add)
router.post("/detail", transaksiController.addDetail)
router.get("/", transaksiController.getTransaksi)
router.get("/:id", transaksiController.getId)
router.delete("/:id_transaksi", transaksiController.delete)
router.put("/:id_transaksi", transaksiController.update)
router.put("/bayar/:id_transaksi", transaksiController.bayar)

module.exports = router;