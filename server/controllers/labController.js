const db = require("../config/db");







// CREATE LAB
exports.createLab = async (req, res) => {

  try {

    const {
      lab_name,
      lab_code,
      room_number,
      department,
      description,
      extra_details,
    } = req.body;





    const query = `

      INSERT INTO labs
      (
        lab_name,
        lab_code,
        room_number,
        department,
        description,
        extra_details
      )

      VALUES (?, ?, ?, ?, ?, ?)

    `;





    await db.query(

      query,

      [
        lab_name,
        lab_code,
        room_number,
        department,
        description,
        JSON.stringify(extra_details),
      ]
    );





    return res.status(201).json({
      message: "Lab Created Successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Failed To Create Lab",
    });
  }
};









// GET ALL LABS
exports.getAllLabs = async (req, res) => {

  try {

    const query = `

      SELECT
        labs.*,
        COUNT(assets.id) AS asset_count

      FROM labs

      LEFT JOIN assets
      ON labs.id = assets.lab_id

      GROUP BY labs.id

      ORDER BY labs.id DESC

    `;





    const [result] = await db.query(query);





    return res.status(200).json(result);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Failed To Fetch Labs",
    });
  }
};









// GET SINGLE LAB
exports.getLabById = async (req, res) => {

  try {

    const { id } = req.params;





    const [result] = await db.query(

      "SELECT * FROM labs WHERE id = ?",

      [id]
    );





    if (result.length === 0) {

      return res.status(404).json({
        message: "Lab Not Found",
      });
    }





    return res.status(200).json(result[0]);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Failed To Fetch Lab",
    });
  }
};









// DELETE LAB
exports.deleteLab = async (req, res) => {

  try {

    const { id } = req.params;





    await db.query(

      "DELETE FROM labs WHERE id = ?",

      [id]
    );





    return res.status(200).json({
      message: "Lab Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Failed To Delete Lab",
    });
  }
};

// UPDATE LAB
exports.updateLab = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      lab_name,
      lab_code,
      room_number,
      department,
      description,
      extra_details,
    } = req.body;





    const query = `

      UPDATE labs

      SET
        lab_name = ?,
        lab_code = ?,
        room_number = ?,
        department = ?,
        description = ?,
        extra_details = ?

      WHERE id = ?

    `;





    await db.query(
      query,
      [
        lab_name,
        lab_code,
        room_number,
        department,
        description,
        JSON.stringify(extra_details),
        id,
      ]
    );





    return res.status(200).json({
      message: "Lab Updated Successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Failed To Update Lab",
    });
  }
};