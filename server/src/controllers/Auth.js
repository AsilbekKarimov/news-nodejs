const mongoose = require('mongoose');
const Auth = require('../models/Auth');


const AuthPost = async (req, res) => {
    const { name, password, phone_number} = req.body;
    try {
        const authData = await Auth.create({
            name: name,
            password: password,
            phone_number: phone_number,
            verification_code: Math.floor(100000 + Math.random() * 900000),
        })
        res.status(201).json({message: 'Auth created successfully', data: authData})
    } catch {
        res.status(400).json({message: 'Invalid request'})
    }
};


module.exports = {AuthPost};
