const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const messageCtrl = require("../controllers/messages");
const multer = require("../middleware/multer-config");

router.post("/", auth,multer, messageCtrl.createMessage);
router.get("/all/:id", messageCtrl.findAllMessagesForOne);
router.get("/:id", messageCtrl.findOneMessage);
router.get("/", messageCtrl.findAllMessages);
router.delete("/", auth, messageCtrl.deleteMessage);

module.exports = router;