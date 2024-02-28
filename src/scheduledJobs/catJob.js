import { RecurrenceRule, scheduleJob } from 'node-schedule';

const catJob = () => {
  const rule = new RecurrenceRule();
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
};

export default catJob;
