const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    console.log(req.body)
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = await User.create({
            username: req.body.username,
            password: hashedPassword
        });
        if(user){
            res.status(201).json({
                username: user.username
            })
        }else{
            res.status(400),json({message: 'invalid user data'})
        }
    }
    catch(err){
        res.status(500).json({message: err.message})
        console.log(err.message)
    }
    

}
const login = async (req, res) => {
    const {username, password} = req.body;
    console.log(username, password)
    const user = await User.findOne({username: username})

    if(user && (await bcrypt.compare(password, user.password)))
    {
        res.status(200).json({
            username: user.username,
            token: generateToken(user._id),
        })
    }
    else{
        res.status(400).json({message: 'invlaid password or user name'})
    }
    
}
const me = async(req, res) => {
    try{
        const username = req.user.username;
        const user = await User.find({username: username})
        res.status(200).json({
            username: user.username
        })
    }
    catch(err)
    {
        res.status(401).json({message: '/me unathorized'})
        console.log(err.message)
    }
    
    
}

//Private functions
const generateToken = (id) => {
    return jwt.sign({id}, process.env.SECRET, {
        expiresIn: '30m'
    })
}
module.exports = {register, login, me};