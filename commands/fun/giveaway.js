const {MessageEmbed} = require('discord.js')
const ms = require('ms');
module.exports={
    name: 'giveaway',
    aliases: ['ga'],
    description: 'Create a simple giveaway',
    usage: '<time> <channel> <prize>',
    category: 'fun',
    run: async(bot,message,args)=>{
        if(!args[0]) return message.channel.send(`Hmm, Kamu Tidak Mensetting Waktu!`)
        if(!args[0].endsWith("d")&&!args[0].endsWith("h")&&!args[0].endsWith("m")&&!args[0].endsWith("s")) return message.channel.send(`Hmm, Kamu Salah Dalam Memformat Waktu!`)
        if(isNaN(args[0][0])) return message.channel.send(`Hmm, itu Bukanlah Sebuah Waktu!`)
        let channel = message.mentions.channels.first()
        if(!channel) return message.channel.send(`Hmm, Aku Tidak Dapat Menemukan Channel Tersebut!`)
        let prize = args.slice(2).join(" ")
        if(!prize) return message.channel.send(`Hmm, Kamu Tidak Mensetting Hadiah!`)
        message.channel.send(`Wah Ada Giveaway Di ${channel}`)
        let Embed = new MessageEmbed()
        .setTitle(`**GIVEAWAY:tada:**`)
        .setDescription(`@everyone ${message.author} Sedang Melaksanakan Giveaway!! Dengan Hadiah **${prize}**`)
        .setTimestamp(Date.now()+ms(args[0]))
        .setColor('RANDOM')
        .setFooter(`Created By Chocola#4606`)
        let m = await channel.send(Embed)
        m.react("🎉")
        setTimeout(() => {
            if(m.reactions.cache.size<=0) return message.channel.send(`Hmm, Sepertinya Tidak Semua Orang Ikut!`)
            let winner = m.reactions.cache.get("🎉").users.cache.filter(u=>!u.bot).random()
            channel.send(`Selamat ${winner} Kamu Mendapatkan Hadiah **${prize}**`)
        }, ms(args[0]));
    }
}
