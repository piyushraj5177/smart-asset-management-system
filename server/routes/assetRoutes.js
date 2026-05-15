const express = require("express");

const {
  createAsset,
  getAssetsByLab,
  getSingleAsset,
  deleteAsset,
  updateAsset,
} = require("../controllers/assetController");

const router = express.Router();


// CREATE ASSET
router.post("/", createAsset);


// DELETE ASSET
router.delete("/:id", deleteAsset);


// UPDATE ASSET
router.put("/:id", updateAsset);


// GET SINGLE ASSET
router.get("/details/:id", getSingleAsset);


// GET ASSETS BY LAB
router.get("/:labId", getAssetsByLab);


module.exports = router;