const { Events } = require('discord.js');
const triggerWords = require('../utils/triggerWords');
const wait = require('../utils/wait');
const singAllIWantFor = require('../utils/singAllIWantFor');
const singAllOfTheOther = require('../utils/singAllOfTheOther');
const AxeDoo = require('../AxeDoo');

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ready = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    if (message.author.bot) return;
    if (
      message.channel.id === '760918282629939221' &&
      !message.content.startsWith('http') &&
      !message.system
    ) {
      const characterId = 'P7_ENopkjowiH47vIOrdxvSU4rjHhGXrNNC3bRbbBCo';

      if (!AxeDoo.generatingResponse) {
        await message.channel.sendTyping();

        AxeDoo.generatingResponse = true;
        const chat = await AxeDoo.characterAI.createOrContinueChat(characterId);
        const response = await chat.sendAndAwaitResponse(
          `(Hi, this is ${message.author.tag}) ${message.content}`,
          true
        );

        AxeDoo.generatingResponse = false;
        await message.reply(response.text);
      } else {
        await message.reply("I'm already answering. Ask me after I give a response.");
      }
    }

    if (message.content.includes('kuru kuru')) {
      return await message.channel({ files: ['src/assets/KuruKuru.wav'] });
    }

    if (new Date().getMonth() === 11) {
      await singAllIWantFor(message);
      await singAllOfTheOther(message);
    }

    if (message.content.toLowerCase().includes('fnbr-shop')) {
      await message.channel.send('with this');
      await wait(1);
      await message.channel.send(
        'https://cdn.discordapp.com/attachments/900566349250715699/906159810662260776/ehe.PNG'
      );
      await wait(1);
      await message.channel.send('we can do a **whole** lotta inting');
    }

    for (const key in triggerWords) {
      if (message.content.toLowerCase().includes(key)) {
        await message.channel.send(triggerWords[key]);
      }
    }
  }
};

module.exports = ready;
