"use strict";

const expess = require("express")
const memberController = require("../controllers/member.controller")
const router = new expess.Router();

router.get("/", memberController.getAll);
router.get("/:id", memberController.getId);
router.post("/", memberController.add);
router.put("/:id", memberController.update);
router.delete("/:id", memberController.delete);
router.post("/find", memberController.find);

module.exports = router;