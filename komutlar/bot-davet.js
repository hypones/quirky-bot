const Discord = require("discord.js")
const fs = require("fs")
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  	let p = db.fetch(`prefix.${message.guild.id}`) || ayarlar.prefix;

const embed = new Discord.MessageEmbed()
.setColor("#ffd100")
.setAuthor(`Quirky Linkler`, client.user.avatarURL())
.setDescription('**• [Sitemiz](https://bot.quirkyweb.cf/)**\n\n**• [Quirky Botu Ekleyin.](https://discord.com/oauth2/authorize?client_id=778683285692874815&scope=bot&permissions=8)**\n\n**• [Destek Sunucusuna Gel](https://discord.gg/QUxUzmcJvY)**\n\n**• [Oy Ver](https://top.gg/bot/778683285692874815/vote)**')
.setFooter(`${message.author.username} tarafından istendi!`) 
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)   
 };

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};
exports.help = {
    name: "davet",
    description: "15 Temmuz Marşı'nı çalar.",
    usage: "15-temmuz <çal/bitir>"
};