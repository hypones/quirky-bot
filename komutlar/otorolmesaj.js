const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async (client, message, args) => { 
let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
  
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<a:by:752306236606906399>  **Bu komutu kullanabilmek için** "\`Yönetici\`" **yetkisine sahip olmalısın.**`);
  
  let mesaj = args.slice(0).join(' ');
  if(mesaj.length < 5) return message.channel.send('<a:atlantis_carpi:776057180612722699>  **Sayaç Hoşgeldin Mesaj Sistemi İçin En Az 5 Karakter Belirtebilirsin!**\n Kullanabileceğin Belirtmeler : -uye- -uyetag- -rol- -server- -uyesayisi- -botsayisi- -bolge- -kanalsayisi-')
  
 message.channel.send('<a:yesil_dogrulama:771039259330084885> **Oto Rol mesajı** `'+mesaj+'` **Olarak ayarlandı!**') 
 db.set(`otoRM_${message.guild.id}`, mesaj)  

  
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 0,
    aliases: ['otorol-mesaj']
  };
  
  exports.help = {
    name: 'otorol-mesaj',
    description: 'Türkiyenin Saatini Gösterir',
    usage: 'gç'
  };