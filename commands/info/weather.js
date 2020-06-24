const weather = require('weather-js');
const discord = require('discord.js')

module.exports = {
  name: "weather",
  aliases: ['w'],
  description: "Get the weather of anywhere",
  category: "info",
  usage: "weathet <>",
  run: (client, message, args) => {
    
    
    if(!args.length) {
      return message.channel.send("Please give the weather location")
    }
    
 weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
try {
 
let embed = new discord.MessageEmbed()
.setTitle(`Cuaca Di - ${result[0].location.name}`)
.setColor('RANDOM')
.setDescription("Terkadang Suhu Bisa Berubah Ubah")
.addField("Suhu", `${result[0].current.temperature} Celcius`, true)
.addField("Keadaan Langit", result[0].current.skytext, true)
.addField("Kelembaban", result[0].current.humidity, true)
.addField("Kecepatan Angin", result[0].current.windspeed, true)//What about image
.addField("Waktu Pengamatan", result[0].current.observationtime, true)
.addField("Arah Angin", result[0].current.winddisplay, true)
.setThumbnail(result[0].current.imageUrl);
   message.channel.send(embed)
} catch(err) {
  return message.channel.send("Gagal Mendapatkan Lokasi")
}
});   

    
  }
}
