const { MessageEmbed } = require("discord.js");


module.exports = {
    name: "suggest",
    category: "info",
    description: "Mengirimkan Opini Anda",
    usage: "suggest <message>",
    run: async (client, message, args) => {

      if(!args.length) {
        return message.channel.send("Tolong Berikan Saran")
      }

      let channel = message.guild.channels.cache.find((x) => (x.name === "🚬┊rapat-room" || x.name === "🚬┊rapat-room"))


      if(!channel) {
        return message.channel.send("Tidak Ada Channel Bernama Suggestion")
      }


      let embed = new MessageEmbed()
      .setAuthor("SARAN: " + message.author.tag, message.author.avatarURL())
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
