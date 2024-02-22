import { Client, GatewayIntentBits, Collection } from 'discord.js';
import rd from 'readdirp';
const { promise } = rd;

class AxeDoo extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent
      ]
    });
    this.commands = new Collection();
  }

  async loadEvents() {
    for (const e of await promise('src/events', { fileFilter: '*.js' })) {
      const { default: event } = await import('file:///' + e.fullPath);

      this[event.once ? 'once' : 'on'](event.name, async (...args) => {
        await event.execute(...args);
      });
    }
    console.log('Loaded events.');
  }

  async loadCommands() {
    for (const c of await promise('src/commands', { fileFilter: '*.js' })) {
      const { default: command } = await import('file:///' + c.fullPath);

      this.commands.set(command.data.name, command);
      if (command.modalCustomId) {
        this.commands.set(command.modalCustomId, command);
      }
    }
    console.log('Loaded commands.');
  }
}

export default new AxeDoo();
