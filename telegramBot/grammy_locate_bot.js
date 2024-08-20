import { Bot } from "grammy";

const bot = new Bot("6082436022:AAGmlOIMSjTKOaRrbC_qNpWAquWGNgi8_uE");

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.on("message", (ctx) => ctx.reply("Got another message!"));

bot.on("edit:location", (ctx) => {
  console.log(ctx.update.edited_message?.location);
  const { latitude, longitude } = ctx.update.edited_message.location;
  ctx.reply(`Got your location ${latitude} ${longitude}`);
});

bot.start();
