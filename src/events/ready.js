const { Events } = require('discord.js');
const { RecurrenceRule, scheduleJob } = require('node-schedule');

const ready = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`${client.user.tag} lives again!`);

    const rule = new RecurrenceRule();
    rule.date = 19;
    rule.hour = 4;
    rule.minute = 0;
    rule.timezone = 'America/New_York';

    const job = scheduleJob(rule, async () => {
      const channel = client.guilds.cache
        .get('760697375949324308')
        .channels.cache.get('768530082271592508');
      try {
        await channel.send(
          'https://media.discordapp.net/attachments/855268214598664212/1120446809400152146/cat-kitty.mov'
        );
      } catch (error) {
        console.log(error);
      }
    });

    if (job) {
      console.log('Sending cat on the 19th');
    }
  }
};

module.exports = ready;
