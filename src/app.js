import AxeDoo from './AxeDoo.js';
import deployCommands from './deployCommands.js';
import { ActivityType } from 'discord.js';
import { BOT_TOKEN } from '../secrets.js';

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
