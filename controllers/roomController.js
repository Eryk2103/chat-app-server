const Room = require('../models/roomModel');

const createRoom = async (req, res) => {
    try{
        const room = await Room.create({
            name: req.body.name,
            isPublic: req.body.isPublic,
        })
        res.status(200).json(room)
    }
    catch(e)
    {
        res.status(500).json({message: e.message})
    }
    
}
const getRooms = async (req, res) => {
    try{
  
        const rooms = await Room.find();
        res.status(200).json(rooms);
    }
    catch(e){
        res.status(500).json({message: e.message})
    }
    
}
module.exports = {
    createRoom,
    getRooms
}