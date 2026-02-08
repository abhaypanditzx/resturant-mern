const multer = require("multer");
const path = require('path')



const fileStorage = multer.diskStorage({
  destination: (req,file,cb) =>{
    cb(null,"uploads/")
  },
  filename: (req,file,cb)=>{
    const ext  = path.extname(file.originalname);

    const currentDate =  new Date().toISOString().slice(0,10)
    const uniqueName =  `${currentDate}_${Math.floor(Math.random()*10000)}${ext}`;
    cb(null,uniqueName)
  }
})

const  filter = (req,file,cb)=>{
   if(file.mimetype.startsWith("image/")){
    cb(null,true)
   }else{

     cb(new Error('only image files are allowed'));
    }
}


const upload = multer({ storage:fileStorage  ,fileFilter:filter});

module.exports = upload;
