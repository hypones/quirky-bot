const fs=require('fs');
const Discord=require("discord.js");
const client=new Discord.Client();
const db = require('quick.db')
const data = require('quick.db')
const moment = require("moment");
var Jimp = require('jimp');
const ayarlar = require("./ayarlar.json");
const { GiveawaysManager } = require('discord-giveaways');
const fynx = require("./ayarlar.json");
const Canvas = require("canvas")
let prefix = ayarlar.prefix
/////


client.on("message", message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.yetkiler(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
})




const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} adet komut yüklemeye hazırlanılıyor.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut ismi: ${props.help.name.toUpperCase()}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();
  setInterval(async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
});


client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);//lrowsxrd
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};



client.yetkiler = message => {
  if(!message.guild) {
    return; }
  let permlvl = -ayarlar.varsayilanperm  ;
  if(message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if(message.member.hasPermission("KICK_MEMBERS")) permlvl = 2;
  if(message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
  if(message.member.hasPermission("MANAGE_GUILD")) permlvl = 4;
  if(message.member.hasPermission("ADMINISTRATOR")) permlvl = 5;
  if(message.author.id === message.guild.ownerID) permlvl = 6;
  if(message.author.id === ayarlar.sahip) permlvl = 7;
  return permlvl;
};

//-------------Kendini Sağirlaştirma Komutu ---------------\\

client.on('voiceStateUpdate', async (___, newState) => {
if (
newState.member.user.bot &&
newState.channelID &&
newState.member.user.id == client.user.id &&
!newState.selfDeaf
) {
newState.setSelfDeaf(true);
}
});
//---------------------------------------------------------\\


client.login(ayarlar.token)
.then(function() {
console.log('Token doğru. Bot aktif ediliyor.')
}, function(err) {
console.log("Tokeniniz yanlış. Bot başlatılamıyor.")
setInterval(function() {
process.exit(0)
}, 20000);
})

//------------------Değişen Oynuyor---------------------------\\

const bot = new Discord.Client();

var oyun = [
`✨ Yardım almak için | .yardım`,
`🚀 Yeni Özellikler İçin | .yardım`,
`🔔 Yenilenen Tasarımı İle`,
`⚡️ Botu eklemek için | .davet`
]
  
client.on("ready", () => {
setInterval(function() {

         var random = Math.floor(Math.random()*(oyun.length-0+1)+0);
         client.user.setActivity(oyun[random], {"type": "PLAYING"});

        }, 2 * 5000);
});


//küfür engel //
const küfür = [
        "siktir",
        "fuck",
        "puşt",
        "pust",
        "piç",
        "sikerim",
        "sik",
        "yarra",
        "yarrak",
        "amcık",
        "orospu",
        "orosbu",
        "orosbucocu",
        "oç",
        ".oc",
        "ibne",
        "yavşak",
        "bitch",
        "dalyarak",
        "amk",
        "awk",
        "taşak",
        "taşşak",
        "daşşak",
		"sikm",
		"sikim",
		"sikmm",
		"skim",
		"skm",
		"sg"
      ];
client.on("messageUpdate", async (old, nev) => {
  
    if (old.content != nev.content) {
    let i = await db.fetch(`küfür.${nev.member.guild.id}.durum`);
    let y = await db.fetch(`küfür.${nev.member.guild.id}.kanal`);
   if (i) {
      
      if (küfür.some(word => nev.content.includes(word))) {
      if (nev.member.hasPermission("BAN_MEMBERS")) return ;
       //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
 const embed = new   Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<a:atlantis_carpi:776057180612722699> ${nev.author} , **Mesajını Editleyerek Küfür Etmeye Çalıştı!**`)
            .addField("Küfür:",nev)
        
            nev.delete();
            const embeds = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<a:atlantis_carpi:776057180612722699> ${nev.author} , **Ben Aptal Değilim Bu Sunucuyu 7/24 Koruyorum!!**`) 
          client.channels.cache.get(y).send(embed)
            nev.channel.send(embeds).then(msg => msg.delete({timeout:5000}));
          
      }
    } else {
    }
    if (!i) return;
  }
});

client.on("message", async msg => {

     
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
         let y = await db.fetch(`küfür.${msg.member.guild.id}.kanal`);
   
    let i = await db.fetch(`küfür.${msg.member.guild.id}.durum`);
          if (i) {
              if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                 if (!msg.member.hasPermission("MANAGE_GUILD")) {
                 //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
     msg.delete({timeout:750});
                    const embeds = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<a:atlantis_carpi:776057180612722699> <@${msg.author.id}> , **Bu Sunucuda Küfür Yasak!**`)
      msg.channel.send(embeds).then(msg => msg.delete({timeout: 5000}));
                const embed = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<a:atlantis_carpi:776057180612722699> ${msg.author} , **Küfür Etmeye Çalıştı!**`) .addField("Mesajı:",msg)
               client.channels.cache.get(y).send(embed)
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
         if(!i) return ;
});

//küfür engel son //


client.on('ready', async () => {
console.log(`${client.user.username} ismiyle bağlandım.`);
})


////RESIMLI GUVENLIK////

client.on('guildMemberAdd',async member => {
  let user = client.users.cache.get(member.id);
  let kanal = client.channels.cache.get(db.fetch(`guvenlik${member.guild.id}`)) 
       const Canvas = require('canvas')
       const canvas = Canvas.createCanvas(360,100);
       const ctx = canvas.getContext('2d');
  
  const resim1 = await Canvas.loadImage('https://i.hizliresim.com/DWmOSd.png')
    const resim2 = await Canvas.loadImage('https://i.hizliresim.com/hIvMtu.png')
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment(kurulus).format('dddd');  
    var kontrol;
      if (kurulus > 2629800000) kontrol = resim2
    if (kurulus < 2629800000) kontrol = resim1


     const background = await Canvas.loadImage("https://muzipmasalcini.com/wp-content/uploads/2019/11/kurt-kastamonu-masali-muzipmasalcini.jpg");
       ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: "png"}));
  ctx.drawImage(kontrol,0,0,canvas.width, canvas.height)
  ctx.beginPath();
    ctx.lineWidth = 4;
  ctx.fill()
    ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
    ctx.clip();
  ctx.drawImage(avatar, 143,10, 73, 72  );

   if (!kanal) return
       const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'quirkygüvenlik.png');
    kanal.send(attachment)
});

