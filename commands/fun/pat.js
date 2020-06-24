const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = {
  name: 'pat',
  description: 'Patting Someone',
  usage: '[Prefix]pat',
  category: 'fun',
  run: async (client, message, args) => {
    let { body } = await superagent.get(
      `https://nekos.life/api/pat`
    );

let patEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`${args} Kamu Mendapat Tepukan Dari ${message.author.username} :heart:`)
      .setImage(body.url)
      .setFooter(`Diminta Oleh ${message.author.username}`);

    message.channel.send(patEmbed);
  }
};
