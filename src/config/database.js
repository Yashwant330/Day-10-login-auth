const {default: mongoose} = require('mongoose')

let connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
          console.log("mongoodb conected");
            
    } catch (error) {
        console.log("error in connecting db",error);
        
    }
}

module.exports=connectDB