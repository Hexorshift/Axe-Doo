import { Events } from 'discord.js';
import { RecurrenceRule, scheduleJob } from 'node-schedule';

const ready = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`${client.user.username} lives again!`);

    let rule = new RecurrenceRule();
    rule.date = 19;
    rule.hour = 0;
    rule.minute = 0;
    rule.timezone = 'EST5EDT';

    const sendCatJob = scheduleJob(rule, async () => {
      const channel = client.guilds.cache.get('760697375949324308').channels.cache.get('768530082271592508');
      try {
        await channel.send(
          'https://media.discordapp.net/attachments/855268214598664212/1120446809400152146/cat-kitty.mov'
        );
      } catch (error) {
        console.log(error);
      }
    });

    if (sendCatJob) {
      console.log('Sending cat on the 19th');
    }

    rule = new RecurrenceRule();
    rule.hour = 7;
    rule.minute = 0;
    rule.timezone = 'EST5EDT';

    const goodMorningJob = scheduleJob(rule, async () => {
      const channel = client.guilds.cache.get('760697375949324308').channels.cache.get('821035578240794644');
      try {
        await channel.send('good morning chat');
      } catch (error) {
        console.log(error);
      }
    });

    if (goodMorningJob) {
      console.log('Sending good morning at 7 in the morning');
    }

    rule = new RecurrenceRule();
    rule.hour = 12;
    rule.minute = 0;
    rule.timezone = 'EST5EDT';

    const goodAftenoonJob = scheduleJob(rule, async () => {
      const channel = client.guilds.cache.get('760697375949324308').channels.cache.get('821035578240794644');
      try {
        await channel.send('good afternoon chat');
      } catch (error) {
        console.log(error);
      }
    });

    if (goodAftenoonJob) {
      console.log('Sending good afternoon at 12 in the afternoon');
    }

    rule = new RecurrenceRule();
    rule.hour = 18;
    rule.minute = 0;
    rule.timezone = 'EST5EDT';

    const goodEveningJob = scheduleJob(rule, async () => {
      const channel = client.guilds.cache.get('760697375949324308').channels.cache.get('821035578240794644');
      try {
        await channel.send('good evening chat');
      } catch (error) {
        console.log(error);
      }
    });

    if (goodEveningJob) {
      console.log('Sending good evening at 6 in the evening');
    }

    rule = new RecurrenceRule();
    rule.hour = 0;
    rule.minute = 0;
    rule.timezone = 'EST5EDT';

    const goodNightJob = scheduleJob(rule, async () => {
      const channel = client.guilds.cache.get('760697375949324308').channels.cache.get('821035578240794644');
      try {
        await channel.send('good night chat');
      } catch (error) {
        console.log(error);
      }
    });

    if (goodNightJob) {
      console.log('Sending good night at 12 midnight');
    }

    // rule = new RecurrenceRule();
    // rule.hour = 15;
    // rule.minute = 16;
    // rule.timezone = 'EST5EDT';

    // const test = scheduleJob(rule, async () => {
    //   const channel = client.guilds.cache.get('760697375949324308').channels.cache.get('816413620618919946');
    //   try {
    //     await channel.send('hello');
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });

    // if (test) {
    //   console.log('Sending hello');
    // }
  }
};

export default ready;
