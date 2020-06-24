const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = {
  name: 'hug',
  description: 'Give Your Hug',
  usage: '[Prefix]hug',
  category: 'fun',
  run: async (client, message, args) => {
    let { body } = await superagent.get(
      `https://nekos.life/api/hug`
    );

let hugEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`${args} Kamu Mendapat Pelukan Dari ${message.author.username} :heart:`)
      .setImage(body.url)
      .setFooter(`Diminta Oleh ${message.author.username}`);

    message.channel.send(hugEmbed);
  }
};
