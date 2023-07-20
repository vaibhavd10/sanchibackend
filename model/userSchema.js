import mongoose from 'mongoose'




const userSchema = new mongoose.Schema({
    name:{
        type: String,
        
    },
    email: {
        type:String,
        unique: true
    },
    contact: {
        type:String,
        
    },
    ward: {
        type:String,
       
    },
    address: {
        type:String,
        
    },
    password: {
        type: String,
        
    },
  
})




const User = mongoose.model("User",userSchema);

export default User