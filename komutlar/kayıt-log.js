  
const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

    
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` :x: Bu komutu kullanabilmek için "\`yönetici\`" yetkisine sahip olmalısın`);


if(args[0] === "sıfırla") {
const sıfırlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Hoş Geldin Kanalını Sıfırla`)
.setColor('BLACK')
.setDescription(`Hoş Geldin Kanal Başarıyla Sıfırlandı ! `)
.setThumbnail(client.user.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(sıfırlandı)
db.delete(`kayıtlog_${message.guild.id}`)
return;
}

let kanal = message.mentions.channels.first();   
if (!kanal) {
  const ayarlanmadı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Hoş Geldin Kanal Ayarla `)
.setColor('BLACK')
.setDescription(`<a:atlantis_carpi:774167195671461938> Log Kanalı Belirtiniz ! (Chat Önerilir)  `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(ayarlanmadı)
}
db.set(`kayıtlog_${message.guild.id}`, kanal.id)
const ayarlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Hoş Geldin Kanal Ayarlandı `)
.setColor('BLACK')
.setDescription(`<a:yesil_dogrulama:771039259330084885> Hoş Geldin Kanalı ${kanal} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(ayarlandı)
  //(`kayıtlog_${message.guild.id}`)
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ["kayıtlog"],
  permlevel: 0
}
exports.help = {
  name: 'kayıt-log',
  description: 'Kayıt Olunacak Kanalı Ayarlar',
  usage: 'dr!kayıt-kanal #kanal'
}