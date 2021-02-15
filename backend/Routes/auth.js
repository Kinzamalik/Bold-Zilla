const router = require('express').Router();
const User = require('../Model/User');
const bcrypt =  require('bcryptjs');
const jwt =  require('jsonwebtoken');
const {
    registerValidation,
    loginValidation
} = require('../validation');

// VALIDATION

// const Joi = require('@hapi/joi');

// const schema = {
//     name: Joi.string()
//     .min(6)
//     .required(),
//     email: Joi.string()
//     .min(6)
//     .required()
//     .email(),
//     password: Joi.string()
//     .min(6)
//     .required()

// }


router.post('/register', async (req, res) => {

    // LETS VALIDATE THE DATA BEFORE WE A USER
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    
    // Checking if the user is already exist in the database
    const  emailExist =  await User.findOne({email:req.body.email})
    if(emailExist)return res.status(400).send('Email already exists')


    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =  await bcrypt.hash(req.body.password,salt)
    
    
    
    
    // create a new user

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {

        const savedUser = await user.save();
        res.send({user:user._id});
    } catch (err) {
        res.send(400).send(err)
    }
});


// LOGIN

router.post('/login',async (req,res)=>{
       // LETS VALIDATE THE DATA BEFORE WE A USER
       const {error} = loginValidation(req.body);
       if (error) return res.status(400).send(error.details[0].message);
       
       // Checking if the email exista
       const  user =  await User.findOne({email:req.body.email});
       if(!user)return res.status(400).send('Email is not found');

    //    Password is Correct
    const validPass =  await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Invalid password');
    
    
    // Create and asign a token
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth_token',token).send(token);  

});





module.exports = router;