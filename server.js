const { token, default_prefix } = require("./config.json");
const { badwords } = require("./data.json");
const { config } = require("dotenv");
const fs = require("fs")
const discord = require("discord.js");
const client = new discord.Client({
  disableEveryone: true
});
const db = require("quick.db");
const { addexp } = require("./handlers/xp.js");
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
client.on("ready", () => {
      console.log(
        `Bot Is Online!`
      );
      let statuses = [`${default_prefix}help By Rikka`,`Memantau ${client.users.cache.size} Member`,`Owner Crocolicon`,`Daddy >///<`,`Always Watching All`]; //Your Status's
      setInterval(function() {
        let STREAMING = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(STREAMING, {
          type: "STREAMING",
          url: "https://www.twitch.tv/rem_123"
        });
      }, 3000);
    });


function is_url(str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
}

client.on("message", async message => {
  if (message.author.bot) return;

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    if (is_url(message.content) === true) {
      message.delete();
      return message.channel.send("Ih Nakal Kirim Link Gasuka Ah");
    }

    let confirm = false;

    var i;
    for (i = 0; i < badwords.length; i++) {
      if (message.content.toLowerCase().includes(badwords[i].toLowerCase()))
        confirm = true;
    }

    if (confirm) {
      message.delete();
      return message.channel.send("Ih Nakal Badword Gasuka Ah");
    }
  }

  if (!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;

  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);

  return addexp(message);
});

client.on("guildMemberAdd", member => {
  let chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) {
    return;
  }

  let wembed = new discord.MessageEmbed()
    .setAuthor(member.guild.name, member.guild.iconURL())
    .setColor("RANDOM")
    .setTitle("Selamat Datang Semoga Betah")
    .addField("Nama", member.user)
    .addField("User ID", member.id)
    .addField("Member Ke", member.guild.memberCount)
    .setFooter(member.guild.name)
    .setTimestamp(member.guild.createdAt)
    .setThumbnail(member.user.avatarURL())
    .setDescription("Silahkan Baca Rules Yang Berlaku")
    .setDescription("Kami Para Mod&Owner Mengucapkan Selamat Datang")
    .setImage(
      "https://cdn.discordapp.com/attachments/687195557927583754/703741733846122576/tenor_1.gif"
    );

  client.channels.cache.get(chx).send(wembed);
});

client.on("guildMemberRemove", member => {
  let chx = db.get(`leavechannel_${member.guild.id}`);

  if (chx === null) {
    return;
  }

  let wembed = new discord.MessageEmbed()
    .setAuthor(member.guild.name, member.guild.iconURL())
    .setColor("RANDOM")
    .setTitle("Selamat Tinggal Semoga Senang Disana")
    .addField("Nama", member.user)
    .addField("User ID", member.id)
    .addField("Sisa Member", member.guild.memberCount)
    .setFooter(member.guild.name)
    .setTimestamp(member.guild.createdAt)
    .setThumbnail(member.user.avatarURL())
    .setDescription("Goodbye ", member.user)
    .setImage(
      "https://cdn.discordapp.com/attachments/712131320603476034/718488795816656916/tenor.gif"
    );

  client.channels.cache.get(chx).send(wembed);
});
client.login(process.env.BOT_TOKEN);
