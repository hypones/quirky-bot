
  exports.run = (client, message) => {
        let db = require("quick.db")
        let Discord = require("discord.js")
    let reklam = db.fetch(`reklam.${message.guild.id}.durum`)
//
       if (!db.has(`premod_${message.guild.id}`) == true) {
    
      const westrabumbeyyy = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(` Bu sunucuda premium mod aktif değil. Bu yüzden bu komutu kullanamazsınız. Fakat [Destek Sunucumuzdan] **Ücretsiz** Bir Şekilde Alabilirsiniz`)
      return message.channel.send(westrabumbeyyy)

    
  } else {
  
    //
  const member3 = new Discord.MessageEmbed()
     .setColor("CYAN")
.setDescription(`<a:atlantis_carpi:774167195671461938> **HATA** <a:atlantis_carpi:774167195671461938> - Bu Sunucuda Yetkili Değilsin.`)
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(member3)
    const member = new Discord.MessageEmbed()
     .setColor("CYAN")
.setDescription(`<a:atlantis_carpi:774167195671461938> **HATA** <a:atlantis_carpi:774167195671461938> - Bir Kanal Etiketle.`)
      if(reklam) {
        let kanal = message.mentions.channels.first()
        if(!kanal) return message.channel.send(member)
      db.set(`reklam.${message.guild.id}.kanal`,kanal.id)
      message.channel.send(`<a:atlantis_guvenli:769980927274254367> **Başarılı ile reklam log kanalı ayarlandı.** <a:atlantis_guvenli:769980927274254367>`).then(l => {
      l.delete({timeout: 5000})
    })
    }else{
     message.channel.send(`<a:atlantis_carpi:774167195671461938> **Reklam engel açık değil.** <a:atlantis_carpi:774167195671461938>`).then(l => {
      l.delete({timeout: 5000})
    })
    }
    }
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["reklam-log"],
  permLevel: 0
};

exports.help = {
  name: 'reklamlog',
  description: 'WESTRA',
  usage: 'WESTRA'
}