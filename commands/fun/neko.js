const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = {
  name: 'neko',
  description: 'Send A Neko Pict',
  usage: '[Prefix]neko',
  category: 'fun',
  run: async (client, message, args) => {
    let { body } = await superagent.get(
      `https://nekos.life/api/v2/img/neko`
    );

let nekoEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle("Nyaa~")
      .setImage(body.url)
      .setFooter(`Diminta Oleh ${message.author.username}`);

    message.channel.send(nekoEmbed);
  }
};
