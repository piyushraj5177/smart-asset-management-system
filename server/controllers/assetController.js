const db = require("../config/db");



// CREATE ASSET
exports.createAsset = async (req, res) => {

  try {

    const {
      lab_id,
      asset_name,
      asset_code,
      brand,
      model,
      serial_number,
      processor,
      ram,
      storage,
      purchase_date,
      asset_condition,
      asset_status,
      extra_details,
    } = req.body;





    const query = `

      INSERT INTO assets
      (
        lab_id,
        asset_name,
        asset_code,
        brand,
        model,
        serial_number,
        processor,
        ram,
        storage,
        purchase_date,
        asset_condition,
        asset_status,
        extra_details
      )

      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

    `;





    await db.query(

      query,

      [
        lab_id,
        asset_name,
        asset_code,
        brand,
        model,
        serial_number,
        processor,
        ram,
        storage,
        purchase_date,
        asset_condition,
        asset_status,
        JSON.stringify(extra_details || []),
      ]
    );





    return res.status(201).json({
      message: "Asset Added Successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Database Error",
      error,
    });
  }
};











// GET ASSETS BY LAB
exports.getAssetsByLab = async (req, res) => {

  try {

    const { labId } = req.params;





    const query = `

      SELECT * FROM assets

      WHERE lab_id = ?

      ORDER BY id DESC

    `;





    const [result] = await db.query(
      query,
      [labId]
    );





    // PARSE EXTRA DETAILS
    const updatedResult = result.map((asset) => ({
      ...asset,
      extra_details: asset.extra_details
        ? JSON.parse(asset.extra_details)
        : [],
    }));





    return res.status(200).json(updatedResult);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Failed To Fetch Assets",
    });
  }
};











// GET SINGLE ASSET
exports.getSingleAsset = async (req, res) => {

  try {

    const { id } = req.params;





    const query = `

      SELECT * FROM assets

      WHERE id = ?

    `;





    const [result] = await db.query(
      query,
      [id]
    );





    if (!result[0]) {

      return res.status(404).json({
        message: "Asset Not Found",
      });
    }





    const asset = {
      ...result[0],
      extra_details: result[0].extra_details
        ? JSON.parse(result[0].extra_details)
        : [],
    };





    return res.status(200).json(asset);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Failed To Fetch Asset",
    });
  }
};











// DELETE ASSET
exports.deleteAsset = async (req, res) => {

  try {

    const { id } = req.params;





    const query = `

      DELETE FROM assets

      WHERE id = ?

    `;





    await db.query(query, [id]);





    return res.status(200).json({
      message: "Asset Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Failed To Delete Asset",
    });
  }
};











// UPDATE ASSET
exports.updateAsset = async (req, res) => {

  try {

    const { id } = req.params;





    const {
      asset_name,
      brand,
      model,
      processor,
      ram,
      storage,
      asset_condition,
      asset_status,
      extra_details,
    } = req.body;





    const query = `

      UPDATE assets

      SET

        asset_name = ?,
        brand = ?,
        model = ?,
        processor = ?,
        ram = ?,
        storage = ?,
        asset_condition = ?,
        asset_status = ?,
        extra_details = ?

      WHERE id = ?

    `;





    await db.query(

      query,

      [
        asset_name,
        brand,
        model,
        processor,
        ram,
        storage,
        asset_condition,
        asset_status,
        JSON.stringify(extra_details || []),
        id,
      ]
    );





    return res.status(200).json({
      message: "Asset Updated Successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Failed To Update Asset",
      error,
    });
  }
};