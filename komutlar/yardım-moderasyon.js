const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const talkedRecently = new Set();
let botid = ('778683285692874815') 
exports.run = async(client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ".";  
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
       .setTitle(`<a:quirky_yukleniyor:787935238591610881> **Quirky Bot Moderasyon Menüsüne Hoşgeldiniz** <a:quirky_yukleniyor:787935238591610881>`)
        .setDescription(`<a:quirky_supheli:787942710857957386> ${prefix}moderasyon2 Menümüze Bakmayı Unutmayın. <a:quirky_supheli:787942710857957386>
  **» ${prefix}giriş-çıkış-ayarla ** <a:quirky_sagok:787938465228390400> Resimli Hg-BB sistemini Açarsınız.
  **» ${prefix}giriş-çıkış-kapat ** <a:quirky_sagok:787938465228390400> Ayarlanan Resimli Hg-BB Sistemini Kapatırsınız.
  **» ${prefix}güvenlik ** <a:quirky_sagok:787938465228390400> Resimli Güvenlik Sistemini Belirlediğiniz Kanal Yapar..
  **» ${prefix}güvenlik sıfırla ** <a:quirky_sagok:787938465228390400> Resimli Güvenlik Sistemini Kapatırsınız.
  **» ${prefix}küfürengel** <a:quirky_sagok:787938465228390400> Küfür Sistemini Açar/Kapatırsınız.
  **» ${prefix}reklamengel** <a:quirky_sagok:787938465228390400> Reklam Engel Sistemini Açar/Kapatırsınız.
  **» ${prefix}sil ** <a:quirky_sagok:787938465228390400> Belirlenen Miktarda Mesaj Siler.(1 ile 1000 arası)
  **» ${prefix}unban ** <a:quirky_sagok:787938465228390400> İdsi Girelen Kullanıcıyı Banının Açar.
  **» ${prefix}isim ** <a:quirky_sagok:787938465228390400> Kullanının İsmini Değiştirir.
  **» ${prefix}forceban ** <a:quirky_sagok:787938465228390400> Sunucuda Olmayan Birini Banlar.
  **» ${prefix}yavaşmod ** <a:quirky_sagok:787938465228390400> Sunucuda Yavaş Mod Açar.
▬▬▬▬▬▬▬▬ \`\`\Genel Komutlar\`\`\ ▬▬▬▬▬▬▬▬

**»  ${prefix}davet __Botu Davet Edebilirsiniz!__**
**»  ${prefix}sunucutanıt __Sunucunuzu Tanıtabilirsiniz.__**
**»  ${prefix}istatistik __Yazarak Botun İstatistiklerini Göre Bilirsiniz.__**

`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/735925634336817283/762342094554791936/ezgif.com-optimize_8-1.gif`)
             .addField(`» Quirky Bot Bağlantıları`, ` <a:quirky_alevv:787937467176583189> [Bot Davet Linki](http://gg.gg/quirky) **|** [Sitemiz](https://bot.quirkyweb.cf) **|** [Destek Sunucusu](https://discord.gg/b9NXRN39HM) **|** [Oy Linki](https://top.gg/bot/778683285692874815/vote) **|** <a:quirky_alevv:787937467176583189>`)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return message.channel.send(embed);
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardım-moderasyon'],
  permLevel: 0,
};

exports.help = {
  name: 'moderasyon',
  description: 'a!davet-sistemi Menüsü',
  usage: 'moderasyon'
};