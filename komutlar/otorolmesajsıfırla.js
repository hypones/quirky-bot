const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 

if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<a:by:752306236606906399> **Bu komutu kullanabilmek için** "\`Yönetici\`" **yetkisine sahip olmalısın.**`);
 const rol = db.fetch(`otoRM_${message.guild.id}`) 
 if(!rol) return message.reply(`:x: **Ayarlanmamış bir özellik sıfırlanamaz! **`)
 
 
  message.channel.send(`<a:yesil_dogrulama:771039259330084885> **Otorol mesajı başarılı bir şekilde sıfırlandı.**`)

 
 db.delete(`otoRM_${message.guild.id}`)  

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 0,
    aliases: ['otorol-mesaj-sıfırla']
  };
  
  exports.help = {
    name: 'otorol-mesaj-sıfırla',
    description: 'Türkiyenin Saatini Gösterir',
    usage: 'gç'
  };