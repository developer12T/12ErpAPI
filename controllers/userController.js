const UserAnt = require("../models/user");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/index");

exports.index = (req, res, next) => {};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    //check ว่ามีอีเมล์นี้ไม่ระบบหรือไม่
    const user = await UserAnt.findAll({
      attributes: { exclude: ["id"] },
      where: {
        Col_LoginName: username,
      },
    });

    if (!user) {
      const error = new Error("Not Found User");
      error.statusCode = 404;
      throw error;
    }
    // return res.status(200).json(user);

    //ตรวจสอบรหัสผ่านว่าตรงกันหรือไม่ ถ้าไม่ตรง (false) ให้โยน error ออกไป
    const dbPassword = user[0].Col_PWord;
    const hashedPassword = crypto
      .createHash("md5")
      .update(password)
      .digest("hex");
    // const isValid = await user.checkPassword(password);

    if (!(dbPassword === hashedPassword)) {
      const error = new Error("Password is Incorrect");
      error.statusCode = 401;
      throw error;
    }

    //สร้าง token
    const token = jwt.sign(
      { username: user[0].Col_LoginName, role: user[0].Col_DeptInfo },
      JWT_SECRET,
      {
        expiresIn: "5 days",
      }
    );
    res.json({
      token,
      idUser: user[0].Col_ECard,
      fullname: user[0].Col_Name,
      department: user[0].Col_o_JobTitle,
      departmentDescrip: user[0].Col_DeptInfo,
    });

    // //decode วันหมดอายุ
    const expires_in = jwt.decode(token);
    return res.status(200).json({
      access_token: token,
      expires_in: expires_in.exp,
      token_type: "Bearer",
    });
  } catch (error) {
    next(error);
  }
};

//get profile
// exports.me = (req, res, next) => {
//   const { _id, name, email, role } = req.user;

//   return res.status(200).json({
//     user: {
//       id: _id,
//       name: name,
//       email: email,
//       role: role,
//     },
//   });
// };
