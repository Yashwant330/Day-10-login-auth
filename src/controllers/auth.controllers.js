const UserModel = require("../models/user.models")

let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')

let registerController = async(req,res)=>{
    try {

        let {name,email,password,mobile} = req.body

        if(!email || !password ||  !mobile)
            return res.status(400).json({
        message:"All fields are required"
    })




    let isExisted = await UserModel.findOne({
        email
    })

    if(isExisted)
        return res.status(409).json({
       message:"This Email is already registered"
        })

          //  hash password---

  let hashPass = await bcrypt.hash(password,10)

    let newUser = await UserModel.create({
        name,
        email,
        password:hashPass,
        mobile,
    })
    
    //authorization--


     let token = jwt.sign({id:newUser._id},
        process.env.JWT_SECRET,
        {
            expiresIn:"1h",
        }
     )

     console.log("token",token);
     

     res.cookie("token",token)

     return res.status(201).json({
        message:"User created Sucessfully",
        newUser
     })


    } catch (error) {
       return res.status(500).json({
        message:"Internal server error",
        error
       })
        
    }
}

module.exports={registerController}