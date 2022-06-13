const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const ayarlar = require("./ayarlar/bot.json"); 
const db = require('quick.db');
const Gamedig = require('gamedig')
const odb = require("orio.db");
const request = ('request')
const disbut = require('discord-buttons')
disbut(client);
const embed = new Discord.MessageEmbed()  
const { Client, MessageEmbed, Collection, DiscordAPIError } = require("discord.js");
const isim = ayarlar.isim

client.on("message", async message => {
  let prefix = ayarlar.prefix 
const messageArray = message.content.split(" ");
const cmd = messageArray[0].toLowerCase();
const args = messageArray.slice(1);
if (!message.content.startsWith(prefix)) return;
const commandfile =
client.commands.get(cmd.slice(prefix.length)) ||
client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
if (commandfile) commandfile.run(client, message, args);
});


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();



fs.readdir("./komutlar/", (err, files) => {
const jsfiles = files.filter(f => f.split(".").pop() === "js");
if (jsfiles.length <= 0) {
return console.log("Herhangi bir komut bulunamadı!");
}
jsfiles.forEach(file => {
console.log(`Yüklenen Komut: ${file}`);
const command = require(`./komutlar/${file}`);
client.commands.set(command.config.name, command);
command.config.aliases.forEach(alias => {
client.aliases.set(alias, command.config.name);
});
});
});








//client.login(ayarlar.token)
client.login(ayarlar.token)
.then(function() {
console.log('Token doğru. Bot aktif ediliyor.')
}, function(err) {
console.log("Tokeniniz yanlış. Bot başlatılamıyor.")
setInterval(function() {
process.exit(0)
}, 20000);
})

//darwin--\\
const ip = ayarlar.serverip
const port = ayarlar.serverport

client.on("ready", () => {
  client.setInterval(durumKontrol, 3000);
})

function durumKontrol() {
    Gamedig.query({
        type: 'minecraft',
        host: `${ip}`,
        port: `${port}`
    }).then((state) => {
        client.user.setActivity(`${state.players.length} Kişi Sunucuda!`, {
            type: 'PLAYING'
        })
    }).catch((error) => {
    })
}

const kanal = ayarlar.botungirecegikanal
client.on('ready', ()=>{
client.channels.cache.get(`${kanal}`).join()
})






/////emojirol








/// OTOROL SİSTEMİ

client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`otoRK_${member.guild.id}`);
  let rol = await db.fetch(`otoRL_${member.guild.id}`);
  let mesaj = db.fetch(`otoRM_${member.guild.id}`);
  if (!rol) return;

  if (!mesaj) {
    client.channels.cache.get(kanal).send("  `" + member.user.username + "`** Hoş Geldin! Otomatik Rolün Verildi Seninle Beraber** `" + member.guild.memberCount + "` **Kişiyiz!**");
    return member.roles.add(rol);
  }

  if (mesaj) {
    var mesajs = mesaj.replace("-uye-", `${member.user}`).replace("-uyetag-", `${member.user.tag}`).replace("-rol-", `${member.guild.roles.cache.get(rol).name}`).replace("-server-", `${member.guild.name}`).replace("-uyesayisi-", `${member.guild.memberCount}`).replace("-botsayisi-", `${member.guild.members.cache.filter(m => m.user.bot).size}`).replace("-bolge-", `${member.guild.region}`).replace("-kanalsayisi-", `${member.guild.channels.cache.size}`);
    member.roles.add(rol);
    return client.channels.cache.get(kanal).send(mesajs);
     }
});

client.on('message', async msg => {
  let ozelkomut = await db.fetch(`sunucuKomut_${msg.guild.id}`);
  let ozelkomutYazi;
  if (ozelkomut == null) ozelkomutYazi = 'Burayı silme yoksa hatalı olur'
  else ozelkomutYazi = ''+ ozelkomut +''
  if (msg.content.toLowerCase() === ozelkomutYazi) {
      let mesaj = await db.fetch(`sunucuMesaj_${msg.guild.id}`);
  let mesajYazi;
  if (mesaj == null) mesajYazi = 'Burayı silme yoksa hatalı olur'
  else mesajYazi = ''+ mesaj +''
    msg.channel.send(mesajYazi)
  }
});


/////MUTE SİSTEMİ

client.on('roleDelete', async role => {
const db = await require('quick.db').fetch(`carl-mute-role.${role.guild.id}`);
if(db && db === role.id) require('quick.db').delete(`carl-mute-role.${role.guild.id}`); 
});

