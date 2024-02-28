import { Events } from 'discord.js';
import getItemShopImage from '../utils/getItemShopImage.js';
import catJob from '../scheduledJobs/catJob.js';
import goodMorningJob from '../scheduledJobs/goodMorningJob.js';
import goodAfternoonJob from '../scheduledJobs/goodAfternoonJob.js';
import goodEveningJob from '../scheduledJobs/goodEveningJob.js';
import goodNightJob from '../scheduledJobs/goodNightJob.js';
import fnbrShopJob from '../scheduledJobs/fnbrShopJob.js';

const ready = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`${client.user.username} lives again!`);

    getItemShopImage();
    catJob();
    goodMorningJob();
    goodAfternoonJob();
    goodEveningJob();
    goodNightJob();
    fnbrShopJob(client);
  }
};

export default ready;
