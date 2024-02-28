import { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } from 'discord.js';
import { DEFAULT_INTERCEPT_RESOLUTION_PRIORITY } from 'puppeteer';
import { DateTime } from 'luxon';
import puppeteer from 'puppeteer-extra';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import getItemShopImage from '../../utils/getItemShopImage.js';

puppeteer.use(
  AdblockerPlugin({
    interceptResolutionPriority: DEFAULT_INTERCEPT_RESOLUTION_PRIORITY
  })
);

const fnbrShop = {
  data: new SlashCommandBuilder().setName('fnbr_shop').setDescription("See today's Fortnite item shop!"),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      await getItemShopImage();

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

      await interaction.followUp({
        embeds: [embed],
        files: [file]
      });
    } catch (error) {
      console.log(error);
      await interaction.followUp("Failed to get today's item shop :/");
    }
  }
};

export default fnbrShop;
