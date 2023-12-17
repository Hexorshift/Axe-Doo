const { SlashCommandBuilder } = require('discord.js');

const ping = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('The bot replies with pong!'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  }
};

module.exports = ping;
