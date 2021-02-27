const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

let kanal = db.fetch(`kayıtkanal_${message.guild.id}`)
let alınacakrol = db.fetch(`alınacakrol_${message.guild.id}`)
let erkekrol = db.fetch(`erkekrol_${message.guild.id}`)
let kayıtçı = db.fetch(`kayıtçırolqwed_${message.guild.id}`)
let tag = db.fetch(`tag.${message.guild.id}`)

 
if(!message.member.roles.cache.has(kayıtçı)) return message.channel.send(new discord.MessageEmbed().setColor("RANDOM").setDescription(`<a:atlantis_carpi:774167195671461938> Bu Komudu Kullanabilmen İçin <@&${kayıtçı}> Adlı Role Sahip olman Lazım ! `))
if(message.channel.id !== kanal) return message.channel.send(`<a:atlantis_carpi:774167195671461938> Bu Komudu Sadece <#${kanal}> Adlı Kanalda Kullanabilirsin ! `)
if (!erkekrol) return message.channel.send(`<a:atlantis_carpi:774167195671461938> Sunucuda Erkek Rolü Ayarlanmadığı İçin Komut Kullanılamaz ! `)
  if (!erkekrol) return message.channel.send(`<a:atlantis_carpi:774167195671461938> Sunucuda Tag ayarlanmadığı için komut kullanılamaz!`)


let member = message.mentions.members.first();
if (!member) return message.channel.send(`<a:atlantis_carpi:774167195671461938> Erkek Olarak Kayıt Edeceğin Kullanıcıyı Belirtmelisin ! `)
let isim = args[1]
if (!isim) return message.channel.send(`<a:atlantis_carpi:774167195671461938> İsmini Belirtmelisin ! `)
let yaş = args[2]
if (!yaş) return message.channel.send(`<a:atlantis_carpi:774167195671461938> Yaşını Belirtmelisin ! `)
member.setNickname(`${tag} ${isim} | ${yaş}`)
member.roles.remove(alınacakrol)
member.roles.add(erkekrol)

const başarılı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username}  Erkek `)
.setColor('BLACK')
.setDescription(`<a:yesil_dogrulama:771039259330084885> Erkek Olarak Kayıt Edilen Kullanıcı: ${member} \n Erkek Olarak Kayıt Eden Yetkili: <@!${message.author.id}> \n `)
.addField(`Kullanıcının İsmi;`, `${isim}`, true)
.addField(`Kullanıcının Yaşı;`, `${yaş}`, true)
.setThumbnail(member.avatarURL)
.setFooter(` Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(başarılı)
db.add(`kayıtsayı_${message.author.id}`, 1)



}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['e'],
  permlevel: 0
}
exports.help = {
  name: 'erkek',
  description: 'erkek olarak kayıt eder',
  usage: 'dr!erkek @kullanıcı isim yaş'
}