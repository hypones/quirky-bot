const Discord = require('discord.js');

const db = require("quick.db")

const ayarlar = require("../ayarlar.json")

exports.run = async (client, msg, args) => {

if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send(new Discord.MessageEmbed()

.setTitle(`Uyarı`)

.setDescription(`<a:atlantis_carpi:776057180612722699> Bu Komutu Kullanmak İçin; \`ADMINISTRATOR\` Yetkisine Sahip Olmalısın!`))

  if(args[0] == "sıfırla" || args[0] == "reset") {

    db.delete(`seviyexp${msg.guild.id}`)

    return msg.channel.send(`<a:yesil_dogrulama:771039259330084885>  Seviye-XP sıfırlandı! Default: \`5\``);

  }

let sayı = args[0]

if(!sayı) return msg.channel.send("<a:atlantis_carpi:776057180612722699> Lütfen Bir Sayı Giriniz!")

if(sayı > 40) return msg.channel.send("<a:atlantis_carpi:776057180612722699> Max 40 Olarak Ayarlıyabilirsin.")

db.set(`seviyexp${msg.guild.id}`, Math.floor(args[0]))

return msg.channel.send("<a:yesil_dogrulama:771039259330084885>  Başarıyla Seviye Puanını \`" + args[0] + "\` Olarak Ayarladınız!")

};

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: 'seviye-xp'

};
