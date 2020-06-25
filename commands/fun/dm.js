const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "dm",
  description: "Dm Seseorang Yang Kamu Tag",
  usage: "np!dm (tag orangnya) (isi pesan)",
  category: "fun",
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("SEND_MESSAGES")) {
      message.channel
        .send(
          `I Don't Have Permissions To Properly Execute Current Command! Permissions Require : [Send Messages , SEND_MESSAGES]`
        )
        .then(message => message.delete(5000));
      message.author.send(
        `I Don't Have Permissions To Properly Execute Current Command! Permissions Require : [Send Messages , SEND_MESSAGES]`
      );
    }

    if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
      message.channel
        .send(
          `I Don't Have Permissions To Properly Execute Current Command! Permissions Require : [Administrator , ADMINISTRATOR]`
        )
        .then(message => message.delete(5000));
      message.author.send(
        `I Don't Have Permissions To Properly Execute Current Command! Permissions Require : [Administrator , ADMINISTRATOR]`
      );
    }

    try {
      message.delete();

      let member =
        (await message.mentions.users.first()) ||
        (await client.users.fetch(args[0]).catch(() => null)) ||
        (await message.guild.members.get(args[0]));
      if (!member || !args[0])
        return message.channel.send(`Please Mention A User!`);
      let msg = args.slice(1).join(" ") || `Please Give Me Message!`;

      member.send(
        new MessageEmbed()
          .setTitle(`Pesan Dari: ${message.author.username}`)
          .setColor("RANDOM")
          .setDescription(msg.size > 1900 ? `${msg.substr(0, 1900)}...` : msg)
          .setFooter(`Diminta Oleh ${message.author.username}`)
      );
      return message.channel
        .send(`Message Has Been Sent Successfully! | <@${message.author.id}>`)
        .then(message => message.delete(5000));
    } catch (err) {
      console.error(err);
      return message.channel
        .send(
          `I Couldn't Dm That User! | Something Went Wrong Please Try Again Later!`
        )
        .then(message => message.delete(5000));
    }
  }
};
