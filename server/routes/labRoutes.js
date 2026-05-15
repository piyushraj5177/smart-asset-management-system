const express = require("express");

const {
  createLab,
  getAllLabs,
  getLabById,
  deleteLab,
  updateLab,
} = require("../controllers/labController");

const router = express.Router();


// CREATE LAB
router.post("/", createLab);


// GET ALL LABS
router.get("/", getAllLabs);


module.exports = router;

// Delete Labs

router.delete(
  "/:id",
  deleteLab
);

// Update Labs
router.put("/:id", updateLab);