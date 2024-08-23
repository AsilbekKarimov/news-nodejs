const { model } = require('mongoose');

const BotService = () => {
    const TelegramBot = require('node-telegram-bot-api');
    const Auth = require('../models/Auth');
    const token = '7113809115:AAHU2XLTgDi7Bqd--fSoEt2SSBzAUzXR9-s';
    const bot = new TelegramBot(token, { polling: true });

    bot.onText('/start', (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Salom iltimos \n telefon nomeringizni kiriting');
    });

    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const phoneNumber = msg.text.trim(); // Assuming msg.text is the phone number
            const updatedUser = await Auth.findOneAndUpdate(
                { phone_number: phoneNumber },
                { chat_id: chatId },
                { new: true }
            );
            if(updatedUser) {
                bot.sendMessage(
                    chatId,
                    `Xush kelibsiz, ${updatedUser.name}! \nSizning raqamingiz: ${updatedUser.phone_number} \nSizning Codingiz: ${updatedUser.verification_code} \nIltimos shu kodni web saytimizga kiriting`
                );
            }

            console.log(updatedUser)

            
    });
}

module.exports = BotService;
