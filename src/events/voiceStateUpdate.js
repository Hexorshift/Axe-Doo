import { Events } from 'discord.js';
import { joinVoiceChannel, getVoiceConnection } from '@discordjs/voice';

const voiceStateUpdate = {
  name: Events.VoiceStateUpdate,
  once: false,
  async execute(oldState, newState) {
    // TTS Voice channel join and leave
    const ttsUsers = ['526449871671001098', '353742902524116992'];

    if (ttsUsers.includes(oldState.id) && ttsUsers.includes(newState.id)) {
      const oldChannelId = oldState.channelId;
      const newChannelId = newState.channelId;

      if (!oldChannelId && newChannelId) {
        // Member join
        const connection = getVoiceConnection(newState.guild.id);

        if (!connection) {
          joinVoiceChannel({
            channelId: newChannelId,
            guildId: oldState.guild.id,
            adapterCreator: oldState.guild.voiceAdapterCreator
          });
        }
      } else if (oldChannelId && !newChannelId) {
        // Member leave
        // Leave if there are no TTS users in vc
        const connection = getVoiceConnection(newState.guild.id);
        if (connection) connection.destroy();
      } else if (oldChannelId && newChannelId) {
        // Member move
        // Move if there are no other TTS users in vc
        if (!newState.guild.channels.cache.get(oldChannelId).members.find(({ user }) => ttsUsers.includes(user.id))) {
          const connection = getVoiceConnection(oldState.guild.id);
          if (connection) connection.destroy();

          joinVoiceChannel({
            channelId: newChannelId,
            guildId: newState.guild.id,
            adapterCreator: newState.guild.voiceAdapterCreator
          });
        }
      } else {
        console.log(oldChannelId, newChannelId);
      }
    }
  }
};

export default voiceStateUpdate;
