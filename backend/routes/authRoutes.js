const express =  require('express');
const authRoutes = express.Router();
const {registerUser, loginUser, adminLogin, logoutUser} = require('../controlles/authController.js')
authRoutes.post('/register',registerUser);
authRoutes.post('/login',loginUser);
authRoutes.post('/admin/login',adminLogin);
authRoutes.post('/logout' , logoutUser);


module.exports =  authRoutes