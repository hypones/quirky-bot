const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const talkedRecently = new Set();
const db = require("quick.db");
let botid = ('709489466913325168') 
exports.run = async(client, message, args) => {
 let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "."; 
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
       .setTitle(`<a:quirky_yukleniyor:787935238591610881> **Quirky Bot Seviye Menüsüne Hoşgeldiniz** <a:quirky_yukleniyor:787935238591610881>`)
        .setDescription(`
 
  **» ${prefix}seviye** <a:quirky_sagok:787938465228390400> Mevcut Olduğunuz Seviyeyi Gösterir.
  **» ${prefix}seviye-ayarlar** <a:quirky_sagok:787938465228390400> Sunucuda Aktif Olan Seviye Ayarlarını Gösterir.
  **» ${prefix}seviye-rol** <a:quirky_sagok:787938465228390400> İstenilen Seviyeye Gelince Verilecek Rolü Ayarlar.
  **» ${prefix}seviye-sıfırla ** <a:quirky_sagok:787938465228390400> Mevcut Seviye Sistemini Sıfırlar
  **» ${prefix}seviye-sınır ** <a:quirky_sagok:787938465228390400> Maksimum Kazanılanabilecek Seviyeyi Belirler.
  **» ${prefix}seviye-xp ** <a:quirky_sagok:787938465228390400> Bir Mesaj Başına Verilecek Xp yi ayarlar.
  **» ${prefix}seviye-top ** <a:quirky_sagok:787938465228390400> Sunucuda ki En yüksek 5 Kişiyi Gösterir
  **» ${prefix}seviye-rütbeler ** <a:quirky_sagok:787938465228390400> Hangi Seviye de Rol Verilecek Onu Gösterir.
▬▬▬▬▬▬▬▬ \`\`\Genel Komutlar\`\`\ ▬▬▬▬▬▬▬▬
**»  ${prefix}davet __Botu Davet Edebilirsiniz!__**
**»  ${prefix}sunucutanıt __Sunucunuzu Tanıtabilirsiniz.__**
`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/735925634336817283/762342094554791936/ezgif.com-optimize_8-1.gif`)
             .addField(`» Quirky Bot Bağlantıları`, ` <a:quirky_alevv:787937467176583189> [Bot Davet Linki](http://gg.gg/quirky) **|** [Sitemiz](https://bot.quirkyweb.cf) **|** [Destek Sunucusu](https://discord.gg/b9NXRN39HM) **|** [Oy Linki](https://top.gg/bot/778683285692874815/vote) **|** <a:quirky_alevv:787937467176583189>`)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['seviye-yardım'],
  permLevel: 0,
};

exports.help = {
  name: 'seviye-yardım',
  description: 'a!davet-sistemi Menüsü',
  usage: 'seviye-yardım'
};