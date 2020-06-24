const { get } = require("request-promise-native");
const { MessageEmbed } = require("discord.js")
module.exports = {
  name: 'covid',
  aliases: ['corona'],
  category: 'info',
  description: 'Mencari Info Tentang Corona Didunia',
  run: async(client, message, args) => {
    if(args[0] !== 'all') {
    var options = {
      url: 'https://disease.sh/v2/countries/' + args[0],
      json: true
    }
    } if(args[0] === 'all') {
      options = {
        url: 'https://disease.sh/v2/all',
        json: true
      }
    }
    let nembed = new MessageEmbed()
    .setColor('RANDOM')
    .setDescription('Negara Tidak Ditemukan/Kasus Tidak Ada')
    let oembed = new MessageEmbed()
    .setColor('RANDOM')
    .setDescription('Sedang Mengambil Data Di Internet')
    message.channel.send(oembed).then(msg => {
      get(options).then(body => {
        let embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Status Corona Di ` + (body.country === undefined? 'all countries': body.country))
        .addField('Total Kasus', body.cases, true)
        .addField('Kasus Dalam 24Jam', body.todayCases, true)
        .addField('Total Kematian', body.deaths, true)
        .addField('Kematian Dalam 24Jam', body.todayDeaths, true)
        .addField('Total Sembuh', body.recovered, true)
        .addField('Total Kasus Aktif', body.active, true)
        .addField('Kritis', body.critical, true)
        .addField('KPJ', body.casesPerOneMillion, true)
        .addField('KEPJ', body.deathsPerOneMillion, true)
        .addField('Total Test', body.tests, true)
        .addField('TPJ', body.testsPerOneMillion, true)
        .setTimestamp()
        .setFooter('KPJ: Kasus Per Juta  KEPJ: Kematian Per Juta  TPJ: Test Per Juta')
        if(args[0] !== 'all') embed.setThumbnail(body.countryInfo.flag)
        msg.edit(embed)
      })
      .catch(body => {
         msg.edit(nembed + body)
      })
    })
  }
}
