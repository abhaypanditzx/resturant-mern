const jwt = require('jsonwebtoken');
 const   protect = (req,res,next)=>{
const token = req.cookies.token;
if(!token){
    return res.status(401).json({msg:"not authorized",success:false})
}
try{
const decoded =  jwt.verify(token,process.env.SECRET_KEY);
    req.user =  decoded;
    next()
}
catch(err){
    return res.status(401).json({msg:"invalid token",success:false})

}
 }



 const adminOnly =(req,res,next)=>{
const token  =  req.cookies.token;
if(!token){
    return res.status(401).json({msg:"not authorized",success:false})

}
try{
    const decoded  = jwt.verify(token,process.env.SECRET_KEY);
    req.admin  = decoded;
    if(req.admin.email == process.env.ADMIN_EMAIL ){
        next();
    }
}catch(err){
    return res.status(401).json({msg:"invalid token",succes:false})

}
 }

 module.exports ={protect,adminOnly}