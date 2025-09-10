const express = require("express");
const { requireApiKey } = require("../../src/services/apiKeyAuth");
const c = require("../controllers/notes.controller");
const router = express.Router();

router.use(requireApiKey);
router.get("/", c.getNotes);
router.post("/", c.postNote);
router.patch("/:id", c.patchNote);
router.delete("/:id", c.deleteNote);

module.exports = router;