///REKLAM ENGEL////////
/*client.on("message", msg => {
 if(!db.has(`reklam_${msg.guild.id}`)) return;
        const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                    return msg.reply(`**Hey Dur! Bu Sunucuda Reklamı Engelliyorum!**`).then(message => message.delete({ timeout:5000}));  
            }              
          } catch(err) {
            console.log(err);
          }
        }
    });

*/
//KÜFÜR ENGEL

client.on("message", async msg => {
  
  
 const i = await db.fetch(`kufur_${msg.guild.id}`)
    if (i == "acik") {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "amcık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.')
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  
  
 const i = db.fetch(`${oldMessage.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq",];
        if (kufur.some(word => newMessage.content.includes(word))) {
          try {
            if (!oldMessage.member.hasPermission("BAN_MEMBERS")) {
                  oldMessage.delete();
                          
                      return oldMessage.reply('Bu Sunucuda Küfür Filtresi Aktiftir.')
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});


/////////////
/////////YARDIM/////////
client.on('clickButton', (button) => {
   if (button.id === 'genel') {
    
  }
})


client.on("ready",(button)=>{
  client.ws.on('INTERACTION_CREATE', async interaction => {
  
     if(interaction.data.custom_id=="genel"){
     client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
          type: 4,
          data: {
              content: `Aşağıda botun kullanılabilir tüm Genel komutlar yer alıyor.

**.havadurumu** - Havadurumu Bilgisi Verir.
**.ip** - İp Mesajı.
**.server** - Server Bilgisi.
**.begen** - Yetkiliye Puan Verebilirsiniz.
**.puan** - Kendi Puanına Veya Başkasının Puanına Bakma.

`
,    
              flags: "64"
            }
        }
    
     }
      ); 
       
       

   };

  
    });
  });  

client.on('clickButton', (button) => {
   if (button.id === 'moderasyon') {
    
  }
})


client.on("ready",(button)=>{
  client.ws.on('INTERACTION_CREATE', async interaction => {
  
     if(interaction.data.custom_id=="moderasyon"){
     client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
          type: 4,
          data: {
              content: `Aşağıda botun kullanılabilir tüm Moderasyon komutlar yer alıyor.

**.aktif** - Aktif Duyurusu.
**.bakım** - Bakım Duyurusu.
**.yazdır** - Bota Mesaj Yazdırma.
**.embedyazdır** - Bota Embedli Mesaj Yazdırırsınız.

⚙ **.otorol-ayarla** - Sunucuda Otorol Ayarlar.
⚙ **.otorol-kapat** - Sunucudaki Otorolu Kapatır.
⚙ **.otorol-mesaj** - Otorol Mesajını Ayarlar.
⚙ **.otorol-mesaj-sıfırla** - Otorol Mesajını Sıfırlar.
⚙ **.reklam-engel** - Sunucuda Reklam Filtresi Açılır.
⚙ **.küfür-engel** - Sunucuda Küfür Filtresi Açılır.
⚙ **.ever-engel** - Sunucuda Everyone Filtresi Açılır.
⚙ **.caps-engel** - Sunucuda Capslock Filtresi Açılır.
⚙ **.kanal-koruma** - Sunucuda Kanal Koruması Açılır.
⚙ **.rol-koruma** - Sunucuda Rol Koruması Açılır.
⚙ **.ban** - Sunucudaki Etiketlediğiniz Kişiyi Engeller.
⚙ **.kick** - Sunucudan Etiketlediğiniz Kişiyi Atar.
⚙ **.sil** - Belirlediğiniz Miktar Kadar Mesaj Siler.
⚙ **.mute** - Etiketlediğiniz Kişiyi Muteler.
⚙ **.unmute** - Mutelediğiniz Kişinin Mutesini Açar.
⚙ **.mute-rol** - Mute Rolünü Ayarlarsınız.
⚙ **.başvuru-kapat** - Başvuru Sistemini Kapatırsınız.
⚙ **.ticket** - Ticket Sistemi Ayarlama.
⚙ **.kayıt** - Kayıt Mesajını Atar.


`
,    
              flags: "64"
            }
        }
    
     }
      ); 
       
       

   };

  
    });
  }); 



/////////////////YARDIM//////////

//////LOG
// MOD LOG

client.on('messageDelete', async message   => { // mod-log
      let modlogs = db.get(`log_${message.guild.id}`)
    const modlogkanal = message.guild.channels.cache.find(kanal => kanal.id === modlogs);    
if (!modlogkanal) return;
  const embed = new Discord.MessageEmbed()
  .setColor("#8A2BE2")
  .setTitle("MESAJ SİLİNDİ")
.setDescription(`  <@!${message.author.id}> **adlı kullanıcı tarafından** <#${message.channel.id}> **kanalına gönderilen mesaj silindi!** \n\nSilinen Mesaj: **${message.content}**`)
  .setFooter(client.user.username, "| Log Sistemi")
  modlogkanal.send(embed);
  })

client.on('guildBanAdd', async message  => {
      let modlogs = db.get(`log_${message.guild.id}`)
    const modlogkanal = message.guild.channels.cache.find(kanal => kanal.id === modlogs);    
if (!modlogkanal) return;
  const embed = new Discord.MessageEmbed()
  .setColor("#8A2BE2")

    .setDescription(` **Üye Sunucudan Yasaklandı!** \n<@!${message.user.id}>, ${message.user.tag}`)
        .setThumbnail(message.user.avatarURL)
  .setFooter(client.user.username,"| Log Sistemi")
  modlogkanal.send(embed);
  })


client.on('channelDelete', async channel  => {
      let modlogs = db.get(`log_${channel.guild.id}`)
    const modlogkanal = channel.guild.channels.cache.find(kanal => kanal.id === modlogs);    
if (!modlogkanal) return;
    if (channel.type === "text") {
                let embed = new Discord.MessageEmbed()
                    .setColor('#8A2BE2')
                .setDescription(` ${channel.name} **Adlın Metin Kanalı  Silindi**`)
                .setFooter(client.user.username,`| Log Sistemi Kanal ID: ${channel.id}`)
                modlogkanal.send({embed});
            };
            if (channel.type === "voice") {
                let embed = new Discord.MessageEmbed()
                .setColor('#8A2BE2')
.setTitle("SES KANALI SİLİNDİ")
                .setDescription(`  ${channel.name} **Adlı Ses Kanalı Silindi**`)
            .setFooter(client.user.username,`| Log Sistemi  Kanal ID: ${channel.id}`)
                modlogkanal.send({embed});
            }
    })




client.on('guildMemberAdd', async member => {// chimp ᵈ♡#0110
const db = require('quick.db')
const asd = db.fetch(`${member.guild.id}.jail.${member.id}`)
if(asd) {
let db2 = await db.fetch(`jailrol_${member.guild.id}`)
let rol = member.guild.roles.get(db2)
if(!rol) return;
let kişi = member.guild.members.get(member.id)
kişi.addRole(rol.id);
kişi.roles.forEach(r => {
kişi.removeRole(r.id)
db.set(`${member.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id )})
    db.set(`${member.guild.id}.jail.${kişi.id}`, 'codare')
  const wasted = new Discord.RichEmbed()
  .setAuthor(member.user.tag, member.user.avatarURL)
  .setColor(`#f3c7e1`)
  .setDescription(`Aa, beni kandıramazsın!`)
  .setTimestamp()
    member.send(wasted)
} 
  
  
})



///invite
const invites = {};
const wait = require("util").promisify(setTimeout);
client.on('ready', () => {
    wait(1000);
    client.guilds.cache.forEach(g => {
        g.fetchInvites().then(guildInvites => {
            invites[g.id] = guildInvites;
        });
    });
})



client.on('guildMemberAdd', (member) => {
    if (member.user.bot) return;
    const user = client.users.cache.get(member.id);
    member.guild.fetchInvites().then(async guildInvites => {
        const ei = invites[member.guild.id];
        invites[member.guild.id] = guildInvites;
        const veri = await guildInvites.find(i => (ei.get(i.code) == null ? (i.uses - 1) : ei.get(i.code).uses) < i.uses);
        var daveteden;
        if (!veri) daveteden = "Bulunamadı"
        else daveteden = member.guild.members.cache.get(veri)
        var b = veri.guild.vanityURLCode
        if (!b) b = veri.code
        if (veri.code == b) daveteden = member.guild.members.cache.get(veri.inviter.id)
        else daveteden = member.guild;
        db.add(`davetsayi.${daveteden.id}.${member.guild.id}`, +1);
        db.add(`toplam.${daveteden.id}.${member.guild.id}`, +1);
        db.push(`günlük.${daveteden.id}.${member.guild.id}`, { userID: member.user.id })
        let zaman = require("moment").duration(new Date().getTime() - client.users.cache.get(member.id).createdAt.getTime())
        if (zaman < 604800017) {
            db.add(`davetsayi.${daveteden.id}.${member.guild.id}`, -1);
            db.add(`fake.${daveteden.id}_${member.guild.id}`, +1);
        }
        db.set(`veri.${member.id}.${member.guild.id}`, daveteden.id);
        let a = await db.fetch(`davetsayi.${daveteden.id}.${member.guild.id}`);
        let davetsayi;
        if (!a) { davetsayi = 0; }
        else { davetsayi = await db.fetch(`davetsayi.${daveteden.id}.${member.guild.id}`); }
        var y;
        if (daveteden.id == member.guild.id) y = "Özel URL"
        else y = daveteden.user.tag
        member.guild.channels.cache.get(ayarlar.logchannel).send(`${member} kullanıcısı sunucuya katıldı! **Davet Eden:** ${y} ( **${davetsayi ? davetsayi : '0'}** davet )`);
    });
});

client.on("guildMemberRemove", async member => {
    const user = client.users.cache.get(member.id);

    member.guild.fetchInvites().then(async guildInvites => {
        const veri = await db.fetch(`veri.${member.id}.${member.guild.id}`);
        var daveteden;
        if (!veri) daveteden = "Bulunamadı"
        else daveteden = member.guild.members.cache.get(veri)

        let zaman = require("moment").duration(new Date().getTime() - client.users.cache.get(member.id).createdAt.getTime())

        if (zaman < 1296000000) {
            db.add(`fake.${daveteden.id}.${member.guild.id}`, -1);
            db.add(`davetsayi.${daveteden.id}.${member.guild.id}`, -1);
            if (veri) {
                db.delete(`veri.${member.id}.${member.guild.id}`);
            }
        } else {
            db.add(`davetsayi.${daveteden.id}.${member.guild.id}`, -1);
            if (veri) {
                db.delete(`veri.${member.id}.${member.guild.id}`);
            }
        }
        var y;
        if (daveteden.id == member.guild.id) y = "Özel URL"
        else y = daveteden.user
        const davetsayi = await db.fetch(`davetsayi.${daveteden.id}.${member.guild.id}`);
        if (zaman < 1296000000) {
            if (!veri) {
                return member.guild.channels.cache.get(ayarlar.logchannel).send(`Sunucudan \`${member.user.tag}\` çıkış yaptı. **Davet eden:** Bulunamadı.`);
            } else if (daveteden.id == member.guild.id) {
                member.guild.channels.cache.get(ayarlar.logchannel).send(`Sunucudan \`${member.user.tag}\`, çıkış yaptı. **Davet eden:** ${y.tag}, ${davetsayi ? davetsayi : '0'} daveti kaldı!`);
            } else {
                member.guild.channels.cache.get(ayarlar.logchannel).send(`Sunucudan \`${member.user.tag}\`, çıkış yaptı. **Davet eden:** ${y.tag}, ${davetsayi ? davetsayi : '0'} daveti kaldı!`);
            }
        } else {
            {
                if (!veri) {
                     member.guild.channels.get(ayarlar.logchannel).send(`\`${member.user.tag}\` çıktı, **Davet eden:** Bulunamadı!`);
                } else if (daveteden.id == member.guild.id) {
                    member.guild.channels.cache.get(ayarlar.logchannel).send(`Sunucudan \`${member.user.tag}\`, çıkış yaptı. **Davet eden:** ${y.tag}, ${davetsayi ? davetsayi : '0'} daveti kaldı!`);
                } else {
                    member.guild.channels.cache.get(ayarlar.logchannel).send(`Sunucudan \`${member.user.tag}\`, çıkış yaptı. **Davet eden:** ${y.tag}, ${davetsayi ? davetsayi : '0'} daveti kaldı!`);
                }
            }
        }
    })
});

//başvuru

client.on('clickButton', async (button) => {

  const onybuton = new disbut.MessageButton()
    .setLabel('Onaylandı')
    .setStyle('green')
    .setID('ony')
    .setDisabled();

    const onaymsj = new Discord.MessageEmbed()
    .setAuthor(`${isim}`, button.message.guild.iconURL({dynamic: true, type: 'gif', size: 1024}))
    .setDescription(`Başvurunuz Onaylandı ve Yetkili Rolleriniz verildi, Tebrikler :)`)
    .setColor('GREEN');



    const data = await db.get(`basvur.${button.message.id}`)
    if(!data) return;
  const basvuruGonderenID = data;

  if(button.id === 'onay'){
    button.reply.defer()
	const isimdes = client.users.cache.get(basvuruGonderenID);
    await button.message.edit(`<@${basvuruGonderenID}> adlı kişinin, Başvurusu \`${button.clicker.user.tag}\` isimli yetkili tarafından Kabul edildi`, onybuton)
    await client.channels.cache.get(ayarlar.onayred).send(`<@${basvuruGonderenID}>,`, onaymsj)
   // await client.guilds.cache.get(ayarlar.sunucuid).members.cache.get(basvuruGonderenID).roles.add(ayarlar.yetkilirolid)
	isimdes.send('Yetkili başvurun kabul edildi! Detaylar: <#985538432006774804> kanalında!')
  }
  if(button.id === 'red'){
    button.reply.defer()


    const sorular = [
      '**Reddedilme Sebebi?** <cevap vermek için 3 dakikan var>'
    ]
    let sayac = 0
    
    const filter = m => m.author.id === button.clicker.user.id
    const collector = new Discord.MessageCollector(button.channel, filter, {
      max: sorular.length,
      time: 3000 * 60
    })

    button.channel.send(sorular[sayac++])
    collector.on('collect', m => {
      if(sayac < sorular.length){
        m.channel.send(sorular[sayac++])
      }
    })


    collector.on('end', collected => {
      if(!collected.size) return button.channel.send('**Süre Bitti!**');
      button.channel.send('**Başvurunuz Başarıyla Reddedildi.**');

           
    const redbuton = new disbut.MessageButton()
    .setLabel('Reddedildi')
    .setStyle('red')
    .setID('red')
    .setDisabled();

    const redmsg = new Discord.MessageEmbed()
    .setAuthor(`${isim}`, button.message.guild.iconURL({dynamic: true, type: 'gif', size: 1024}))
    .setDescription(`<@${basvuruGonderenID}> Başvurunuz, \`${collected.map(m => m.content).slice(0,1)}\` nedeniyle ${button.clicker.user} tarafından Reddedildi`)
    .setColor('RED');

     button.message.edit(`<@${basvuruGonderenID}> adlı kişinin, Başvurusu, \`${collected.map(m => m.content).slice(0,1)}\` Sebebiyle, \`${button.clicker.user.tag}\` isimli yetkili tarafından Başarıyla Reddedildi`, redbuton)
     client.channels.cache.get(ayarlar.onayred).send(`<@${basvuruGonderenID}>,`, redmsg)
          })

    
  }
  db.delete(`basvuru.${button.message.id}`)

});

//KANAL & ROL KORUMA

client.on("roleDelete", async role => {
  let rolk2 = await db.fetch(`rolk_${role.guild.id}`);
  if (rolk2) {
    const entry = await role.guild
      .fetchAuditLogs({ type: "ROLE_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    role.guild.roles.create({
      data: {
        name: role.name,
        color: role.color,
        hoist: role.hoist,
        permissions: role.permissions,
        mentionable: role.mentionable,
        position: role.position
      },
      reason: "Silinen Roller Tekrar Açıldı."
    });
  }
});

//

client.on("roleCreate", async role => {
  let rolk = await db.fetch(`rolk_${role.guild.id}`);
  if (rolk) {
    const entry = await role.guild
      .fetchAuditLogs({ type: "ROLE_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    role.delete();
  }
});

//

client.on("channelDelete", async function(channel) {
  let rol = await db.fetch(`kanalk_${channel.guild.id}`);

  if (rol) {
    const guild = channel.guild.cache;
    let channelp = channel.parentID;

    channel.clone().then(z => {
      let kanal = z.guild.channels.cache.find(c => c.name === z.name);
      kanal.setParent(
        kanal.guild.channels.cache.find(channel => channel.id === channelp)
      );
    });
  }
});

//

client.on("emojiDelete", async (emoji, message, channels) => {
  let emojik = await db.fetch(`emojik_${emoji.guild.id}`);
  if (emojik) {
    const entry = await emoji.guild
      .fetchAuditLogs({ type: "EMOJI_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == emoji.guild.owner.id) return;
    if (
      !emoji.guild.members.cache
        .get(entry.executor.id)
        .hasPermission("ADMINISTRATOR")
    ) {
      emoji.guild.emojis
        .create(`${emoji.url}`, `${emoji.name}`)
        .catch(console.error);
    }
  }
});

//KANAL & ROL & EMOJİ KORUMA SON

//CAPS ENGEL

client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 1) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(`${msg.member}, Capslock Kapat Lütfen!`)
              .then(wiskyx => wiskyx.delete({ timeout: 5000 }));
          }
        }
      }
    }
  }
});

//CAPS ENGEL SON

//EVERYONE-HERE ENGEL

client.on("message", async msg => {
  let hereengelle = await db.fetch(`hereengel_${msg.guild.id}`);
  if (hereengelle == "acik") {
    const here = ["@here", "@everyone"];
    if (here.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.permissions.has("ADMINISTRATOR")) {
        msg.delete();
        return msg
          .reply("Yakaladım Seni! Everyone ve Here Etiketlemek Yasak.")
          .then(wiskyx => wiskyx.delete({ timeout: 5000 }));
      }
    }
  } else if (hereengelle == "kapali") {
  }
}); 


