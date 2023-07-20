const express = require('express')
const router = express.Router();
const UserRegister = require('../controller/Registration.js')

require('../db/conn')
const User = require('../model/userSchema');

router.get('/', (req,res) => {
    res.send(`Hello world from the server router js`);
});



router.post("/register",UserRegister);


module.exports = router;
