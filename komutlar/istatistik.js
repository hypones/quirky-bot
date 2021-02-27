const Discord = require('discord.js');
const moment = require('moment');
const ayarlar = require('../ayarlar.json');
require('moment-duration-format');
exports.run = async(client, message, args) => {

let lordcreative = new Discord.MessageEmbed()
.setThumbnail(`https://cdn.discordapp.com/attachments/793174840559271936/798117462960635943/c5e13443ce65a2b99cf9180786534b37.png`)
.addField("__**Bot Verileri**__", `<a:quirky_hypesquad:789538385052172298> **Toplam Sunucu** **|**  **${client.guilds.cache.size}** \n <a:quirky_hypesquad:789538385052172298> **Toplam Kullanıcı** **|** **${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}** \n <a:quirky_hypesquad:789538385052172298> **Toplam Kanal** **|** **${client.channels.cache.size}**`)
.addField("__**Bot Geliştiricisi**__", `<a:quirky_hypesquad:789538385052172298> **Bot Sahibi**  <@586560481628782633> \n **hebele#0001** \n\n <a:quirky_hypesquad:789538385052172298> **Bot Yapımcısı**  <@586560481628782633> \n **hebele#0001** \n\n <a:quirky_hypesquad:789538385052172298> **Bot Sponsoru**\n**** \n`)
.addField("__**Sürümler**__", `<a:quirky_hypesquad:789538385052172298> **Discord.js Sürümü** **|**  **v${Discord.version}** \n<a:quirky_hypesquad:789538385052172298> **Node.js Sürümü** **|**  **${process.version}**`)
.addField("__**Gecikmeler**__", `<a:quirky_hypesquad:789538385052172298> **${client.ws.ping}** ms`,true)
.addField("**__Müzik Oynatılan__** ", "<a:quirky_hypesquad:789538385052172298> " +client.voice.connections.size + " Sunucu", true)
.setColor("#ffd100")
message.channel.send(lordcreative)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['stats', 'i'], 
    permLevel: 0
}

exports.help = {
    name: 'istatistik',
    description: 'Belirttiğiniz kullanıcının kullanıcı adını değiştirir.',
    usage: 'isimdeğiştir @kullanıcı '
}