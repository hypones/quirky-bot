const Discord = require('discord.js');
const db = require("quick.db")
const ms = require('ms');
exports.run = async (award, message, args) => {


   
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send("Bu komut için Mesajları Yönet yetkisine ihtiyacın var.");
            return;
          }
    
    let gweep = args[0];
    let kazanan = args[1];
    let odul = args[2];
    let zaman = args[3];
    if(!gweep) return message.channel.send("Yanlış Kullanım! (Doğrusu: <mesajid> <Kazananlar> <Ödül> <Zaman>)")
    if(!kazanan) return message.channel.send("Kazanan Sayısını Girmediniz!  (Doğrusu: <mesajid> <Kazananlar> <Ödül> <Zaman>)")
    if(!odul) return message.channel.send("Ödül Girmediniz!  (Doğrusu: <mesajid> <Kazananlar> <Ödül> <Zaman>)")
    if(!ms(zaman) && zaman) return message.channel.send("Zamanı Yanlış girdiniz!  (Doğrusu: <mesajid> <Kazananlar> <Ödül> <Zaman>)")
            award.giveawaysManager.edit(gweep, {
                newWinnerCount: kazanan,
                newPrize: odul,
                addTime: ms(zaman)
            }).then(() => {
                message.channel.send("Başarılı! Çekiliş Düzenlendi!");
            }).catch((err) => {
                message.channel.send("Çekilişi Bulamadım.");
            });
    }
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'edit',
  description: '',
  usage: ''
};