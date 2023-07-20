import mongoose from 'mongoose'




const complainSchema = new mongoose.Schema({
    name:{
        type: String,
        
    },
    email: {
        type:String,
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
    // complain
    complained:{
        type:Boolean
    } ,
    complainReason:{
        type:String
    },
    complainType:{
        type:String
    },
    complainDate:{
        type:Date
    },
    userId:{
        type:String
    },
    //collected and not collected
    collected:{
        type:Boolean,
       
    },
    collectedAndNotCollectedDate:{
        type:Date
    },
    //not attended
    notAttended:{
        type:Boolean,
       
    },
    notAttendedDate:{
        type:Date
    },
    //suggestions
    suggested:{
        type:Boolean
    },
    suggestion:{
        type:String
    },
    

})




const Complain = mongoose.model("complain",complainSchema);

export default Complain