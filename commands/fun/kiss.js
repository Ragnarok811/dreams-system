const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = {
  name: 'kiss',
  description: 'Kissing Someone',
  usage: '[Prefix]kiss',
  category: 'fun',
  run: async (client, message, args) => {
    let { body } = await superagent.get(
      `https://nekos.life/api/kiss`
    );

let kissEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`${args} Kamu Mendapat Ciuman Dari ${message.author.username} :heart:`)
      .setImage(body.url)
      .setFooter(`Diminta Oleh ${message.author.username}`);

    message.channel.send(kissEmbed);
  }
};
