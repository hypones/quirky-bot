const Discord = require('discord.js'); 
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const talkedRecently = new Set();
let botid = ('709489466913325168') 

exports.run = async(client, message, args) => {
 let prefix = "."; 


  
   const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
       .setTitle(`<a:787935238591610881:787935238591610881> **Quirky Bot  Kullanıcı Menüsüne Hoşgeldiniz** <a:787935238591610881:787935238591610881>`)
        .setDescription(`
  **» ${prefix}avatar** <a:787938465228390400:787938465228390400> Avatarınızı Atar.
  **» ${prefix}sunucutanıt** <a:787938465228390400:787938465228390400> Sunucunuzu Tanıtır.
  **» ${prefix}kullanıcı-bilgi** <a:787938465228390400:787938465228390400> Etiketlediğiniz Kişinin Kullanıcı Bilgisini Gösterir.
  **» ${prefix}davet** <a:787938465228390400:787938465228390400> Botu Davet Edersiniz!
  **» ${prefix}korona ** <a:787938465228390400:787938465228390400> Korona Hakkında Bilgi Alırsınız.
  **» ${prefix}id ** <a:787938465228390400:787938465228390400> Etiketlediğiniz Kişini İD sini atar.
  **» ${prefix}mcskin ** <a:787938465228390400:787938465228390400> İsmini Girdiğiniz Skini Fotosunu Atar.
  **» ${prefix}emoji-bilgi** <a:787938465228390400:787938465228390400> İsmini Yazdığınız Emoji Hakkında Bilgi Alırsınız.
  **» ${prefix}saat ** <a:787938465228390400:787938465228390400> Saati Gösterir.(Kendinde Bakabilirsin Ama)
  **» ${prefix}say** <a:787938465228390400:787938465228390400> Sunucuda ki Üye Durumlarını Gösterir.
  **» ${prefix}yetkilerim** <a:787938465228390400:787938465228390400> Sunucuda ki Yetkilerinizi Gösterir.
▬▬▬▬▬▬▬▬ \`\`\Genel Komutlar\`\`\ ▬▬▬▬▬▬▬▬

**»  ${prefix}davet __Botu Davet Edebilirsiniz!__**
**»  ${prefix}sunucutanıt __Sunucunuzu Tanıtabilirsiniz.__**
**»  ${prefix}istatistik __Yazarak Botun İstatistiklerini Göre Bilirsiniz.__**

`)
        .setThumbnail(`https:cdn.discordapp.com/attachments/735925634336817283/762342094554791936/ezgif.com-optimize_8-1.gif`)
             .addField(`» Quirky Bot Bağlantıları`, ` <a:quirky_alevv:787937467176583189> [Bot Davet Linki](http:gg.gg/quirky) **|** [Sitemiz](https:bot.quirkyweb.cf) **|** [Destek Sunucusu](https:discord.gg/b9NXRN39HM) **|** [Oy Linki](https:top.gg/bot/778683285692874815/vote) **|** <a:quirky_alevv:787937467176583189>`)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardım-kullanıcı'],
  permLevel: 0,
};

exports.help = {
  name: 'kullanıcı',
  description: 'a!davet-sistemi Menüsü',
  usage: 'kullanıcı'
};