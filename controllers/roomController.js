const Room = require('../models/roomModel');
const { rawListeners } = require('../models/userModel');

const createRoom = async (req, res) => {
    try{
        if(await roomExists(req.body.name) )
        {
            res.status(400).json({message: 'room with that name already exists'})
        }
        else
        {
            const room = await Room.create({
                name: req.body.name,
            })
            res.status(200).json(room)
        }
        
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
//private
const roomExists = async (roomName) => {
    const room = await Room.find({name: roomName})
    if(room.length > 0)
    {
        return true;
    }
    return false;
}
module.exports = {
    createRoom,
    getRooms
}