const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

let erkekrol = db.fetch(`erkekrolsjs_${message.guild.id}`)
let kayıtçı = db.fetch(`anan_${message.guild.id}`)

 
if (!kayıtçı) return message.channel.send("ilk olarak ``.aboneverici`` yazarak abone yetkilisini ayarlamalısın")
if(!message.member.roles.cache.has(kayıtçı)) return message.channel.send(new discord.MessageEmbed().setDescription(`Bu Komudu Kullanabilmen İçin <@&${kayıtçı}> Adlı Role Sahip olman Lazım ! `));
if (!erkekrol) return message.channel.send(`Sunucuda Abone Rolü Ayarlanmadığı İçin Komut Kullanılamaz ! `)


let member = message.mentions.members.first();
if (!member) return message.channel.send(`Abone Rolü Vereceğin Kullanıcıyı Belirtmelisin ! `)


member.roles.add(erkekrol)

const başarılı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Abone `)
.setColor('BLACK')
.setDescription(`Abone Rolü Veren Kullanıcı: ${member} \n Abone rolü veren Yetkili: <@!${message.author.id}> \n **`)
.setThumbnail(member.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(başarılı)
db.add(`kayıtsayısj_${message.author.id}`, 1)
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['a'],
  permlevel: 0
}
exports.help = {
  name: 'abone',
  description: 'erkek olarak kayıt eder',
  usage: '-abone @etiket'
}