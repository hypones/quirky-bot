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
       .setTitle(`<a:quirky_yukleniyor:787935238591610881> **Quirky Bot Gif Menüsüne Hoşgeldiniz** <a:quirky_yukleniyor:787935238591610881>`)
        .setDescription(`
 
        **${prefix}gif-ara** <a:quirky_sagok:787938465228390400> Yazdığınız Kelime Hakkında Gif Aratır!
        **${prefix}man-gif** <a:quirky_sagok:787938465228390400> Rastgele Erkek Gifi Atar!
        **${prefix}woman-gif** <a:quirky_sagok:787938465228390400> Rastgele Kadın Gifi Atar!
        **${prefix}couple-gif** <a:quirky_sagok:787938465228390400> Rastgele Sevgili Gifi Atar!
        **${prefix}baby-gif** <a:quirky_sagok:787938465228390400> Rastgele Bebek Gifi Atar!
        **${prefix}animal-gif** <a:quirky_sagok:787938465228390400> Rastgele Hayvan Gifi Atar!
        **${prefix}marvel-gif** <a:quirky_sagok:787938465228390400> Rastgele Marvel Gifi Atar!
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
  aliases: ['Gif-yardım'],
  permLevel: 0,
};

exports.help = {
  name: 'gif',
  description: 'a!davet-sistemi Menüsü',
  usage: 'gif-menü'
};