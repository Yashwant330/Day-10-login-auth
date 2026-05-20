let express = require('express')
let jwt = require('jsonwebtoken');
const UserModel = require('../models/user.models');
let router = express.Router()

router.get('/',async(req,res,next)=>{

let token = req.cookies.id_card;

if(!token)
return res.status(404).json({

    message:"Token not found"
})

let decode = jwt.verify(token ,process.env.JWT_SECRET)

if(!decode)
    return res.status(401).json({
message:"unauthorized user"
})

console.log("decode->",decode);

let user = await UserModel.findById(decode.id)
if(!user)
     return res.status(401).json({
message:"unauthorized user"
})

next()

},(req,res)=>{
    return res.send("ok mai insta ke andar aagya")
})

module.exports=router