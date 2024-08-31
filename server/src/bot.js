// bot.js
const TelegramBot = require('node-telegram-bot-api');
const Auth = require('./models/Auth');
const dotenv = require('dotenv');

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, "Welcome! Please share your phone number for authentication.", {
        reply_markup: {
            keyboard: [
                [
                    {
                        text: "Share my phone number",
                        request_contact: true 
                    }
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true 
        }
    });
});

bot.on('contact', async (msg) => {
    const chatId = msg.chat.id;
    const phone_number = msg.contact.phone_number;

    console.log("Received contact:", msg.contact); // Log the contact information
    console.log("Phone number received:", phone_number);

    try {
        let user = await Auth.findOne({ phone_number });

        if (!user) {
            console.log("User not found, creating new user");
            user = await Auth.create({
                name: msg.contact.first_name,
                phone_number: phone_number,
                verification_code: Math.floor(100000 + Math.random() * 900000).toString(),
                chat_id: chatId
            });
            console.log("User created:", user);

            bot.sendMessage(chatId, 'Thank you! You are now registered. Your verification code is: ' + user.verification_code);
        } else {
            console.log("User found, updating verification code");
            user.verification_code = Math.floor(100000 + Math.random() * 900000).toString();
            user.chat_id = chatId;
            await user.save();

            bot.sendMessage(chatId, 'Welcome back! Your verification code is: ' + user.verification_code);
        }
    } catch (error) {
        console.error("Error occurred:", error); // Log the error
        bot.sendMessage(chatId, 'An error occurred. Please try again.');
    }
});

module.exports = () => bot;
