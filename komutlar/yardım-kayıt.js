const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db =  require("quick.db");
const talkedRecently = new Set();

let botid = ('778683285692874815') 
exports.run = async(client, message, args) => {
 let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ".";
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
       .setTitle(`<a:quirky_yukleniyor:787935238591610881> **Quirky Bot Kayıt Menüsüne Hoşgeldiniz** <a:quirky_yukleniyor:787935238591610881>`)
        .setDescription(`
 
  **» ${prefix}alınacak-rol** <a:quirky_sagok:787938465228390400> Kayıt Edilen Kişiden Alınacak Rolü Ayarlar.
  **» ${prefix}alınacak-rol sıfırla ** <a:quirky_sagok:787938465228390400> Kayıt Edilen Kişiden Alınacak Rolü Sıfırlar.
  **» ${prefix}kayıt-kanal** <a:quirky_sagok:787938465228390400> Kayıtın Yapılacağı Kanalı Belirlersiniz.
  **» ${prefix}kayıt-kanal sıfırla** <a:quirky_sagok:787938465228390400> Kayıtın Yapılacağı Kanalı Sıfırlarsınız.
  **» ${prefix}kayıt-hg ** <a:quirky_sagok:787938465228390400> Gelen Kullanıcılara Kayıt Bilgisi Verir.
  **» ${prefix}kayıt-hg sıfırla ** <a:quirky_sagok:787938465228390400> Kayıt Hg sistemini sıfırlar.
  **» ${prefix}kayıt-yetkili** <a:quirky_sagok:787938465228390400> Kayıt Edebilecek Yetkiyi Ayarlar.
  **» ${prefix}kayıt-yetkili sıfırla** <a:quirky_sagok:787938465228390400> Kayıt Edebilecek Yetkiyi Sıfırlar.
  **» ${prefix}erkek-rol ** <a:quirky_sagok:787938465228390400> Kayıt Edilince Verilecek Erkek Rolü Ayarlar.
  **» ${prefix}erkek-rol sıfırla ** <a:quirky_sagok:787938465228390400> Kayıt Edilince Verilecek Erkek Rolünü Sıfırlar.
  **» ${prefix}kız-rol** <a:quirky_sagok:787938465228390400> Kayıt Edilince Verilecek Kız Rolü Ayarlar.
  **» ${prefix}kız-rol sıfırla** <a:quirky_sagok:787938465228390400> Kayıt Edilince Verilecek Kız Rolünü Sıfırlar.
  **» ${prefix}erkek ** <a:quirky_sagok:787938465228390400> Erkekleri Kayıt Etmeye Yarar.
  **» ${prefix}kız ** <a:quirky_sagok:787938465228390400> Kızları Kayıt Etmeye Yarar.
  **» ${prefix}tag ** <a:quirky_sagok:787938465228390400> Tag Ayarlamaya Yarar.
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
  aliases: ['kayıt-sistemi'],
  permLevel: 0,
};

exports.help = {
  name: 'kayıt-sistem',
  description: 'a!davet-sistemi Menüsü',
  usage: 'kayıt-sistemi'
};