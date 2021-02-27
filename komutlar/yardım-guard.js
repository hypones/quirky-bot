const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const talkedRecently = new Set();
let botid = ('778683285692874815') 
 
exports.run = async(client, message, args) => { 
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ".";

    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
       .setTitle(`<a:quirky_yukleniyor:787935238591610881> **Quirky Bot Koruma Menüsüne Hoşgeldiniz** <a:quirky_yukleniyor:787935238591610881>`)
        .setDescription(`

  **» ${prefix}ban-koruma #kanal** <a:quirky_sagok:787938465228390400> Sunucudan Birini Banlayan Kişiyi Sunucudan Atar Ve Banlananın Banını Açar
  **» ${prefix}ban-koruma-sıfırla ** <a:quirky_sagok:787938465228390400> Ayarlanan Ban Koruma Sistemini Sıfırlar.
  **» ${prefix}kanal-koruma #kanal** <a:quirky_sagok:787938465228390400> Sunucuda Açılan veya Kapatılan Kanalı Otomatik Kapatır Veya Açar.
  **» ${prefix}kanal-koruma-sıfırla** <a:quirky_sagok:787938465228390400> Ayarlanan Kanal Koruma Sistemini Sıfırlar.
  **» ${prefix}rol-koruma #kanal ** <a:quirky_sagok:787938465228390400> Sunucuda Açılan veya Kapatılan Rolü Otomatık Kapatır Veya Açar.
  **» ${prefix}rol-koruma-sıfırla ** <a:quirky_sagok:787938465228390400> Ayarlanan Rol Koruma Sistemini Sıfırlar.
  **» ${prefix}spam ** <a:quirky_sagok:787938465228390400> Spam engel açar.
  **» ${prefix}spamkapat ** <a:quirky_sagok:787938465228390400> Spam engel kapatır.
▬▬▬▬▬▬▬▬ \`\`\Genel Komutlar\`\`\ ▬▬▬▬▬▬▬▬

**»  ${prefix}davet __Botu Davet Edebilirsiniz!__**
**»  ${prefix}sunucutanıt __Sunucunuzu Tanıtabilirsiniz.__**
**»  ${prefix}istatistik __Yazarak Botun İstatistiklerini Göre Bilirsiniz.__**

`)
             .addField(`» Quirky Bot Bağlantıları`, ` <a:quirky_alevv:787937467176583189> [Bot Davet Linki](http://gg.gg/quirky) **|** [Sitemiz](https://bot.quirkyweb.cf) **|** [Destek Sunucusu](https://discord.gg/b9NXRN39HM) **|** [Oy Linki](https://top.gg/bot/778683285692874815/vote) **|** <a:quirky_alevv:787937467176583189>`)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['koruma-yardım'],
  permLevel: 0,
};

exports.help = {
  name: 'guard',
  description: 'a!davet-sistemi Menüsü',
  usage: 'kayıt-sistemi'
};