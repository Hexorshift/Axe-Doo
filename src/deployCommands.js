import { BOT_TOKEN, BOT_CLIENT_ID, BOT_SERVER } from '../secrets.js';
import { REST, Routes } from 'discord.js';
import readdirp from 'readdirp';

const deployCommands = async () => {
  const commands = [];
  const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

  for await (const c of readdirp('src/commands', { fileFilter: '*.js' })) {
    const { default: command } = await import('file:///' + c.fullPath);
    commands.push(command.data.toJSON());
  }

  try {
    await rest.put(Routes.applicationGuildCommands(BOT_CLIENT_ID, BOT_SERVER), {
      body: commands
    });
    console.log(`Successfully registered ${commands.length} application commands.`);
  } catch (error) {
    console.error(error);
  }
};

export default deployCommands;
