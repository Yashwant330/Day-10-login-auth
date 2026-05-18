require("dotenv").config()

let app = require('./src/app')
const connectDB = require("./src/config/database")

connectDB()

let port = process.env.PORT || 4000

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})