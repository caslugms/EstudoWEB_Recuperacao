const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getAll, getById, create, update, remove } = require("../controllers/entityController");

router.get("/", auth, getAll);
router.get("/:id", auth, getById);
router.post("/", auth, create);
router.put("/:id", auth, update);
router.delete("/:id", auth, remove);

module.exports = router;