///////////RESIMLI GUVENLIK//////////



//////////////EKLENDİM ATİLDİM ////

client.on("guildCreate", (guild,bot) => {
  let log = client.channels.cache.get("802968641846640641");
  const embed = new Discord.MessageEmbed()
    .setAuthor("Yeni bir sunucuya eklendim!")
    .setThumbnail(guild.iconURL())
    .setColor("BLUE")
    .addField("<a:quirky_cark:786899463637696543> Sunucu İsmi:", guild.name)
    .addField("<a:quirky_cark:786899463637696543> Sunucu ID:", guild.id)
    .addField("<a:quirky_cark:786899463637696543> Sunucu Sahibi:", guild.owner)
    .addField("<a:quirky_cark:786899463637696543> Sunucu Bölgesi:", guild.region)
    .addField("<a:quirky_cark:786899463637696543> Sunucu Üye Sayısı:", guild.members.cache.size)
    .addField("<a:quirky_cark:786899463637696543> Sunucu Kanal Sayısı:", guild.channels.cache.size)
    .addField("<a:quirky_cark:786899463637696543> Sunucu Rol Sayısı:", guild.roles.cache.size)
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL)
    .setImage('https://media1.tenor.com/images/ca7430d955f70ba46c300ca5c04aaaa4/tenor.gif');
  log.send(embed);
});


client.on("guildRemove", (guild,bot) => {
  let log = client.channels.cache.get("802968641846640641");
  const embed = new Discord.MessageEmbed()
    .setAuthor("Bir sunucudan atıldım!")
    .setThumbnail(guild.iconURL())
    .setColor("BLUE")
    .addField("<a:quirky_cark:786899463637696543> Sunucu İsmi:", guild.name)
    .addField("<a:quirky_cark:786899463637696543> Sunucu ID:", guild.id)
    .addField("<a:quirky_cark:786899463637696543> Sunucu Sahibi:", guild.owner)
    .addField("<a:quirky_cark:786899463637696543> Sunucu Bölgesi:", guild.region)
    .addField("<a:quirky_cark:786899463637696543> Sunucu Üye Sayısı:", guild.members.cache.size)
    .addField("<a:quirky_cark:786899463637696543> Sunucu Kanal Sayısı:", guild.channels.cache.size)
    .addField("<a:quirky_cark:786899463637696543> Sunucu Rol Sayısı:", guild.roles.cache.size)
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL)
    .setImage('https://tenor.com/view/sad-baby-frown-cry-tantrums-gif-4649018');
  log.send(embed);
});

client.on("guildCreate", guild => {
const kanal = guild.channels.cache.random();
const hebele = new Discord.MessageEmbed()
.setAuthor(client.user.tag, client.user.avatarURL())
.setDescription("SELAAAM!")
.addField("Hey,Ben **Quirky Bot**. Beni bu muhteşem ötesi sunucuya davet ettiğin için sana minnetarım.", "Daha önce hiç böyle bir sunucu görmemiştim^^ Kendimden bahsedeyim. Yaşım 26, Almanyada yaşıyo-.. Tamam sadece şakaydı. Aslına bakarsan kullanımım çok basit." )
.addField("**Sana bazı Sistemlerimden Bahsetmek isterim...**","Moderasyon, Eğlence, Çekiliş ve daha fazlası...")
.addField("Sadece -yardım Yazarak Tüm Komutlarıma Ulaşabilirsiniz", "Hepsi Emrine Amade :)")
.setThumbnail("https://cdn.discordapp.com/avatars/778683285692874815/37b50778143e69779e0e97af67e84fda.webp")
.addField("Linkler", "[Oy Ver!](https://cdn.discordapp.com/attachments/782826958542602271/783246877851385877/2322large.png) | [Davet Et!](https://discord.com/oauth2/authorize?client_id=778683285692874815&scope=bot&permissions=8) | [Destek Sunucusu](https://discord.gg/GVRHSXfxn2)")
.setFooter("developed for you baby :c")
kanal.send(hebele)
});


client.on("message", msg => {
	//let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
	const westrabumbe = new Discord.MessageEmbed()
	.setColor("RANDOM")
	.setDescription(`Sanırım Yardıma İhtiyacın Var :)\nPrefixim **.**\nYardım Almak İstersen **.yardım** Yazabilirsin\n\n[Destek Sunucusu](https://discord.gg/b9NXRN39HM) • [Davet Et](https://discord.com/oauth2/authorize?client_id=778683285692874815&scope=bot&permissions=2147483647) • [Site](https://bot.quirkyweb.cf)`)
  if (msg.content.includes(`<@${client.user.id}>`) || msg.content.includes(`<@!${client.user.id}>`)) {
    msg.channel.send(westrabumbe);
  }
});


