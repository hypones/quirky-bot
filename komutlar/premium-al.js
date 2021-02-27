const Discord = require('discord.js')
const fs = require('fs');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => { 
  
if(message.author.id !== ayarlar.sahip) if(message.author.id !== '586560481628782633')
    
      return;
  

 const args0 = args[0];
  if(!args0) {
    message.channel.send(":x: Sunucu **ID** yazmalısın!")
  } else {
  
db.set(`premod_${args0}`, "iptal")
  message.channel.send("Başarıyla premium iptal edildi.")
}
  }
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['premium-al'],
    permLevel: 0,
      
}

exports.help = {
    name: 'premium-al',
    description: '',
    usage: '',

}