///everyone

//kayıt




  const uye = ayarlar.kayıtuye 
  const kayıtsız = ayarlar.kayıtkayıtsız 
  const sunucu = ayarlar.sunucuid
  const eventbildirim = ayarlar.kayıteventbildirim
  const duyurubildirim = ayarlar.kayıtduyurubildirim
  const güncellemebildirim = ayarlar.kayıtgüncellemebildirim
  const kampanyabildirim = ayarlar.kayıtkampanyabildirim
  
  client.on('clickButton', (button) => {
  
  if (button.id === 'kayıt') {
     button.clicker.member.roles.add(uye); 
    button.clicker.member.roles.remove(kayıtsız);
  }
})


client.on("ready",(button)=>{
  client.ws.on('INTERACTION_CREATE', async interaction => {
  
     if(interaction.data.custom_id=="kayıt"){
     client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
          type: 4,
          data: {
              content: `Seni sunucumuza kayıt ettim. İyi eğlenceler.`,    
              flags: "64"
            }
        }
    }); 

   };
   
    });
  });
  
   client.on('clickButton', (button) => {
  
  if (button.id === 'eventbildirim') {
     button.clicker.member.roles.add(eventbildirim); 
  }
})


client.on("ready",(button)=>{
  client.ws.on('INTERACTION_CREATE', async interaction => {
  
     if(interaction.data.custom_id=="eventbildirim"){
     client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
          type: 4,
          data: {
              content: `Event Bildirim rolünü verdim. İyi eğlenceler.`,    
              flags: "64"
            }
        }
    }); 

   };
   
    });
  });
  
  
    client.on('clickButton', (button) => {
  
  if (button.id === 'duyurubildirim') {
     button.clicker.member.roles.add(duyurubildirim); 
  }
})


