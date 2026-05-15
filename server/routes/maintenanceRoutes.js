const express = require("express");

const router = express.Router();

const {
  addMaintenance,
  getMaintenanceByAsset,
  deleteMaintenance,
} = require("../controllers/maintenanceController");




router.post(
  "/add",
  addMaintenance
);

router.get(
  "/:assetId",
  getMaintenanceByAsset
);

router.delete(
  "/delete/:id",
  deleteMaintenance
);
module.exports = router;