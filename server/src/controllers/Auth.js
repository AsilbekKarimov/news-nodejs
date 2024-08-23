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

const LoginPost = async (req, res) => { 
    const { phone_number, password } = req.body;
    try {
        const loginUser = await Auth.findOne({ phone_number: phone_number, password: password });
        if(loginUser) {
            res.status(200).json({data: loginUser})
        }else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = {AuthPost,LoginPost};
