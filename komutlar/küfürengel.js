
 exports.run = (client, message) => {
        let db = require("quick.db")
        let Discord = require("discord.js")
  
    let küfür = db.fetch(`küfür.${message.guild.id}.durum`)
  const member3 = new Discord.MessageEmbed()
     .setColor("CYAN")
.setDescription(`<a:atlantis_carpi:776057180612722699> **HATA** <a:atlantis_carpi:776057180612722699> - Bu Sunucuda Yetkili Değilsin.`)
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(member3)
      if(küfür) {
      db.delete(`küfür.${message.guild.id}`)
      message.channel.send(`<a:atlantis_guvenli:769980927274254367>**Başarılı ile küfür engel kapandı.** <a:atlantis_guvenli:769980927274254367>`).then(l => {
      l.delete({timeout: 5000})
    })
    }else{
      db.set(`küfür.${message.guild.id}.durum`,true)
      message.channel.send(`<a:atlantis_guvenli:769980927274254367> **Başarılı ile küfür engel açıldı. ** <a:atlantis_guvenli:769980927274254367>`).then(l => {
      l.delete({timeout: 5000})
    })
    }
    }

 exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["küfür"],
  permLevel: 0
};

exports.help = {
  name: 'küfürengel',
  description: 'WESTRA',
  usage: 'WESTRA'
}