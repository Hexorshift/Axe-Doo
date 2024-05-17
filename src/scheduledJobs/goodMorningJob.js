import { RecurrenceRule, scheduleJob } from 'node-schedule';

const goodMorningJob = (client) => {
  const rule = new RecurrenceRule();
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
};

export default goodMorningJob;
