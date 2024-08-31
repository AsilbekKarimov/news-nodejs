const mongoose = require('mongoose');
const Auth = require('../models/Auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AuthPost = async (req, res) => {
    const { name, password, phone_number, verification_code } = req.body;

    try {
        const user = await Auth.findOne({ phone_number });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (verification_code && verification_code === user.verification_code) {
            const token = jwt.sign({ id: user._id, name: user.name }, 'test', { expiresIn: "1h" });
            return res.status(200).json({ token });
        } else if (!user.verification_code) {
            const hashedPassword = await bcrypt.hash(password, 12);

            const authData = await Auth.create({
                name: name,
                password: hashedPassword,
                phone_number: phone_number,
                verification_code: Math.floor(100000 + Math.random() * 900000),
            });

            res.status(201).json({ message: 'Auth created successfully', data: authData });
        } else {
            return res.status(400).json({ message: 'Invalid verification code.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

module.exports = { AuthPost };
