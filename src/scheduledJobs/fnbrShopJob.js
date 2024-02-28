import { AttachmentBuilder, EmbedBuilder } from 'discord.js';
import { RecurrenceRule, scheduleJob } from 'node-schedule';
import { DateTime } from 'luxon';
import getItemShopImage from '../utils/getItemShopImage.js';

const fnbrShopJob = (client) => {
  const rule = new RecurrenceRule();
  rule.hour = 23;
  rule.minute = 33;
  rule.tz = 'Etc/UTC';

  const sendShopJob = scheduleJob(rule, async () => {
    try {
      await getItemShopImage(true);

      const channel = client.guilds.cache.get('760697375949324308').channels.cache.get('787108746131144724');
      const todaysDate = DateTime.now()
        .setZone('utc')
        .toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' });
      const embed = new EmbedBuilder()
        .setColor('DarkRed')
        .setTitle(`Fortnite shop for ${todaysDate}`)
        .setURL('https://fnbr.co/shop')
        .setImage('attachment://screenshot.png')
        .setFooter({ text: 'Provided by fnbr.co', iconURL: 'https://image.fnbr.co/logo/fnbr-v2-360x.png' });
      const file = new AttachmentBuilder(`${process.cwd()}/screenshot.png`);

      await channel.send({
        embeds: [embed],
        files: [file]
      });
    } catch (error) {
      console.log(error);
    }
  });

  if (sendShopJob) {
    console.log('Sending shop everyday!');
  }
};

export default fnbrShopJob;
