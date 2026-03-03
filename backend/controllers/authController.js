const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//generate jwt token

const generateToken = (res, payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
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
      return res.status(404).json({ msg: "user does not exist" });
    }    
    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password,
    );
    
    
    if (!comparePassword) {
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
    console.log("admin login route hit ");
    
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        msg: "Please fill all the fields",
        success: false,
      });
    }
    const existingAdmin = await User.findOne({email})
    if(!existingAdmin) {
      return res.status(401).json({msg:"admin does not exist!",success: false});
    }
    console.log(existingAdmin.password)
 const isPasswordMatch = await  bcrypt.compare(password, existingAdmin.password);
    if (!isPasswordMatch) {
      console.log("password does not match oppsie")
      return res.json({ msg: "Invalid credentials", success: false });
    }
    console.log("password  does match");

    const token = jwt.sign({ 
     id: existingAdmin._id,
      role: existingAdmin.isAdmin ? "admin" : "user",
    }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,

    });

    return res.status(200).json({
      success: true,
      msg: "Admin logged in successfully",

      admin: {
        id: existingAdmin._id,
        email: existingAdmin.email,
      },
    });
  } catch (error) {
    console.log(error.msg);
    return res.json({ msg: "Internal server error", success: false });
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

const isAuth = async(req, res) => {
  try {
    const {id} =  req.user;
    const user =  await User.findById(id).select("-password");
     res.json({success:true,user});
  } catch (err) {
    console.error(err);
        res.json({ msg: "internal server error", success: false });

  }

}

const isAdmin  = async(req,res)=>{
  try {
    const {id} =  req.admin;
    const admin =  await  User.findById(id).select("-password");
     res.status(200).json({success:true,admin});
  }
  catch(err){
        res.json({ msg: "internal server error", success: false });

  }
}

const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ msg: "Admin logged out  successfully", success: true });
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
  isAuth,
  isAdmin,
  logoutAdmin,
};
