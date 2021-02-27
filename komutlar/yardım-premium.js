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
       .setTitle(`<a:quirky_yukleniyor:787935238591610881>**Quirky Bot Premium Menüsüne Hoşgeldiniz** <a:quirky_yukleniyor:787935238591610881>`)
	   .setDescription(`
     **[Destek Sunucumuza](https://discord.gg/5XAqSFrp98) Gelerek Ücretsiz Bir Şekilde Premium Alabilirsiniz**
   **» ${prefix}reklamlog ** <a:quirky_sagok:787938465228390400> Reklam engel logunu ayarlarsınız.
   **» ${prefix}küfürlog ** <a:quirky_sagok:787938465228390400> Küfür engel logunu ayarlarsınız.
   **» ${prefix}rol ** <a:quirky_sagok:787938465228390400> Ayarlamalı rol alma/verme sistemidir.
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
  aliases: ['premium-sistemi'],
  permLevel: 0,
};

exports.help = {
  name: 'yardım-premium',
  description: 'a!davet-sistemi Menüsü',
  usage: 'moderasyon'
};