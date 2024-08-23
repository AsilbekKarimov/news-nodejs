const mongoose = require('mongoose');


const AuthModel = mongoose.Schema({
    name: {
        type: 'string', required: true
    },
    phone_number: {
        type: 'string', 
        required: true, 
        unique: true
    },
    password: {
        type: 'string',
        required: true
    },
    verification_code: {
        type: 'string',
        required: true
    },
    chat_id: {
        type: 'string',
        required: false
    }
})

module.exports = mongoose.model('Auth', AuthModel)