// AYARLANABİLİR KAYIT KANAL //
// AYARLANABİLİR KAYIT KANAL //
client.on("guildMemberAdd", member => {
  let guild = member.guild;
  let kanal = db.fetch(`kayıthg_${member.guild.id}`);
  let kayıtçı = db.fetch(`kayıtçırolqwed_${member.guild.id}`);
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  let aylar = aylartoplam;

  let user = client.users.cache.get(member.id);
  require("moment-duration-format");

  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const ayyy = moment.duration(kurulus).format("M");
  var kontrol = [];

  if (ayyy < 1) {
    kontrol = "**Şüpheli** <a:quirky_supheli:787942710857957386>";
  }
  if (ayyy > 1) {
    kontrol = "**Güvenilir** <a:atlantis_guvenli:769980927274254367>";
  }

  if (!kanal) return;

  ///////////////////////

  let randomgif = [ 
             "https://media.discordapp.net/attachments/744976703163728032/751451554132918323/tenor-1.gif", "https://media.discordapp.net/attachments/744976703163728032/751451693992116284/black.gif", "https://media.discordapp.net/attachments/765870655958548490/765871557993824256/tumblr_ozitqtbIIf1tkflzao1_540.gif", "https://media.discordapp.net/attachments/765870655958548490/765871565257965578/68747470733a2f2f692e70696e696d672e636f6d2f6f726967696e616c732f32622f61352f31312f32626135313161663865.gif"];

  ///////////////////
  const embed = new Discord.MessageEmbed()
    .setColor("36393F")
    .setImage(randomgif[Math.floor(Math.random() * randomgif.length)])
    .setThumbnail(
      user.avatarURL({
        dynamic: true,
        format: "gif",
        format: "png",
        format: "jpg",
        size: 2048
      })
    )

    .setDescription(
      `<a:quirky_galp:787959981664239657> **Ailemize Hoşgeldin!** ${
        member.user
      }, seninle beraber **${
        guild.memberCount
      }** kişi olduk! \n\n<a:quirky_premium:789428938455515186> ${member.user.tag} Aramıza Katıldığına Göre Parti Başlasın!\n\n<a:atlantis_elmass:774167249208213524> Kaydının yapılması için  **İsim** ve **Yaş** Yazman Gerek.\n\n<a:quirky_yukleniyor:787935238591610881> Hesap Kuruluş: **${moment(
        user.createdAt
      ).format("DD")} ${aylar[moment(user.createdAt).format("MM")]} ${moment(
        user.createdAt
      ).format(
        "YYYY HH:mm:ss"
       )}** \n\n<a:quirky_unlem:786714407638925332> Kuralları Okumayı Unutma!\n\n<a:quirky_neon:787959481454559243> Bu vatandaş: ${kontrol} \n\n<a:quirky_sagok:787938465228390400>  <@&${kayıtçı}> Rolundeki Yetkililer Sizinle İlgilecektir
  `  
    );

  client.channels.cache.get(kanal).send(`Hoşgeldin <@${member.user.id}>, <@&${kayıtçı}> Rolündekiler Seninle İlgilenecektir`);
  client.channels.cache.get(kanal).send(embed);
});
//kayıt kanal son //


//ototag sistemi //
client.on('guildMemberAdd', async member => {

  

  let emran = await db.fetch(`ototag.${member.guild.id}`);

  let tanersins;

  if (emran == null) tanersins = member.setNickname(`${member.user.username}`)

  else tanersins = member.setNickname(`${emran} ${member.user.username}`)

});

client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`otoRK_${member.guild.id}`);
  let rol = await db.fetch(`otoRL_${member.guild.id}`);
  let mesaj = db.fetch(`otoRM_${member.guild.id}`);
  if (!rol) return;

  if (!mesaj) {
    client.channels.cache
      .get(kanal)
      .send(new Discord.MessageEmbed().setDescription(
        "<a:jptr_galpppp:771304406905258034>" +
          member.user.username +
          "`** HoşGeldin! Otomatik Rolün Verildi Seninle Beraber** `" +
          member.guild.memberCount +
          "` **Kişiyiz!**"
      ).setColor("RANDOM"));
    return member.roles.add(rol);
  }

  if (mesaj) {
      var mesajs = mesaj
        .replace("-uye-", `${member.user}`)
        .replace("-uyetag-", `${member.user.tag}`)
        .replace("-rol-", `${member.guild.roles.cache.get(rol).name}`)
        .replace("-server-", `${member.guild.name}`)
        .replace("-uyesayisi-", `${member.guild.memberCount}`)
        .replace(
          "-botsayisi-",
          `${member.guild.members.cache.filter(m => m.user.bot).size}`
        )
        .replace("-bolge-", `${member.guild.region}`)
        .replace("-kanalsayisi-", `${member.guild.channels.cache.size}`);
      member.roles.add(rol);
      return client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setDescription(mesajs).setFooter("Quirky Bot | Otorol Sistemi"));
    }
  });


