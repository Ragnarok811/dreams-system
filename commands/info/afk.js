const Discord = require('discord.js'), db = require('quick.db');
const status = new db.table("AFKs");

module.exports = {
    name: "afk",
    category: "info",
    description: "Command Help",
    run: async (client, message, args) => {
    let afk = await status.fetch(message.author.id);
    const embed = new Discord.MessageEmbed().setColor('RANDOM')
    
    if (!afk) {
    embed.setThumbnail(message.author.avatarURL())
    embed.setTitle(`**${message.author.tag}** Sekarang AFK`)
    embed.setDescription(`Alasan: ${args.join(" ") ? args.join(" ") : "AFK"}`)
    embed.setFooter(`Kembali Lagi dengan Mengetik np!afk`)
    status.set(message.author.id, args.join(" ") || `AFK`);
  } else {
    embed.setThumbnail(message.author.avatarURL())
    embed.setTitle(`**${message.author.tag}** Sudah Kembali`)
    embed.setDescription("Hai Selamat Datang Kembali");
    status.delete(message.author.id);
  }
    
  message.channel.send(embed)
    }
}
