const Discord = require("discord.js")
const ffmpeg = require("ffmpeg");
const ytdl = require('ytdl-core');
exports.run = function (client, message, args) {


   
          const turk = new Discord.MessageEmbed()
          .setTitle('Ne mutlu Türküm diyene!')
          .setImage('https://yunti.files.wordpress.com/2018/07/15temmuz_03_tam35-blogspot-com.gif')
          return message.channel.send(turk)
          return;
    };

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};
exports.help = {
    name: "türkiye",
    description: "15 Temmuz Marşı'nı çalar.",
    usage: "15-temmuz <çal/bitir>"
};