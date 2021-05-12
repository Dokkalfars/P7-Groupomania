const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.get("/all", userCtrl.findAllUsers);
router.get("/:id", userCtrl.findOneUser);
router.delete("/", auth, userCtrl.deleteOneUser);
router.delete("/:id", auth, userCtrl.deleteMyAccount);

module.exports = router;
