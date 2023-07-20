import  Express  from "express";
const router = Express.Router()
import User from "../model/userSchema.js";
import bcrypt from "bcryptjs"


router.get('/user', async (req, res) =>{
    const userList = await User.find()

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);

})

//get single user
router.get('/user/:id', async(req,res)=>{
    const user = await User.findById(req.params.id).select('-password');

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    } 
    res.status(200).send(user);
})

//register a user
router.post('/registerUser', async (req,res)=>{
    const Hash = await bcrypt.hash(req.body.password,10)

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        contact:req.body.contact,
        ward:req.body.ward,
        address:req.body.address,
        password:Hash


    })
    user = await user.save();

    if(!user)
        {   
             return res.status(400).send('the user cannot be created!')
        }
    res.send(user);
})


//login
router.post('/login',async (req,res) => {
    const user = await User.findOne({email:req.body.email});
    
    
   if(!user){
    return res.status(400).send('User not found')
   } 

   if(user && bcrypt.compareSync(req.body.password,user.password )) {
   
         return res.status(200).send({user});
   }
   else{
    return res.status(400).send('password is wrong')
   }
     
})

//edit user
router.put('/user/:id',async (req, res)=> {
    const category = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email:req.body.email,
            contact:req.body.contact,
            ward:req.body.ward,
            address:req.body.address
        },
        { new: true}
    )

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
})
export default router
