import { RecurrenceRule, scheduleJob } from 'node-schedule';

const goodNightJob = (client) => {
  const rule = new RecurrenceRule();
  rule.hour = 23;
  rule.minute = 59;
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
};

export default goodNightJob;
