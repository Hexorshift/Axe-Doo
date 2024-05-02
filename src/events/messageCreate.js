import { Events } from 'discord.js';
import triggerWords from '../utils/triggerWords.js';
import wait from '../utils/wait.js';
import singAllIWantFor from '../utils/singAllIWantFor.js';
import singAllOfTheOther from '../utils/singAllOfTheOther.js';
import * as googleTTS from 'google-tts-api';
import audioTriggers from '../utils/audioTriggers.js';
import {
  getVoiceConnection,
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
  joinVoiceChannel,
  AudioPlayerStatus
} from '@discordjs/voice';

const ttsGuild = (message) => {
  if (
    (message.member.voice.selfMute || message.member.voice.serverMute) &&
    message.content &&
    !message.content.match(
      new RegExp(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
      )
    )
  ) {
    const voiceChannelInfo = message.member.voice;
    let connection = getVoiceConnection(voiceChannelInfo.guild.id);

    if (!connection) {
      connection = joinVoiceChannel({
        channelId: voiceChannelInfo.channelId,
        guildId: voiceChannelInfo.guild.id,
        adapterCreator: voiceChannelInfo.guild.voiceAdapterCreator
      });
    }

    const player = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Pause } });
    const results = googleTTS.getAllAudioUrls(message.content, {
      lang: 'en-US',
      slow: false,
      host: 'https://translate.google.com',
      splitPunct: ',.?'
    });
    const resource = createAudioResource(results[0].url);

    player.play(resource);
    connection.subscribe(player);
  }
};

const ttsDM = (message) => {
  const member = message.client.guilds.cache.get('760697375949324308').members.cache.get('526449871671001098');

  if (member) {
    if (
      message.content &&
      !message.content.match(
        new RegExp(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
        )
      )
    ) {
      const voiceChannelInfo = member.voice;
      let connection = getVoiceConnection(voiceChannelInfo.guild.id);

      if (!connection) {
        connection = joinVoiceChannel({
          channelId: voiceChannelInfo.channelId,
          guildId: voiceChannelInfo.guild.id,
          adapterCreator: voiceChannelInfo.guild.voiceAdapterCreator
        });
      }
      const player = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Pause } });
      let resource;

      for (const key in audioTriggers) {
        if (message.content.toLowerCase().includes(key)) {
          resource = createAudioResource(audioTriggers[key]);

          player.play(resource);
          player.on(AudioPlayerStatus.Idle, (oldState, newState) => {
            player.stop();
            connection.destroy();
          });
          connection.subscribe(player);
          return;
        }
      }

      const results = googleTTS.getAllAudioUrls(message.content, {
        lang: 'en-US',
        slow: false,
        host: 'https://translate.google.com',
        splitPunct: ',.?'
      });
      resource = createAudioResource(results[0].url);

      player.play(resource);
      connection.subscribe(player);
    }
  }
};

const playAudioTriggersGuild = (message) => {
  if (message.member.voice.channelId) {
    for (const key in audioTriggers) {
      if (message.content.toLowerCase().includes(key)) {
        const voiceChannelInfo = message.member.voice;
        let connection = getVoiceConnection(voiceChannelInfo.guild.id);

        if (!connection) {
          connection = joinVoiceChannel({
            channelId: voiceChannelInfo.channelId,
            guildId: voiceChannelInfo.guild.id,
            adapterCreator: voiceChannelInfo.guild.voiceAdapterCreator
          });
        }

        const player = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Pause } });
        const resource = createAudioResource(audioTriggers[key]);

        player.play(resource);
        player.on(AudioPlayerStatus.Idle, (oldState, newState) => {
          player.stop();
          connection.destroy();
        });
        connection.subscribe(player);
      }
    }
  }
};

const messageCreate = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    if (message.author.bot) return;

    const ttsUsers = ['526449871671001098', '353742902524116992'];

    if (ttsUsers.includes(message.author.id)) {
      if (!message.guild) ttsDM(message);
      else {
        ttsGuild(message);
        playAudioTriggersGuild(message);
      }
      return;
    }

    if (message.content.includes('kuru kuru')) {
      return await message.channel.send({ files: ['src/assets/KuruKuru.wav'] });
    }

    if (new Date().getMonth() === 11) {
      await singAllIWantFor(message);
      await singAllOfTheOther(message);
      return;
    }

    if (message.content.toLowerCase().includes('fnbr-shop')) {
      await message.channel.send('with this');
      await wait(1);
      await message.channel.send(
        'https://cdn.discordapp.com/attachments/900566349250715699/906159810662260776/ehe.PNG'
      );
      await wait(1);
      await message.channel.send('we can do a **whole** lotta inting');
      return;
    }

    for (const key in triggerWords) {
      if (message.content.toLowerCase().includes(key)) {
        await message.channel.send(triggerWords[key]);
      }
    }
  }
};

export default messageCreate;
