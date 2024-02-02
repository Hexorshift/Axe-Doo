require('dotenv').config();
const express = require('express');
const app = express();
const AxeDoo = require('./AxeDoo');
const deployCommands = require('./deployCommands');
const { ActivityType } = require('discord.js');

(async () => {
  try {
    app.get('/', (req, res) => res.status(200).send('Hello, world!'));

    await deployCommands();
    await AxeDoo.loadEvents();
    await AxeDoo.loadCommands();
    await AxeDoo.login(process.env.BOT_TOKEN);
    // const avatar = (await AxeDoo.users.fetch('353742902524116992')).avatarURL({
    //   size: 512
    // });
    await AxeDoo.user.setAvatar(
      'https://cdn.discordapp.com/attachments/821035578240794644/1202677491496390746/bot2.png?ex=65ce53b2&is=65bbdeb2&hm=c78584f367bd4dbfc5876ab607a3e21a7b218d800e6aef1d3816c3fdf5326cbb&'
    );
    // await AxeDoo.authenticateAI();

    AxeDoo.user.setActivity('kuru kuru', { type: ActivityType.Listening });

    app.listen(process.env.PORT, () =>
      console.log(`Server is alive on port ${process.env.PORT}!`)
    );
  } catch (error) {
    console.log(error);
  }
})();
