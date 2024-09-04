import TelegramBot from 'node-telegram-bot-api';
import telegraf from 'telegraf'
import { writeUserData, updateScore } from './database/writeDoc.js'
import { deleteUser } from './database/delUser.js'
import { getUserInfo, viweUserInfoByTelegramID } from './database/getUid.js'
import dotenv from 'dotenv';
dotenv.config();



// 使用環境變數中的 TELEGRAM_TOKEN
const token ='7258269236:AAEiFCJLrAe3eY88egII6FtmE_4VMj3oaZM';

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
    const chatId = msg.chat.id;
    const responseMessage = `
    <b>/startgame &lt;username&gt; - To register the user</b>
    <b>/user - To check the user info</b>
    <b>/bet! &lt;bet&gt; &lt;number&gt; - To bet with your points</b>
    <b>/clear - Clear user data</b>
    <b>/opengame - Play doodle - fish game!</b>
  `;
    // bot.sendMessage(chatId, 'Hello! Welcome to the bot.');
    bot.sendMessage(chatId, `Hello! Welcome to the bot. Please use the command here to start the game: ${responseMessage}`,{ parse_mode: 'HTML' });
});


bot.onText(/\/openweb/, (msg) => {
    const chatId = msg.chat.id;
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [{text: "Open Mini App", web_app: {url: "https://tma-next-demo.vercel.app/"}}]
            ]
        }
    };

    // 發送帶有 Mini App 按鈕的消息
    bot.sendMessage(chatId, "Hello! Please open the Mini App below:", opts);
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



bot.onText(/\/startgame (.+)/, async (msg,match) => {//載入user資料
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const state = writeUserData(match[1],userId);

    if(state == null){
        bot.sendMessage(chatId,`User exits!`);
    }else{
        bot.sendMessage(chatId,`Register user success! \nYour user ID is : ${userId}, User Name: ${match[1]}`);
        bot.sendMessage(chatId,`You have 5000 points,  Please guess a number between 1 ~ 6. If correct, you can earn x6 the points. You can choose the amount of bets to place.`);
    }
});

bot.onText(/\/clear/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    deleteUser(userId);
    bot.sendMessage(chatId,`Delete user success, now you can create a new user`);
});

bot.onText(/\/bet (\d+) (\d+)/, async (msg,match) => {// bet! 賭博的數量，賭博的數字
    const chatId = msg.chat.id;//開始進行
    const userId = msg.from.id;

    const userUid = await viweUserInfoByTelegramID(userId);
    const userInfo = await getUserInfo(userUid);
    const random =  Math.floor(Math.random() * 6 + 1);

    if(match[1] > userInfo.score){
        bot.sendMessage(chatId,`<b>Not enought points! bro!</b>`,{ parse_mode: 'HTML' });
        return;
    }
    console.log();
    let state;
    if(match[2] == random){
        const value = userInfo.score + (match[1] * 6)
        await updateScore(userId,value)

        state = true;
        console.log("win", value)
    }else{
        const value = userInfo.score - match[1];
        await updateScore(userId,value)

        state = false;
        console.log('Lose')
    }

    const userScore = await getUserInfo(userUid);

    if(state){
        bot.sendMessage(chatId,`The number is <b>${random}</b> You Win!`,{ parse_mode: 'HTML' });
        bot.sendMessage(chatId,`You Win, now you have ${userScore.score}  points!`);
    }else{
        bot.sendMessage(chatId,`The number is ${random} `);
        bot.sendMessage(chatId,`Sorry bro, You Lose! now you have ${userScore.score}  points!`);
    }
});


bot.onText(/\/user/,async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const userUid = await viweUserInfoByTelegramID(userId);
    const userInfo = await getUserInfo(userUid);
    bot.sendMessage(chatId, ` Your User ID is ${userId} \n Your name : ${userInfo.name} \n Your points : ${userInfo.score}`);
});
//const userId = msg.from.id;


bot.onText(/\/texttes/, (msg) => {
    const chatId = msg.chat.id;
    
    bot.sendMessage(chatId, `Your User ID is ${userId}`);
});


bot.on('message', (msg) => {
    const chatId = msg.chat.id;

});

bot.on("polling_error", console.log);


console.log("bot start!");
