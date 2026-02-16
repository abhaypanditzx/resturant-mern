const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//generate jwt token

const generateToken = (res, payload) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return token;
};

const registerUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
      return res.json({ msg: "please fill all the fields", success: false });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ msg: "user already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: name,
      password: hashedPassword,
      email: email,
    });
    await user.save();
    return res.json({ msg: "user registered successfully", success: true,user:{email:user.email,name:user.name}});
  } catch (err) {
    console.log(err);
    return res.json({ msg: "internal server error", success: false });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('login route hit by client')
    console.log('data from client: '+ email + " "+ password);

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({ msg: "user does not exist" });
    }
    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!comparePassword) {
      console.log("incorrect password")
      return res.status(401).json({ msg: "incorrect password" });
    }

    generateToken(res, {
      id: existingUser._id,
      role: existingUser.isAdmin ? "admin" : "user",
    });
    res.json({
      msg: "user logged in successfully",
      success: true,
      user: { name: existingUser.name, email: existingUser.email },
    });
    console.log("user logged in")
  } catch (err) {
    console.error("LOGIN ERROR 👉", err);
    return res.json({ msg: "internal server error", success: false });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password || !email) {
      return res.json({ msg: "please fill all the fields", success: false });
    }
    console.log(`email:${email} password:${password}`);

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email !== adminEmail || password !== adminPassword) {
      return res.json({ msg: "invalid credentials", success: false });
    }
    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ msg: "admin logged in successfully", success: true });
  } catch (err) {
    console.error("LOGIN ERROR 👉", err);
    return res.json({ msg: "internal server error", success: false });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ msg: "user logged out  successfully", success: true });
  } catch (err) {
    return res.json({ msg: "internal server error", success: false });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "user not found", success: false });
    }
    res.json(user);
  } catch (err) {
    return res.json({ msg: "internal server error", success: false });
  }
};

module.exports = {
  loginUser,
  adminLogin,
  registerUser,
  logoutUser,
  getProfile,
};
