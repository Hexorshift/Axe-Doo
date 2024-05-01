import { RecurrenceRule, scheduleJob } from 'node-schedule';

const goodEveningJob = (client) => {
  const rule = new RecurrenceRule();
  rule.hour = 18;
  rule.minute = 0;
  rule.timezone = 'America/New_York';

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
};

export default goodEveningJob;