//// Seviye ///
client.on("message", async msg => {

  if(msg.content.startsWith(ayarlar.prefix)) return;

  const db = require('quick.db');

  var id = msg.author.id;

  var gid = msg.guild.id;

  var xp = await db.fetch(`xp_${id}_${gid}`);

  var lvl = await db.fetch(`lvl_${id}_${gid}`);

  let seviyexp = await db.fetch(`seviyexp${msg.guild.id}`)

  const skanal = await db.fetch(`seviyekanal${msg.guild.id}`)

  let kanal = msg.guild.channels.cache.get(skanal)

  if (msg.author.bot === true) return;

  let seviyeEmbed = new Discord.MessageEmbed()

   seviyeEmbed.setDescription(`Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${lvl+1}** seviye oldun!`)

   seviyeEmbed.setFooter(`${client.user.username} | Seviye Sistemi`)

   seviyeEmbed.setColor("RANDOM")

   if(!lvl) {

    db.set(`xp_${id}_${gid}`, 5);

    db.set(`lvl_${id}_${gid}`, 1);

    db.set(`xpToLvl_${id}_${gid}`, 100);

    db.set(`top_${id}`, 1)

    }

  

  let veri1 = [];

  

  if(seviyexp) veri1 = seviyexp

  if(!seviyexp) veri1 = 5

  

  if (msg.content.length > 7) {

    db.add(`xp_${id}_${gid}`, veri1)

  };

  let seviyesınır = await db.fetch(`seviyesınır${msg.guild.id}`)

    let veri2 = [];

  

  if(seviyesınır) veri2 = seviyesınır

  if(!seviyesınır) veri2 = 250

   

  if (await db.fetch(`xp_${id}_${gid}`) > veri2) {

    if(skanal) {

 kanal.send(new Discord.MessageEmbed()

   .setDescription(`Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${lvl+1}** seviye oldun:tada:`)

   .setFooter(`${client.user.username} | Seviye Sistemi`)

   .setColor("RANDOM"))

    }

    db.add(`lvl_${id}_${gid}`, 1)

    db.delete(`xp_${id}_${gid}`)};

    db.set(`top_${id}`, Math.floor(lvl+1))

  });

//SEVİYE-ROL-----------------------------------

client.on('message', async message => {

  var id = message.author.id;

  var gid = message.guild.id;

  let rrol = await db.fetch(`rrol.${message.guild.id}`)

  var level = await db.fetch(`lvl_${id}_${gid}`);

  

    if(rrol) {

  rrol.forEach(async rols => {

    var rrol2 = await db.fetch(`rrol2.${message.guild.id}.${rols}`)

    if(Math.floor(rrol2) <= Math.floor(level)) {

      let author = message.guild.member(message.author)

      author.roles.add(rols)

    }

     else if(Math.floor(rrol2) >= Math.floor(level)) {

      let author = message.guild.member(message.author)

      author.roles.remove(rols)

    }

  })

  }

  

    if(message.content == '.rütbeler') {

    if(!rrol) {

                message.channel.send(new Discord.MessageEmbed()

                      .setColor("RANDOM")

                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)

                      .setDescription(`Herhangi bir rol oluşturulmadı.`))

      

      

      return;

    }

        const { MessageEmbed } = require('discord.js')

      let d = rrol.map(x => '<@&'+message.guild.roles.cache.get(x).id+'>' + ' **' + db.get(`rrol3.${message.guild.id}.${x}`)+' Seviye**' ).join("\n")

    message.channel.send(new MessageEmbed()

                      .setColor("RANDOM")

                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)

                      .setDescription(`${d}`))

  }

  

  

})

client.on('message', async message => {

   var id = message.author.id;

  var gid = message.guild.id;

  let srol = await db.fetch(`srol.${message.guild.id}`)

  var level = await db.fetch(`lvl_${id}_${gid}`);

  if(srol) {

  srol.forEach(async rols => {

    var srol2 = await db.fetch(`srol2.${message.guild.id}.${rols}`)

    if(Math.floor(srol2) <= Math.floor(level)) {

      let author = message.guild.member(message.author)

      author.roles.add(rols)

    }

     else if(Math.floor(srol2) >= Math.floor(level)) {

      let author = message.guild.member(message.author)

      author.roles.remove(rols)

    }

  })

  }

    if(message.content == '.seviyerolleri' || message.content == ".levelroles") {

    if(!srol) {

                message.channel.send(new Discord.MessageEmbed()

                      .setColor("RANDOM")

                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)

                      .setDescription(`Herhangi bir rol oluşturulmadı.`))

      return;

    }

        const { MessageEmbed } = require('discord.js')

      let d = srol.map(x => '<@&'+message.guild.roles.cache.get(x).id+'>' + ' **' + db.get(`srol3.${message.guild.id}.${x}`)+' Seviye**' ).join("\n")

    message.channel.send(new MessageEmbed()

                      .setColor("RANDOM")

                      //.setColor(message.guild.member(message.author).highestRole.hexColor)

                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)

                      .setDescription(`${d}`))

  }

  

})


///////mod-log

client.on("messageDelete", async (message) => {

  if (message.author.bot || message.channel.type == "dm") return;

  let log = message.guild.channels.cache.get(await db.fetch(`log_${message.guild.id}`));

  if (!log) return;

  const embed = new Discord.MessageEmbed()

    .setTitle(message.author.username + " | Mesaj Silindi")

    .addField("Kullanıcı: ", message.author)

    .addField("Kanal: ", message.channel)

    .addField("Mesaj: ", "" + message.content + "")

  log.send(embed)

})



client.on("channelCreate", async(channel) => {

  let modlog = await db.fetch(`log_${channel.guild.id}`);

    if (!modlog) return;

    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());

    let kanal;

    if (channel.type === "text") kanal = `<#${channel.id}>`

    if (channel.type === "voice") kanal = `\`${channel.name}\``

    let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Kanal Oluşturma")

    .addField("**Kanalı Oluşturan Kişi**", `<@${entry.executor.id}>`)

    .addField("**Oluşturduğu Kanal**", `${kanal}`)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL())

    .setThumbnail(channel.guild.iconUR)

    client.channels.cache.get(modlog).send(embed)

    })

client.on("channelDelete", async(channel) => {

  let modlog = await db.fetch(`log_${channel.guild.id}`);

    if (!modlog) return;

    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());

    let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Kanal Silme")

    .addField("**Kanalı Silen Kişi**", `<@${entry.executor.id}>`)

    .addField("**Silinen Kanal**", `\`${channel.name}\``)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL())

    .setThumbnail(channel.guild.iconURL)

    client.channels.cache.get(modlog).send(embed)

    })

