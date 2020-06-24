const { MessageEmbed } = require("discord.js");


module.exports = {
    name: "suggest",
    category: "info",
    description: "Returns all commands, or one specific command info",
    usage: "suggest <message>",
    run: async (client, message, args) => {

      if(!args.length) {
        return message.channel.send("Please Give The Suggestion")
      }

      let channel = message.guild.channels.cache.find((x) => (x.name === "🚬┊rapat-room" || x.name === "🚬┊rapat-room"))


      if(!channel) {
        return message.channel.send("there is no channel with name - suggestion")
      }


      let embed = new MessageEmbed()
      .setAuthor("SUGGESTION: " + message.author.tag, message.author.avatarURL())
      .setThumbnail(message.author.avatarURL())
      .setColor('RANDOM')
      .setDescription(args.join(" "))
      .setTimestamp()


      message.channel.send(embed).then(m => {
        m.react("✅")
        m.react("❌")
      })

    }
}
