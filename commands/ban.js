const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  aliases: ["b"],
  category: "moderation",
  description: "Ban anyone with one shot xD",
  usage: "ban <@user> <raeson>",
  run: (client, message, args) => {
    
    if(!message.member.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`)
    }
    
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, I do not have enough permission to use this command`)
    }
    
    let target = message.mentions.members.first();
    
    if(!args[0]) {
      return message.channel.send(`**${message.author.username}**, Please mention the person who you want to ban`)
    }
    
    if(target.id === message.author.id) {
     return message.channel.send(`**${message.author.username}**, You can not ban yourself`)
    }
    
let reason = args.slice(1).join(" ");
    if (!reason) reason = "-";
    
    const embed = new MessageEmbed()
      .setTitle("BAN MEMBER")
      .setColor("RANDOM")
      .setThumbnail(target.user.displayAvatarURL)
      .setDescription(
        `Action : Ban \nReason: ${reason} \nUser: ${target } \nModerator: ${message.member}`
      )
      .setTimestamp();
    
    message.channel.send(embed)
    
    target.ban(args[0]);
    
    
    
  }
}
