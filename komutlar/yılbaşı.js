const ms = require('parse-ms');

exports.run = async(client, message, args) => {
  let kessien = new Date('2022-01-01 00:00:00')
    let zaman = ms(kessien - Date.now())
    message.channel.send(`**2022**'ye **${zaman. days }** gün **${zaman.hours}** saat **${zaman.minutes}** dakika kaldı!`)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yılbaşı'],
  permLevel: 0
};

exports.help = {
  name: '2022',
  description: '',
usage: ""
};