client.on("roleCreate", async(role) => {

let modlog = await db.fetch(`log_${role.guild.id}`);

if (!modlog) return;

const entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Rol Oluşturma")

.addField("**Rolü oluşturan kişi**", `<@${entry.executor.id}>`)

.addField("**Oluşturulan rol**", `\`${role.name}\` **=** \`${role.id}\``)

.setTimestamp()

.setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)

.setColor("RANDOM")

.setThumbnail(role.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("roleDelete", async(role) => {

let modlog = await db.fetch(`log_${role.guild.id}`);

if (!modlog) return;

const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Rol Silme")

.addField("**Rolü silen kişi**", `<@${entry.executor.id}>`)

.addField("**Silinen rol**", `\`${role.name}\` **=** \`${role.id}\``)

.setTimestamp()

.setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)

.setColor("RANDOM")

.setThumbnail(role.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiCreate", async(emoji) => {

let modlog = await db.fetch(`log_${emoji.guild.id}`);

if (!modlog) return;

const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Emoji Oluşturma")

.addField("**Emojiyi oluşturan kişi**", `<@${entry.executor.id}>`)

.addField("**Oluşturulan emoji**", `${emoji} - İsmi: \`${emoji.name}\``)

.setTimestamp()

.setColor("RANDOM")

.setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)

.setThumbnail(emoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiDelete", async(emoji) => {

let modlog = await db.fetch(`log_${emoji.guild.id}`);

if (!modlog) return;

const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Emoji Silme")

.addField("**Emojiyi silen kişi**", `<@${entry.executor.id}>`)

.addField("**Silinen emoji**", `${emoji}`)

.setTimestamp()

.setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)

.setColor("RANDOM")

.setThumbnail(emoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiUpdate", async(oldEmoji, newEmoji) => {

let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);

if (!modlog) return;

const entry = await oldEmoji.guild.fetchAuditLogs({type: 'EMOJI_UPDATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Emoji Güncelleme")

.addField("**Emojiyi güncelleyen kişi**", `<@${entry.executor.id}>`)

.addField("**Güncellenmeden önceki emoji**", `${oldEmoji} - İsmi: \`${oldEmoji.name}\``)

.addField("**Güncellendikten sonraki emoji**", `${newEmoji} - İsmi: \`${newEmoji.name}\``)

.setTimestamp()

.setColor("RANDOM")

.setFooter(`Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`, oldEmoji.guild.iconURL)

.setThumbnail(oldEmoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("guildBanAdd", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);

if (!modlog) return;

const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Yasaklama")

.addField("**Kullanıcıyı yasaklayan yetkili**", `<@${entry.executor.id}>`)

.addField("**Yasaklanan kullanıcı**", `**${user.tag}** - ${user.id}`)

.addField("**Yasaklanma sebebi**", `${entry.reason}`)

.setTimestamp()

.setColor("RANDOM")

.setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

.setThumbnail(guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})




client.on("guildBanRemove", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);

if (!modlog) return;

const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Yasak kaldırma")

.addField("**Yasağı kaldıran yetkili**", `<@${entry.executor.id}>`)

.addField("**Yasağı kaldırılan kullanıcı**", `**${user.tag}** - ${user.id}`)

.setTimestamp()
//DarkCode
.setColor("RANDOM")
//DarkCode
.setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

.setThumbnail(guild.iconURL)
//DarkCode
//DarkCode
client.channels.cache.get(modlog).send(embed)

})
// mod log son ///


const dctrat = require('dctr-antispam.js'); 

var authors = [];
var warned = [];

var messageLog = [];

client.on('message', async message => {
const spam = await db.fetch(`spam.${message.guild.id}`);
if(!spam) return;

const maxTime = await db.fetch(`max.${message.guild.id}.${message.author.id}`);
const timeout = await db.fetch(`time.${message.guild.id}.${message.author.id}`);
db.add(`mesaj.${message.guild.id}.${message.author.id}`, 1)
if(timeout) {
const sayı = await db.fetch(`mesaj.${message.guild.id}.${message.author.id}`);
if(Date.now() < maxTime) {
      if(message.author.id === "778683285692874815") return;
  const westraaaaam = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`<a:atlantis_carpi:776057180612722699> <@${message.author.id}> , **Bu Sunucuda Spam Yapmak Yasak!**`)
  .setFooter(`Bu mesaj otomatik olarak silinecektir.`)

 message.channel.send(westraaaaam).then(msg => msg.delete({timeout: 1500}));
  return message.delete();
  
}
} else {
db.set(`time.${message.guild.id}.${message.author.id}`, 'ok');
db.set(`max.${message.guild.id}.${message.author.id}`, Date.now()+3000);
setTimeout(() => {
db.delete(`mesaj.${message.guild.id}.${message.author.id}`);
db.delete(`time.${message.guild.id}.${message.author.id}`);
}, 500) // default : 500
}


});

// spam engel bitiş




   const saasembed = new Discord.MessageEmbed()
////.setTitle('Bir Gold Üye Belirdi! <a:wavygolduye:742353872013754428>')
.setDescription('<a:quirky_pikachu:798179523065413635> Aleyküm Selam. Hoş Geldin! <a:quirky_welcome:798179739582988359>')
.setTimestamp()
.setFooter('Quirky Bot')
.setColor(0x36393E)
   
 client.on("message", async msg => {
  let saas = await db.fetch(`saas_${msg.guild.id}`);
  if (saas == 'kapali') return;
  if (saas == 'acik') {
  if (msg.content.toLowerCase() === 'sa' ||  msg.content.toLowerCase() == 'selam' || msg.content.toLowerCase() == 'selamun aleyküm' || msg.content.toLowerCase() == 'sea' || msg.content.toLowerCase() == 'sae' || msg.content.toLowerCase() == 'selamün aleyküm' || msg.content.toLowerCase() == 'saa' || msg.content.toLowerCase() == 'seaa') {
    msg.channel.send(saasembed).then(msg => msg.delete({ timeout: 8000, reason: '.' }));
  }
  }
});





//--------------------------------|| Koruma ||-------------------------------\\

//ROL VE KANAL KORUMA
client.on("roleCreate", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());
  let rol = await db.fetch(`rolrol_${role.guild.id}`);
  let kontrol = await db.fetch(`dil_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.delete();

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Açıldı!`)
      .setColor("BLACK")
      .addField(`Açan`, entry.executor.tag)
      .addField(`Açılan Rol`, role.name)
      .addField(`Sonuç`, `Rol Geri Silindi!`);
    client.channels.cache.get(kanal).send(embed);
  } else {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.delete();

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Açıldı!`)
      .setColor("BLACK")
      .addField(`Rolu Açan`, entry.executor.tag)
      .addField(`Açılan Rol`, role.name)
      .addField(`Sonuç`, `Açılan Rol Geri Silindi!`);
    client.channels.cache.get(kanal).send(embed);
  }
});

client.on("channelDelete", async channel => {
  let kontrol = await db.fetch(`dil_${channel.guild.id}`);
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.guild.channels.create(channel.name, channel.type, [
      {
        id: channel.guild.id,
        position: channel.calculatedPosition
      }
    ]);

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Silindi!`)
      .addField(`Silen`, entry.executor.tag)

      .addField(`Silinen Kanal`, channel.name)
      .addField(`Sonuç`, `Kanal Geri Açıldı!`)

      .setColor("BLACK");
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.guild.channels.create(channel.name, channel.type, [
      {
        id: channel.guild.id,
        position: channel.calculatedPosition
      }
    ]);

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Silindi!`)
      .addField(`Kanalı Silen`, entry.executor.tag)
      .setColor("BLACK")
      .addField(`Silinen Kanal`, channel.name)
      .addField(`Sonuç`, `Silinen Kanal Geri Açıldı!`);
    client.channels.cache.get(kanal).send(embed);
  }
});

client.on("channelCreate", async channel => {
  let kontrol = await db.fetch(`dil_${channel.guild.id}`);
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.delete();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Açıldı!`)
      .setColor("BLACK")
      .addField(`Açan`, entry.executor.tag)
      .addField(`Açılan Kanal`, channel.name)
      .addField(`Sonuç`, `Kanal Geri Silindi!`);
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.delete();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Açıldı!`)
      .setColor("BLACK")
      .addField(`Kanalı Açan`, entry.executor.tag)
      .addField(`Açılan Kanal`, channel.name)
      .addField(`Sonuç`, `Açılan Kanal Geri Silindi`);
    client.channels.cache.get(kanal).send(embed);
  }
});
// Ban ve Rol Koruma Devam
client.on("guildBanAdd", async (guild, user) => {
  let kontrol = await db.fetch(`dil_${guild.id}`);
  let kanal = await db.fetch(`bank_${guild.id}`);
  let rol = await db.fetch(`banrol_${guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    const entry = await guild
      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == guild.owner.id) return;
    guild.members.unban(user.id);
    guild.members.cache.get(entry.executor.id).kick();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Biri Yasaklandı!`)
      .setColor("BLACK")
      .addField(`Yasaklayan`, entry.executor.tag)
      .addField(`Yasaklanan Kişi`, user.name)
      .addField(
        `Sonuç`,
        `Yasaklayan kişi sunucudan açıldı!\nve yasaklanan kişinin yasağı kalktı!`
      );
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await guild
      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == guild.owner.id) return;
    guild.members.unban(user.id);
    guild.members.cache.get(entry.executor.id).kick();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Biri Yasaklandı!`)
      .setColor("BLACK")
      .addField(`Yasaklayan`, entry.executor.tag)
      .addField(`Yasaklanan Kişi`, user.name)
      .addField(
        `Sonuç`,
        `Yasaklayan Kişi Sunucudan Atıldı ve yasaklanan kişinin yasağı kalktı `
      );
    client.channels.cache.get(kanal).send(embed);
  }
});
client.on("roleDelete", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  let rol = await db.fetch(`rolrol_${role.guild.id}`);
  let kontrol = await db.fetch(`dil_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  if (kontrol == "TR_tr") {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.guild.roles
      .create({
        data: {
          name: role.name
        }
      })
      .then(r => r.setPosition(role.position));

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Silindi!`)
      .setColor("BLACK")
      .addField(`Silen`, entry.executor.tag)
      .addField(`Silinen Rol`, role.name)
      .addField(`Sonuç`, `Rol Geri Açıldı!`);
    client.channels.cache.get(kanal).send(embed);
  } else {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.guild.roles
      .create({
        data: {
          name: role.name
        }
      })
      .then(r => r.setPosition(role.position));

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Silindi!`)
      .setColor("BLACK")
      .addField(`Silen`, entry.executor.tag)
      .addField(`Silinen Rol`, role.name)
      .addField(`Sonuç`, `Silinen Rol Geri Açıldı!`);
    client.channels.cache.get(kanal).send(embed);
  }
});



client.on("ready", () => {
  client.channels.cache.get("805734884966400020").join();
})



client.on("message", msg => {
var dm = client.channels.cache.get("802968616193753118")
if(msg.channel.type === "dm") {
if(msg.author.id === client.user.id) return;
const botdm = new Discord.MessageEmbed()
.setTitle(`${client.user.username} Dm`)
.setTimestamp()
.setColor("RED")
.setThumbnail(`${msg.author.avatarURL()}`)
.addField("Gönderen", msg.author.tag)
.addField("Gönderen ID", msg.author.id)
.addField("Gönderilen Mesaj", msg.content)

dm.send(botdm)

}
if(msg.channel.bot) return;
});



  

client.on('message', async message => {
  if(message.author.id !== ayarlar.sahip) if(message.author.id !== '767654256042835998')
    
      return;
  
if(message.content.split(' ').filter(x => x.startsWith(':') && x.endsWith(':')).length > 1) {
let emojiler = [];
message.content.split(' ').filter(x => x.startsWith(':') && x.endsWith(':')).forEach(x => {
emojiler.push(message.guild.emojis.cache.find(s => s.name.includes(x.replace(/:/g, ''))));
});
let newMessage;
var d = -1;
if(emojiler.length >= 1) {
emojiler.forEach(s => {
d++
if(!newMessage) newMessage = message.content.replace(message.content.split(' ').filter(x => x.startsWith(':') && x.endsWith(':'))[d], s);
if(newMessage) newMessage = newMessage.replace(message.content.split(' ').filter(x => x.startsWith(':') && x.endsWith(':'))[d], s);
});
};
return message.delete() && message.channel.send(`${newMessage}`);
};
let emoji = message.content.split(' ').find(x => x.startsWith(':') && x.endsWith(':')).toString().replace(/:/g, '');
let emojii = message.guild.emojis.cache.find(x => x.name.includes(emoji));
if(!emojii) return;
message.content = message.content.replace(message.content.split(' ').find(x => x.startsWith(':') && x.endsWith(':')), emojii);
return message.delete() && message.channel.send(`${message.content}`);
});




//////çekiliş/////////
if(!db.get("giveaways")) db.set("giveaways", []);

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {

    async getAllGiveaways(){
        return db.get("giveaways");
    }

    async saveGiveaway(messageID, giveawayData){
        db.push("giveaways", giveawayData);
        return true;
    }

    async editGiveaway(messageID, giveawayData){
        const giveaways = db.get("giveaways");
        const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
        newGiveawaysArray.push(giveawayData);
        db.set("giveaways", newGiveawaysArray);
        return true;
    }

    async deleteGiveaway(messageID){
        const newGiveawaysArray = db.get("giveaways").filter((giveaway) => giveaway.messageID !== messageID);
        db.set("giveaways", newGiveawaysArray);
        return true;
    }
  
  
};
const manager = new GiveawayManagerWithOwnDatabase(client, {
  storage: false,
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    embedColor: "#0a99ff",
    reaction: "🎉"
  }
});
client.giveawaysManager = manager;

///son///



client.on('guildMemberAdd', async member => {
  const ch = await db.fetch(`hgbbKanalResim_${member.guild.id}`)
  if(!ch || ch == null ) return
  const kanal = member.guild.channels.cache.get(ch)
  const canvas =  Canvas.createCanvas(1980,1080)
  const ctx =  canvas.getContext('2d')
  const userImage = await Canvas.loadImage(member.user.displayAvatarURL({format:'jpg',size:4096}))
  const bg = await Canvas.loadImage('https://cdn.discordapp.com/attachments/722966636558286899/729969400777539644/1594108611372.jpg')
  const door = await Canvas.loadImage('https://cdn.glitch.com/16c1f2c8-0b25-4605-89ff-c86675c38573%2F1594111765064.png?v=1594111792947')
  ctx.drawImage(bg,0,0,canvas.width,canvas.height)
  ctx.drawImage(door,0,915,150,150)
  ctx.font = '100px Candara'
  ctx.fillStyle ="#F0F8FF"
  ctx.textAlign ='center'
  ctx.fillText(member.user.username,1000,780)
  ctx.fillText('Sunucumuza Hoşgeldin.',1000,950)
  ctx.lineWidth = 10
  ctx.beginPath()
  ctx.shadowColor='black'
  ctx.shadowBlur =100
  ctx.arc(1020,350,270,0,Math.PI*2,true)
  ctx.closePath()
  ctx.stroke()
  ctx.clip()
  ctx.drawImage(userImage,725,55,590,590)
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(),'hoşgeldin.png')
  if(!kanal)return;
  kanal.send(attachment)
  })
client.on('guildMemberRemove', async member => {
  const ch = await db.fetch(`hgbbKanalResim_${member.guild.id}`)
  if(!ch || ch == null ) return
  const kanal = member.guild.channels.cache.get(ch)
  const canvas =  Canvas.createCanvas(1980,1080)
  const ctx =  canvas.getContext('2d')
  const userImage = await Canvas.loadImage(member.user.displayAvatarURL({format:'jpg',size:4096}))
  const bg = await Canvas.loadImage('https://cdn.discordapp.com/attachments/722966636558286899/729969400777539644/1594108611372.jpg')
  const door = await Canvas.loadImage('https://cdn.glitch.com/16c1f2c8-0b25-4605-89ff-c86675c38573%2F1594111773688.png?v=1594111787318')
  ctx.drawImage(bg,0,0,canvas.width,canvas.height)
  ctx.drawImage(door,1829,915,150,150)
  ctx.font = '100px Candara'
  ctx.fillStyle ="#F0F8FF"
  ctx.textAlign ='center'
  ctx.fillText(member.user.username,1000,780)
  ctx.fillText('Sunucumuzdan Ayrıldı.',1000,950)
  ctx.lineWidth = 10
  ctx.beginPath()
  ctx.shadowColor='black'
  ctx.shadowBlur =100
  ctx.arc(1020,350,270,0,Math.PI*2,true)
  ctx.closePath()
  ctx.stroke()
  ctx.clip()
  ctx.drawImage(userImage,725,55,590,590)
  ctx.blur = 3
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(),'gulegule.png')
  if(!kanal) return;
  kanal.send(attachment)
  })


// SAYAÇ SİSTEMİ

client.on("guildMemberAdd", async member => {
  const kanal = await db.fetch(`sayacK_${member.guild.id}`);
  if (!kanal) return;
  const sayaç = await db.fetch(`sayacS_${member.guild.id}`);
  const sonuç = sayaç - member.guild.memberCount;
  const mesaj = await db.fetch(`sayacHG_${member.guild.id}`);
  ///....

  ///....
  if (!mesaj) {
    return client.channels.cache
      .get(kanal)
      .send(
        "<a:GiriGif:753288764377399377> `" +
          member.user.username +
          "`**Adlı Kullanıcı Aramıza Katıldı!** `" +
          sayaç +
          "` **Kişi Olmamıza** `" +
          sonuç +
          "` **Kişi Kaldı.** `" +
          member.guild.memberCount +
          "` **Kişiyiz!**"
      );
  }

  if (member.guild.memberCount == sayaç) {
    return client.channels
      .get(kanal)
      .send(
        `<a:hg:752305081545916438> **Sayaç Sıfırlandı!** \`${member.guild.memberCount}\` **Kişiyiz!**`
      );
    await db.delete(`sayacK_${member.guild.id}`);
    await db.delete(`sayacS_${member.guild.id}`);
    await db.delete(`sayacHG_${member.guild.id}`);
    await db.delete(`sayacBB_${member.guild.id}`);
  }
  if (mesaj) {
    const mesaj31 = mesaj
      .replace("-uyetag-", `${member.user.tag}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace(
        "-botsayisi-",
        `${member.guild.members.filter(m => m.user.bot).size}`
      )
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.size}`)
      .replace("-kalanuye-", `${sonuç}`)
      .replace("-hedefuye-", `${sayaç}`);
    return client.channels.cache.get(kanal).send(mesaj31);
  }
});

