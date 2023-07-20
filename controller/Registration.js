const userSchema = require('../model/userSchema')

const UserRegister = async(req,res)=>{
        const user = await userSchema.create(req.body);
        res.status(200).json({
            success: true,
            // user,
        })
    }
module.exports = UserRegister;