const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
exports.run = (client, message, args) => {

  let yazıİçeriği = args.slice().join(' ')
  if(!yazıİçeriği) return message.channel.send("Ne yazayım?")
  
  message.delete()
  const Mesaj = new MessageEmbed()
    .setColor('RANDOM')
    .setDescription(yazıİçeriği)

message.channel.send(Mesaj)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'yaz'
}