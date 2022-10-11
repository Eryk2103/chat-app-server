const jwt = require('jsonwebtoken');
const User = require('./models/userModel');

const auth = async(req, res, next) => {
        try{
            const token = req.headers.authentication.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }
        catch(err){
            res.status(401).json({message: err.message})
            console.log(err.message)
        }
    
}
module.exports = auth;