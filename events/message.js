const Discord = require('discord.js');
const moment = require ('moment')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');
module.exports = message => {
  
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  
  if (!client.commands.has(command)) {
    if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    } else {
      if(command == '') return;
        const embed = new Discord.MessageEmbed()
    .setDescription("<a:atlantis_carpi:776057180612722699> `" + command + '` Adında Bir Komut Yok! Komutları Görmek İçin Lütfen .yardım Yazınız!')
    message.channel.send(embed).then(m => m.delete({timeout: 4000}))
    }
  }
  
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
};

