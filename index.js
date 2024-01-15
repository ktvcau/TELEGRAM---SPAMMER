const express = require('express');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const app = express();
const port = 3000;

const videoPath = path.join(__dirname, 'src', 'xie.txt');

app.get('/', (req, res) => {
  res.sendFile(videoPath);
});

app.listen(port, () => {});

const logo = [
  '██╗  ██╗  ██╗  ███████╗',
  '╚██╗██╔╝ ╚██╗  ██╔════╝',
  ' ╚███╔╝   ██║  █████╗',
  ' ██╔██╗   ██║  ██╔══╝',
  '██╔╝ ██╗  ██╔╝ ███████╗',
  '╚═╝  ╚═╝  ╚═╝  ╚══════╝'
];

logo.forEach(row => {
  console.log(row);
});

const bot = new TelegramBot('6700821593:AAHyOJaVPeCQqW2A-CToVQs2iTZpqZ8fFGg', { polling: true });

const messages = JSON.parse(fs.readFileSync('messages.json', 'utf8'));

const chatId = -4071061231;
let sentCount = 0;

function silenceDeprecationWarnings() {
  process.noDeprecation = true;
}

async function sendMessageWithoutPhoto(chatId, message) {
  try {
    await bot.sendMessage(chatId, message);
    sentCount++;
    console.log(`XIE: Đã gửi số tin nhắn là ${sentCount}`);
  } catch (error) {
    console.error('LỖI:', error);
  }
}

function sendMessagesRepeatedly() {
  silenceDeprecationWarnings();

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  sendMessageWithoutPhoto(chatId, randomMessage);

  setTimeout(sendMessagesRepeatedly, 5000);
}

sendMessagesRepeatedly();
