import AxeDoo from './AxeDoo.js';
import deployCommands from './deployCommands.js';
import path from 'node:path';
import { ActivityType } from 'discord.js';
import { fileURLToPath } from 'url';
import { BOT_TOKEN } from '../secrets.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  try {
    await deployCommands();
    await AxeDoo.loadEvents();
    await AxeDoo.loadCommands();
    await AxeDoo.login(BOT_TOKEN);

    AxeDoo.user.setActivity('kuru kuru', { type: ActivityType.Listening });
  } catch (error) {
    console.log(error);
  }
})();
