const db = require("../config/db");





// ADD MAINTENANCE
const addMaintenance = async (req, res) => {

  try {

    const {
      asset_id,
      issue_description,
      maintenance_status,
      technician_name,
      remarks,
    } = req.body;





    await db.query(
      `
      INSERT INTO maintenance
      (
        asset_id,
        issue_description,
        maintenance_status,
        technician_name,
        maintenance_date,
        remarks
      )
      VALUES (?, ?, ?, ?, NOW(), ?)
      `,
      [
        asset_id,
        issue_description,
        maintenance_status,
        technician_name,
        remarks,
      ]
    );





    res.status(201).json({
      message: "Maintenance Added Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed To Add Maintenance",
    });
  }
};







// GET MAINTENANCE
const getMaintenanceByAsset = async (req, res) => {

  try {

    const { assetId } = req.params;





    const [maintenance] = await db.query(
      `
      SELECT * FROM maintenance
      WHERE asset_id = ?
      ORDER BY id DESC
      `,
      [assetId]
    );





    res.status(200).json(maintenance);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed To Fetch Maintenance",
    });
  }
};

const deleteMaintenance = async (req, res) => {

  try {

    const { id } = req.params;





    await db.query(
      `
      DELETE FROM maintenance
      WHERE id = ?
      `,
      [id]
    );





    res.status(200).json({
      message: "Maintenance Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed To Delete Maintenance",
    });
  }
};





module.exports = {
  addMaintenance,
  getMaintenanceByAsset,
  deleteMaintenance,
};