client.on("ready",(button)=>{
  client.ws.on('INTERACTION_CREATE', async interaction => {
  
     if(interaction.data.custom_id=="duyurubildirim"){
     client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
          type: 4,
          data: {
              content: `Duyuru Bildirim rolünü verdim. İyi eğlenceler.`,    
              flags: "64"
            }
        }
    }); 

   };
   
    });
  });
  


    client.on('clickButton', (button) => {
  
  if (button.id === 'güncellemebildirim') {
     button.clicker.member.roles.add(güncellemebildirim); 
  }
})


client.on("ready",(button)=>{
  client.ws.on('INTERACTION_CREATE', async interaction => {
  
     if(interaction.data.custom_id=="güncellemebildirim"){
     client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
          type: 4,
          data: {
              content: `Güncelleme Bildirim rolünü verdim. İyi eğlenceler.`,    
              flags: "64"
            }
        }
    }); 

   };
   
    });
  });


    client.on('clickButton', (button) => {
  
  if (button.id === 'kampanyabildirim') {
     button.clicker.member.roles.add(kampanyabildirim); 
  }
})


client.on("ready",(button)=>{
  client.ws.on('INTERACTION_CREATE', async interaction => {
  
     if(interaction.data.custom_id=="kampanyabildirim"){
     client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
          type: 4,
          data: {
              content: `Kampanya Bildirim rolünü verdim. İyi eğlenceler.`,    
              flags: "64"
            }
        }
    }); 

   };
   
    });
  });

///

