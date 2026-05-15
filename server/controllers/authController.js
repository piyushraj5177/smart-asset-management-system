const db = require("../config/db");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");



// REGISTER USER
exports.registerUser = async (req, res) => {

  try {

    const {
      full_name,
      email,
      password,
      confirm_password,
      mobile,
      dob,
      role_id,
    } = req.body;



    // CHECK PASSWORD MATCH
    if (password !== confirm_password) {

      return res.status(400).json({
        message: "Passwords do not match",
      });
    }



    // CHECK USER EXISTS
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );



    if (existingUser.length > 0) {

      return res.status(400).json({
        message: "User already exists",
      });
    }



    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);



    // INSERT USER
    await db.query(

      `
      INSERT INTO users
      (
        full_name,
        email,
        password,
        mobile,
        dob,
        role_id
      )

      VALUES (?, ?, ?, ?, ?, ?)
      `,

      [
        full_name,
        email,
        hashedPassword,
        mobile,
        dob,
        role_id,
      ]
    );



    return res.status(201).json({
      message: "User Registered Successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};



// LOGIN USER
exports.loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;



    // FIND USER
    const [result] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );



    if (result.length === 0) {

      return res.status(404).json({
        message: "User not found",
      });
    }



    const user = result[0];



    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );



    if (!isMatch) {

      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }



    // GENERATE TOKEN
    const token = jwt.sign(

      {
        id: user.id,
        role_id: user.role_id,
      },

      process.env.JWT_SECRET ||
      "mysecretkey",

      {
        expiresIn: "1d",
      }
    );



    return res.status(200).json({

      message: "Login Successful",

      token,

      user,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};



// FORGOT PASSWORD
// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {

  try {

    const {
      email,
      mobile,
      dob,
      new_password,
      confirm_password,
    } = req.body;



    // CHECK PASSWORD MATCH
    if (
      new_password !== confirm_password
    ) {

      return res.status(400).json({
        message:
          "Passwords do not match",
      });
    }



    // VERIFY USER
    const [result] = await db.query(

      `SELECT * FROM users
       WHERE email = ?
       AND mobile = ?
       AND dob = ?`,

      [
        email,
        mobile,
        dob,
      ]
    );



    if (result.length === 0) {

      return res.status(404).json({
        message:
          "User Details Incorrect",
      });
    }



    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        new_password,
        10
      );



    // UPDATE PASSWORD
    await db.query(

      `UPDATE users
       SET password = ?
       WHERE email = ?`,

      [
        hashedPassword,
        email,
      ]
    );



    return res.status(200).json({
      message:
        "Password Updated Successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};