const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "stats",
    aliases: ['s'],
    category: "info",
    description: "Kalo Ada Masalah",
    run: async (client, message, args) => {
    const statsembed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`Stats ${client.user.username}`)
      .setThumbnail(client.user.avatarURL())
      .addField("SERVERS", client.guilds.cache.size, true)
      .addField("TOTAL MEMBERS", client.users.cache.size)
      .addField("STATUS", client.user.presence.status, true)
      .addField("UPTIME", client.uptime, true)
      .addField("PRESENCE", client.user.presence.activities[0].name, true)
      .addField("Owner Bot", "Rikka#4606")
      .addField("Support Server", `[Click Here](https://discord.gg/TTH8bbz)` , true)
      .addField("Invite Bot", `[Click Here](https://discordapp.com/oauth2/authorize?client_id=722077062445269002&scope=bot&permissions=2146958847)` , true)
      .addField("Donate Me", `[Click Here](https://saweria.co/nekodiary)` , true)
      .setFooter(`Created By Chocola#4606`)
    message.channel.send(statsembed);
    }
}
