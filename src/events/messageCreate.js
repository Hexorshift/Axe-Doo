import { Events } from 'discord.js';
import triggerWords from '../utils/triggerWords.js';
import wait from '../utils/wait.js';
import singAllIWantFor from '../utils/singAllIWantFor.js';
import singAllOfTheOther from '../utils/singAllOfTheOther.js';
import * as googleTTS from 'google-tts-api';
import { getVoiceConnection, createAudioPlayer, NoSubscriberBehavior, createAudioResource } from '@discordjs/voice';

const messageCreate = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    if (message.author.bot) return;

    if (
      message.author.id === '526449871671001098' &&
      message.content &&
      !message.content.match(
        new RegExp(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
        )
      )
    ) {
      const connection = getVoiceConnection(message.guild.id);

      if (connection) {
        const player = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Pause } });
        const results = googleTTS.getAllAudioUrls(message.content, {
          lang: 'ja',
          slow: false,
          host: 'https://translate.google.com',
          splitPunct: ',.?'
        });
        const resource = createAudioResource(results[0].url);

        player.play(resource);
        connection.subscribe(player);
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

export default messageCreate;
