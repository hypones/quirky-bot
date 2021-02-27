const Discord = require("discord.js")

exports.run = async(client, message, args) => {

let title = [` <a:quirky_hawli:796271213688520724> Quirky Bot <a:quirky_hawli:796271213688520724>`]
let desc = [`
▬▬▬▬▬▬[**Abone Sistemi!**]▬▬▬▬▬▬
**.aboneverici** : Abone Rolü Yetkilisini Ayarlar.
**.abone-rol** : Abone Rolünü Ayarlar.
**.abone** : Bir Kişiye Abone Rolü Verir.

▬▬▬▬▬▬[**Jail Sistemi**]▬▬▬▬▬▬
**.jail-rol**: Jail Rolünü Ayarlar.
**.jail-yetkili**: Jail Yetkilisini Ayarlar.
**.jail**: Bir Kişiyi Jaile Atar.

▬▬▬▬▬▬[**Eğlence Komutları**]▬▬▬▬▬▬
**.1v1**: Birisiyle Düello Yaparsınız.
**.alivefa**: Sunucunuzdaki Alivefayı Bulursunuz.
**.anime-ara**: Bir Animenin Özelliklerine Bakarsınız
**.yılbaşı**: Yılbaşına Kaç Gün Kaldığına Bakarsınzı`]

const embed = new Discord.MessageEmbed()
.setTitle(title)
.setDescription(desc)
             .addField(`» Quirky Bot Bağlantıları`, ` <a:quirky_alevv:787937467176583189> [Bot Davet Linki](http://gg.gg/quirky) **|** [Sitemiz](https://bot.quirkyweb.cf) **|** [Destek Sunucusu](https://discord.gg/b9NXRN39HM) **|** [Oy Linki](https://top.gg/bot/778683285692874815/vote) **|** <a:quirky_alevv:787937467176583189>`)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
.setThumbnail("https://images-ext-2.discordapp.net/external/WqQ--8rHc3NGvmMjqeMwK37L9HlLYLempQ9RF9d4Xao/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/778683285692874815/f384b694ee738fb2580fb2e255e4a973.png");
  
  return message.channel.send(embed)






};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ek-komutlar'],
  permLevel: 0,
};

exports.help = {
  name: 'ekkomutlar',
  description: 'a!davet-sistemi Menüsü',
  usage: 'kayıt-sistemi'
};
