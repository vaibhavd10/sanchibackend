// import  Express  from "express";
// const router = Express.Router()
// import Complain from "../model/complain.js";

// //Geting all complain
// router.get('/complain', async (req, res) =>{
//     const userList = await Complain.find({complained:true})

//     if(!userList) {
//         res.status(500).json({success: false})
//     }
//     res.send(userList);

// })
// router.get('/complain/:id', async (req, res) =>{
//     const userList = await Complain.find({userId:req.params.id}&&{complained:true})

//     if(!userList) {
//         res.status(500).json({success: false})
//     }
//     res.send(userList);

// })

// //getting single complain

// router.get('/complain/:id', async(req,res)=>{
//     const user = await Complain.findById(req.params.id).select('-password');

//     if(!user) {
//         res.status(500).json({message: 'The user with the given ID was not found.'})
//     }
//     res.status(200).send(user);
// })

// //raising a complain
// router.post('/registercomplain', async (req,res)=>{

//     let user = new Complain({
//         name: req.body.name,
//         email: req.body.email,
//         contact:req.body.contact,
//         ward:req.body.ward,
//         address:req.body.address,
//         complainReason:req.body.complainReason,
//         complainType:req.body.complainType,
//         suggestion:req.body.suggestion,
//         complained:req.body.complained,
//         suggested:req.body.suggested,
//         userId:req.body.userId,
//         complainDate:Date.now()

//     })
//     user = await user.save();

//     if(!user)
//         {
//              return res.status(400).send('the user cannot be created!')
//         }
//     res.send(user);
// })

// //delete a complain
// router.delete('/complain/:id', (req, res)=>{
//     Complain.findByIdAndRemove(req.params.id).then(user =>{
//         if(user) {
//             return res.status(200).json({success: true, message: 'the complain is deleted!'})
//         } else {
//             return res.status(404).json({success: false , message: "complain not found!"})
//         }
//     }).catch(err=>{
//        return res.status(500).json({success: false, error: err})
//     })
// })

// router.get('/suggestion', async (req, res) =>{
//     const userList = await Complain.find({suggested:true})

//     if(!userList) {
//         res.status(500).json({success: false})
//     }
//     res.send(userList);

// })

// //collected and not collected
// router.post('/collectedNotCollected', async (req,res)=>{

//     let user = new Complain({
//         name: req.body.name,
//         email: req.body.email,
//         contact:req.body.contact,
//         ward:req.body.ward,
//         address:req.body.address,
//         collected:req.body.collected,

//         collectedAndNotCollectedDate:Date.now()
//     })
//     user = await user.save();

//     if(!user)
//         {
//              return res.status(400).send('the user cannot be created!')
//         }
//     res.send(user);
// })

// //getting  collected data

// router.get('/collectedNotCollected/collectedData',async(req,res)=>{
//     try {
//         const user = await Complain.find({collected:true})
//         if(!user.length) {
//             res.status(404).json({message: 'Data not found'});
//         } else {
//             res.status(200).json({message: 'Data found', data: user});
//         }
//     } catch(err) {
//         console.log(err);
//         res.status(500).json({message: 'Error retrieving data'});
//     }
// });
// //getting  NOt collected data
// router.get('/collectedNotCollected/notCollectedData',async(req,res)=>{
//     try {
//         const user = await Complain.find({collected:false})
//         if(!user.length) {
//             res.status(404).json({message: 'Data not found'});
//         } else {
//             res.status(200).json({message: 'Data found', data: user});
//         }
//     } catch(err) {
//         console.log(err);
//         res.status(500).json({message: 'Error retrieving data'});
//     }
// });

// export default router
