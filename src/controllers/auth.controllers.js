const UserModel = require("../models/user.models")

let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')


// registration
let registerController = async(req,res)=>{
    try {
   
         let {name,email,mobile,password}=req.body;

         if(!email || !mobile ||!password)
            return res.status(400).json({
        message:"All field are required"
    })

    let isExisted = await UserModel.findOne({
        email,
    })

     if(isExisted)
        return res.status(409).json({
        message:"Email already exist"
        })

        let hashPass = await bcrypt.hash(password,10)

        let newUser = await UserModel.create({
            name,email,mobile,password:hashPass
        })
      

        let token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1h'})


        res.cookie("id_card",token)


        return res.status(201).json({
            message:"User registered successfully",
            user:newUser
        })




        
    } catch (error) {
       return res.status(500).json({
        message:"Internal server error",
        error
       })
        
    }
}


//login

let loginController = async(req,res)=>{
    try {
        
      let {email,password}=req.body;

      if(!email || !password)
        return res.status(400).json({
         message:"All fields are required"
        })

    let isExisted = await UserModel.findOne({
        email,
    })
 
     if(!isExisted)
        return res.status('404').json({
       message:"Email not found"
        })
  
        let comparePass = await bcrypt.compare(password,isExisted.password)


        if(!comparePass)
            return res.status(401).json({
         message:"Invalid Credentials"
            })

            let token = jwt.sign({id:isExisted._id},
                process.env.JWT_SECRET,
                {
                expiresIn:"1h"
            })


            res.cookie("id_card",token)

           return res.status(200).json({
            message:"Used loggedin Successfully",
            user:isExisted
           })


    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}



module.exports={registerController,loginController}