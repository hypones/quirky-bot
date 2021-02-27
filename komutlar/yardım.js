const Discord = require("discord.js")

exports.run = async(client, message, args) => {
  
  let title = [`▬▬▬▬▬▬[ <a:quirky_hawli:796271213688520724> Quirky Bot <a:quirky_hawli:796271213688520724> ]▬▬▬▬▬▬`]
  
  // title \\
  
  let desc = [`> <a:quirky_moderation:783215662733459466>  **.moderasyon** : Moderasyon Komutları Gösterir. 

  > <a:quirky_zipzipzipzip:787056788352663603>  **.gif** : Gif Komutlarını Gösterir.
  
  > <a:quirky_cat:796657921093926933>  **.eğlence** : Eğlence Komutlarını Gösterir.
  
  > <:quirky_guard:796275469355319297>  **.guard** : Koruma Komutlarını Gösterir.
  
  > <a:jptr_moralev:774167123311984650>  **.kayıt-sistem** : Kayıt Sistemini Gösterir.
  
  > <a:atlantis_danscikdanscik:770228477261512714>  **.ekkomutlar** : Ek Komutları Gösterir.
    
  > <a:quirky_hypesquad:789538385052172298>  **.otocevap** : Otocevap Sistemini Gösterir.
   
  > <a:quirky_kelebek:783243460069163040>  **.kullanıcı** : Kullanıcı Komutlarını Gösterir
  
  > <a:quirky_cekilis:783596358153404466>  **.çekiliş** : Çekiliş Komutlarını Gösterir
  
  > <a:quirky_premium:789428938455515186> **.seviye-yardım** : Seviye Sistemi Komutlarını Gösterir
  
  ▬▬▬▬▬▬[ :white_flower: Bilgilendirme :white_flower: ]▬▬▬▬▬▬
 > <a:quirky_unlem:783212881981734943> Fikirleriniz değerlidir, Belirtmekten asla çekinmeyin! **.öneri**
 > <a:quirky_unlem:783212881981734943> Botun Destek Sunucusuna Gelmek İçin [Tıkla](https://discord.gg/b9NXRN39HM)!
 > <a:quirky_unlem:783212881981734943> Eğer Kurulumda Bir Sorun Varsa **.destek** İle Destek Çağırabilirsiniz
  `]
  const yardım = new Discord.MessageEmbed()
.setTitle(title)
.setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
.setDescription(desc)
.addField(`» Quirky Bot Bağlantıları`, ` <a:quirky_alevv:787937467176583189> [Bot Davet Linki](http://gg.gg/quirky) **|** [Sitemiz](https://bot.quirkyweb.cf) **|** [Destek Sunucusu](https://discord.gg/b9NXRN39HM) **|** [Oy Linki](https://top.gg/bot/778683285692874815/vote) **|** <a:quirky_alevv:787937467176583189>`)
.setImage("https://cdn.discordapp.com/attachments/789426859745607690/789989472338313246/standard.gif");
  
  
  
  
  
  
  
  message.channel.send(yardım)
  
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yardım'
};

