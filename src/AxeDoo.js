const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { promise } = require('readdirp');
const CharacterAI = require('node_characterai');

class AxeDoo extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent
      ]
    });
    this.commands = new Collection();
    this.characterAI = new CharacterAI();
    this.generatingResponse = false;
  }

  async authenticateAI() {
    await this.characterAI.authenticateWithToken(
      process.env.CHARACTER_AI_TOKEN,
      process.env.CHARACTER_AI_ID_TOKEN
    );
    console.log('Authenticated');
  }

  async loadEvents() {
    for (const e of await promise('src/events', { fileFilter: '*.js' })) {
      const event = require(e.fullPath);

      this[event.once ? 'once' : 'on'](event.name, async (...args) => {
        await event.execute(...args);
      });
    }
    console.log('Loaded events.');
  }

  async loadCommands() {
    for (const c of await promise('src/commands', { fileFilter: '*.js' })) {
      const command = require(c.fullPath);

      this.commands.set(command.data.name, command);
      if (command.modalCustomId) {
        this.commands.set(command.modalCustomId, command);
      }
    }
    console.log('Loaded commands.');
  }
}

module.exports = new AxeDoo();
