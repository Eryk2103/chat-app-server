const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        required: true
    },
    users: {
        type: [String]
    }
    
})
module.exports = mongoose.model('Room', roomSchema);