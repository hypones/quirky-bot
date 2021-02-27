const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async(client, message, args) => {

let kisi = message.mentions.members.first();

  var rol = db.fetch(`muteroluid_${message.guild.id}`);
var rol = message.guild.roles.cache.find(r => r.id === rol);  
  
  if(!rol) return message.channel.send("Mute Rolünü Ya Benimle Oluşturmadın Ya da Benim Oluşturduğun Rolü Sildin");
  
if(!kisi) return message.channel.send("Birini Etiketlemelisin");
  
 kisi.roles.remove(rol)
  message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription("Kullanıcının Susturmasını Açtım"));
  
//susturdu  //unmute calışmıyor 

//silemedim //abe banada yapsak söyle güzel yardım menüsü .d
  //:p //ne olurrrrrrr :d bak calarım sdsdsdsdsd 

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['susturma-aç'],
  permLevel: 0,
};

exports.help = {
  name: 'unmute',
  description: 'a!davet-sistemi Menüsü',
  usage: 'kayıt-sistemi'
};