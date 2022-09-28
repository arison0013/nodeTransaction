const jwt = require("jsonwebtoken");
SECRET_KEY="nodeApi"
const autorize=(req,res,next)=>{
    try{
        // console.log("kahjha")
      var token=req.headers.authorization.split(' ')[1]
      //  console.log(token,"Token")
      var decode=jwt.verify(token,SECRET_KEY);
      req.user= decode;
      next();
    } catch(err){
        res.status(400).json({
            err:'invalid token'
        })
    }
}

module.exports=autorize;