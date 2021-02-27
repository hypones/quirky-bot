const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

let kanal = db.fetch(`kayıtkanal_${message.guild.id}`)
let alınacakrol = db.fetch(`alınacakrol_${message.guild.id}`)
let kızrol = db.fetch(`kızrol_${message.guild.id}`)
let kayıtçı = db.fetch(`kayıtçırolqwed_${message.guild.id}`)  
let tag = db.fetch(`tag.${message.guild.id}`)
const log = db.fetch(`kayıtlog_${message.guild.id}`)

if(!message.member.roles.cache.has(kayıtçı)) return message.channel.send(new discord.MessageEmbed().setColor("RANDOM").setDescription(`<a:atlantis_carpi:774167195671461938> Bu Komudu Kullanabilmen İçin <@&${kayıtçı}> Adlı Role Sahip olman Lazım ! `))
if(message.channel.id !== kanal) return message.channel.send(`<a:atlantis_carpi:774167195671461938> Bu Komudu Sadece <#${kanal}> Adlı Kanalda Kullanabilirsin ! `)
if (!kızrol) return message.channel.send(`<a:atlantis_carpi:774167195671461938> Sunucuda Kız Rolü Ayarlanmadığı İçin Komut Kullanılamaz ! `)
if (!tag) return message.channel.send("<a:atlantis_carpi:774167195671461938> Sunucuda Tag Ayarlanmadığı İçin Komut Kullanılamaz !")
let member = message.mentions.members.first();
if (!member) return message.channel.send(`<a:atlantis_carpi:774167195671461938>Kız Olarak Kayıt Edeceğin Kullanıcıyı Belirtmelisin ! `)
let isim = args[1]
if (!isim) return message.channel.send(`<a:atlantis_carpi:774167195671461938> İsmini Belirtmelisin ! `)
let yaş = args[2]
if (!yaş) return message.channel.send(`<a:atlantis_carpi:774167195671461938> Yaşını Belirtmelisin ! `)
member.setNickname(`${tag} ${isim} | ${yaş}`)
member.roles.remove(alınacakrol)
member.roles.add(kızrol) 

const başarılı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Kız `)
.setColor('BLACK')
.setDescription(`<a:yesil_dogrulama:771039259330084885> Kız Olarak Kayıt Edilen Kullanıcı: ${member} \n Kız Olarak Kayıt Eden Yetkili: <@!${message.author.id}> \n `)
.addField(`Kullanıcının ismi;`, `${isim}`, true)
.addField(`Kullanıcının Yaşı;`, `${yaş}`, true)
.setThumbnail(member.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(başarılı)
db.add(`kayıtsayı_${message.author.id}`, 1)

const logs = new discord.MessageEmbed()
.setAuthor("<a:quirky_hypesquad:789538385052172298> Bir Kayıt Yapıldı!")
.setDescription(`<a:quirky_galp:787959981664239657> ${member} Aramıza <@&${kızrol}> Rolüyle Katıldı.\n<a:quirky_moderation:783215662733459466> Kaydı Gerçekleştiren Yetkili : <@!${message.author.id}>`)
.setFooter(`Kaydın Yapıldığı Saat`)
.setTimestamp()
log.send(logs)

}


exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['k'],
  permlevel: 0
}
exports.help = {
  name: 'kız',
  description: 'kız olarak kayıt eder',
  usage: '!kız @kullanıcı isim yaş'
}