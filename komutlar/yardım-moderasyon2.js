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
        .setDescription(`
  **» ${prefix}mod-log** <a:quirky_sagok:787938465228390400> Mod-Log Kanalını Belirlersiniz.
  **» ${prefix}mod-log kapat** <a:quirky_sagok:787938465228390400> Ayarlanan Mod-Log Kanalı Kapatılır.
  **» ${prefix}oylama ** <a:quirky_sagok:787938465228390400> Oylama Yaparsınız
  **» ${prefix}otorol-ayarla** <a:quirky_sagok:787938465228390400> Otorol Ayarlar.
  **» ${prefix}otorol-mesaj** <a:quirky_sagok:787938465228390400> Otorol Mesajı Ayarlar.
  **» ${prefix}otorol-sıfırla** <a:quirky_sagok:787938465228390400> Otorol Sıfırlar.
  **» ${prefix}sayaç-ayarla** <a:quirky_sagok:787938465228390400> Sayaç Ayarlar.
  **» ${prefix}ban ** <a:quirky_sagok:787938465228390400> Etiketlenen Kullanıcıyı Banlar.
  **» ${prefix}kick ** <a:quirky_sagok:787938465228390400> Etiketlenen Kullanıcıyı Kickler.
  **» ${prefix}oykick ** <a:quirky_sagok:787938465228390400> Kullanıcının Atılması İçin Oylama Yapar.
  **» ${prefix}sa-as aç ** <a:quirky_sagok:787938465228390400> SA-AS Sistemini Açar.
  **» ${prefix}sa-as kapat ** <a:quirky_sagok:787938465228390400> SA-AS Sistemini Kapatır.
  **» ${prefix}ayrıl** <a:quirky_sagok:787938465228390400> Bot sunucudan ayrılır.
  **» ${prefix}sunucukur ** <a:quirky_sagok:787938465228390400> Hazır Sunucu Kurar.
  **» ${prefix}nuke ** <a:quirky_sagok:787938465228390400> Kanalı silip tekrar açar.
  **» ${prefix}mute ** <a:quirky_sagok:787938465228390400> Etiketlenen Kullanıcıyı Susturur.
  **» ${prefix}unmute ** <a:quirky_sagok:787938465228390400> Etiketlenen Kullanıcının Susturmasını Kaldırır.
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
  aliases: ['Moderasyon2', 'yardım-moderasyon'],
  permLevel: 0,
};

exports.help = {
  name: 'moderasyon2',
  description: 'a!davet-sistemi Menüsü',
  usage: 'moderasyon'
};