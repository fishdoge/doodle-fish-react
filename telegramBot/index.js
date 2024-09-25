import TelegramBot from 'node-telegram-bot-api';
import telegraf from 'telegraf'
import { writeUserData, updateScore } from './database/writeDoc.js'
import { deleteUser } from './database/delUser.js'
import { getUserInfo, viweUserInfoByTelegramID } from './database/getUid.js'
import dotenv from 'dotenv';
dotenv.config();



// 使用環境變數中的 TELEGRAM_TOKEN
const token ='7258269236:AAEiFCJLrAe3eY88egII6FtmE_4VMj3oaZM';

//const token = '7545446252:AAH5-Me2awU1JtRhxB2gTiiXQsheMw13rIo';//test

// 建立一個 bot 實例
const bot = new TelegramBot(token, { polling: true });

const commands = [
    { command: 'user', description: 'Start the bot' },
    { command: 'start', description: 'Show help' },
    { command: 'openweb', description: 'open the coin rush' },
    { command: 'opengame',description: 'A Doodle fish game' }
  ];
  bot.setMyCommands(commands);


// 回應 /start 命令
bot.onText(/\/start/, (msg) => {
    const start = Date.now(); // 开始时间
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Well come to doodle testing');

    const end = Date.now(); // 开始时间

    console.log("The function run time : ",end - start);
});




bot.onText(/\/opengame/, (msg) => {
    const chatId = msg.chat.id;
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [{text: "Open ton doodle fish mini game", web_app: {url: "https://ton-doodle-fish-react.vercel.app/"}}]
            ]
        }
    };

    // 發送帶有 Mini App 按鈕的消息
    bot.sendMessage(chatId, "Hello! Play doodle fist here!", opts);
});


//https://ton-pusher-tonminigame.vercel.app/



bot.on('message', (msg) => {
    const chatId = msg.chat.id;

});

bot.on("polling_error", console.log);


console.log("bot start!");
