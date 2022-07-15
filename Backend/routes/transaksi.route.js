'use strict'

const expess = require("express")
const transaksiController = require("../controllers/transaksi.controller")
const router = new expess.Router()

router.post("/", transaksiController.add)
router.post("/detail", transaksiController.addDetail)
router.get("/", transaksiController.getTransaksi)
router.get("/detail/:id_transaksi", transaksiController.getDetail)
router.get("/laporan", transaksiController.laporan)
router.get("/:id_transaksi", transaksiController.getId)
router.delete("/:id_transaksi", transaksiController.delete)
router.put("/:id_transaksi", transaksiController.update)


module.exports = router;