client.on("guildMemberRemove", async member => {
  const kanal = await db.fetch(`sayacK_${member.guild.id}`);
  const sayaç = await db.fetch(`sayacS_${member.guild.id}`);
  const sonuç = sayaç - member.guild.memberCount;
  const mesaj = await db.fetch(`sayacBB_${member.guild.id}`);
  if (!kanal) return;
  if (!sayaç) return;
  ///....

  if (!mesaj) {
    return client.channels.cache
      .get(kanal)
      .send(
        "<a:kGif:753288772715675699> `" +
          member.user.username +
          "` **Adlı Kullanıcı Aramızdan Ayrıldı.**`" +
          sayaç +
          "` **Kişi Olmamıza** `" +
          sonuç +
          "` **Kişi Kaldı.** `" +
          member.guild.memberCount +
          "` **Kişiyiz!**"
      );
  }

  if (mesaj) {
    const mesaj31 = mesaj
      .replace("-uye-", `${member.user.tag}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace(
        "-botsayisi-",
        `${member.guild.members.filter(m => m.user.bot).size}`
      )
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.cache.size}`)
      .replace("-kalanuye-", `${sonuç}`)
      .replace("-hedefuye-", `${sayaç}`);
    return client.channels.cache.get(kanal).send(mesaj31);
  }
});



