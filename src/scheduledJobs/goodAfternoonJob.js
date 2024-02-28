import { RecurrenceRule, scheduleJob } from 'node-schedule';

const goodAftenoonJob = () => {
  const rule = new RecurrenceRule();
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
};

export default goodAftenoonJob;
