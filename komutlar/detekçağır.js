const Discord = require("discord.js");
 
exports.run = function(client, message, args) {
 
  var guildID = "768743312580280330"; // Sunucu ID
 
  var channelID = "807335736495177770"; // Kanal ID
 
   const kanal = client.channels.cache.find(c => c.id === "807335736495177770")
    
    message.channel.createInvite({maxAge: 0}).then((invite) => {
    const embed = new Discord.MessageEmbed()
 
      .setTimestamp()
 
      .setColor("RANDOM")
 
      .addField("Eylem:", "Destek Çağrısı")
 
      .addField(` Sunucu Davet Linki`, invite.url, true)
      .addField("Kullanıcı:", message.author.tag)
 
      .addField("ID", message.author.id); 
    client.guilds
      .cache.get(guildID)
      .channels.cache.get(channelID)
      .send("<@&802944914027446272>")
 
      kanal.send(embed)
      
    message.channel.send("Çağrınız alınmıştır! Teşekkür ederiz...");
  }
                                                  )
  }


 
exports.conf = {
  enabled: true,
 
  guildOnly: false,
 
  aliases: ["destekçağır", 'çağır'],
 
  permLevel: 0
};
 
exports.help = {
  name: "destek",
 
  description: "Bot hakkındaki önerilerinizi bot sahibine ulaştırır.",
 
  usage: "öneri "
};
 