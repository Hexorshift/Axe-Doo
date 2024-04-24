import { Events } from 'discord.js';
import { joinVoiceChannel, getVoiceConnection } from '@discordjs/voice';

const voiceStateUpdate = {
  name: Events.VoiceStateUpdate,
  once: false,
  async execute(oldState, newState) {
    if (oldState.id === '526449871671001098' && newState.id === '526449871671001098') {
      const oldChannelId = oldState.channelId;
      const newChannelId = newState.channelId;

      if (!oldChannelId && newChannelId) {
        // Member join
        console.log('join');
        joinVoiceChannel({
          channelId: newChannelId,
          guildId: oldState.guild.id,
          adapterCreator: oldState.guild.voiceAdapterCreator
        });
      } else if (oldChannelId && !newChannelId) {
        // Member leave
        const connection = getVoiceConnection(oldState.guild.id);

        if (connection) {
          connection.destroy();
        }

        console.log('leave');
      } else if (oldChannelId && newChannelId) {
        console.log('Move');
        const connection = getVoiceConnection(oldState.guild.id);

        if (connection) {
          connection.destroy();
        }

        joinVoiceChannel({
          channelId: newChannelId,
          guildId: newState.guild.id,
          adapterCreator: newState.guild.voiceAdapterCreator
        });
      } else {
        console.log(oldChannelId, newChannelId);
      }
    }
  }
};

export default voiceStateUpdate;
