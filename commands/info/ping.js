const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["pg"],
    category: "info",
    description: "Mengetahui Ping Bot",
    run: async (client, message, args) => {
    const pingembed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle("Pong :ping_pong:")
      .setDescription(`Bot:${client.ws.ping}ms`)
    message.channel.send(pingembed);
    }
}
