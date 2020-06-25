const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "stats",
    aliases: ['s'],
    category: "info",
    description: "UNtuk Mengecek Status Bot",
    run: async (client, message, args) => {
    const statsembed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`Stats ${client.user.username}`)
      .setThumbnail(client.user.avatarURL())
      .addField("Server", "Weebsology")
      .addField("Total Member", client.users.cache.size)
      .addField("Status", client.user.presence.status, true)
      .addField("Uptime", client.uptime, true)
      .addField("Presence", client.user.presence.activities[0].name, true)
      .addField("Owner Bot", "Rikka#4606")
    message.channel.send(statsembed);
    }
}