// Reklam Engel //
////reklam-engel

const reklam = [
        ".com",
        ".net",
        ".xyz",
        ".tk",
        ".pw",
        ".io",
        ".me",
        ".gg",
        "www.",
        "https",
        "http",
        ".gl",
        ".org",
        ".com.tr",
        ".biz",
        "net",
        ".rf",
        ".gd",
        ".az",
        ".party",
		".gf"
      ];
client.on("messageUpdate", async (old, nev) => {
  
    if (old.content != nev.content) {
    let i = await db.fetch(`reklam.${nev.member.guild.id}.durum`);
    let y = await db.fetch(`reklam.${nev.member.guild.id}.kanal`);
   if (i) {
      
      if (reklam.some(word => nev.content.includes(word))) {
      if (nev.member.hasPermission("BAN_MEMBERS")) return ;
       //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
 const embed = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<a:atlantis_carpi:774167195671461938> ${nev.author} , **Mesajını Editleyerek Reklam Yapmaya Çalıştı!**`)
            .addField("Reklamı:",nev)
        
            nev.delete();
            const embeds = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<a:atlantis_carpi:774167195671461938> ${nev.author} , **Mesajı Editleyerek Reklam Yapamana İzin Veremem!**`) 
          client.channels.cache.get(y).send(embed)
            nev.channel.send(embeds).then(msg => msg.delete({timeout:5000}));
          
      }
    } else {
    }
    if (!i) return;
  }
});

client.on("message", async msg => {

     
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
         let y = await db.fetch(`reklam.${msg.member.guild.id}.kanal`);
   
    let i = await db.fetch(`reklam.${msg.member.guild.id}.durum`);
          if (i) {
              if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                 if (!msg.member.hasPermission("MANAGE_GUILD")) {
                 //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
     msg.delete({timeout:750});
                    const embeds = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<a:atlantis_carpi:774167195671461938> <@${msg.author.id}> , **Bu Sunucuda Reklam Yapmak Yasak!**`)
      msg.channel.send(embeds).then(msg => msg.delete({timeout: 5000}));
                const embed = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<a:atlantis_carpi:774167195671461938> ${msg.author} , **Reklam Yapmaya Çalıştı!**`) .addField("Mesajı:",msg)
               client.channels.cache.get(y).send(embed)
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
         if(!i) return ;
});

