
  exports.run = (client, message) => {
        let db = require("quick.db")
        let Discord = require("discord.js")
    let küfür = db.fetch(`küfür.${message.guild.id}.durum`)
//

    //
  const member3 = new Discord.MessageEmbed()
     .setColor("CYAN")
.setDescription(`<a:atlantis_carpi:776057180612722699> **HATA** <a:atlantis_carpi:776057180612722699> - Bu Sunucuda Yetkili Değilsin.`)
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(member3)
    const member = new Discord.MessageEmbed()
     .setColor("CYAN")
.setDescription(`<a:atlantis_carpi:776057180612722699> **HATA** <a:atlantis_carpi:776057180612722699> - Bir Kanal Etiketle.`)
      if(küfür) {
        let kanal = message.mentions.channels.first()
        if(!kanal) return message.channel.send(member)
      db.set(`küfür.${message.guild.id}.kanal`,kanal.id)
      message.channel.send(`<a:atlantis_guvenli:769980927274254367> **Başarılı ile küfür log kanalı ayarlandı.** <a:atlantis_guvenli:769980927274254367>`).then(l => {
      l.delete({timeout: 5000})
    })
    }else{
     message.channel.send(`<a:atlantis_carpi:776057180612722699> **Küfür engel açık değil.** <a:atlantis_carpi:776057180612722699>`).then(l => {
      l.delete({timeout: 5000})
    })
    }
    }
  

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["küfür-log"],
  permLevel: 0
};

exports.help = {
  name: 'küfürlog',
  description: 'WESTRA',
  usage: 'WESTRA'
}