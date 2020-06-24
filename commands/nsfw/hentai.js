const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = {
  name: 'hentai',
  aliases: ["hen"],
  description: 'Send A Hentai Gif Lol',
  usage: '[Prefix]hentai',
  category: 'nsfw',
  run: async (client, message, args) => {
    let { body } = await superagent.get(
      `https://nekos.life/api/v2/img/Random_hentai_gif`
    );

    if (message.channel.nsfw == false) {
    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Please Turn On NSFW')
      .setDescription("Silahkan Nyalakan NSFW Channel Disetting Channel Anda")
      .setImage('https://i.imgur.com/oe4iK5i.gif')
      .setFooter(`Created By Chocola#4606`)
    return message.channel.send(embed);
    }
    let hentaiEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Take Your Hentai Gif Sir!')
      .setImage(body.url)
      .setFooter(`Diminta Oleh ${message.author.username}`);

    message.channel.send(hentaiEmbed);
  }
};
