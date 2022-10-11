require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB (){
    try{
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log('connected');
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDB;