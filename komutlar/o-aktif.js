const Discord = require('discord.js');
const ayarlar = require('../ayarlar/bot.json');
const db = require('quick.db');
const renk = ayarlar.aktifbakımipembedrenk
const gif = ayarlar.gif
  
var prefix = ayarlar.prefix;

exports.run = async(client, message, args, author) => {
  
  
const okemoji = (`<:810118122727669800:896756066996584468>`)

	  if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Yetkin Yok!")
message.channel.send(`@everyone`)
        const jkood = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setColor(`${renk}`)
.setDescription(`**:mega: Sunucu Aktif!** \n ${okemoji} Sunucumuz Aktiftir.`)  
.setImage(`${gif}`)
.setFooter(`${message.author.username} tarafından istendi!`) 
            
        return message.channel.send(jkood);
  message.channel.bulkDelete(1)
  
}



exports.config = {
name: "aktif",
  aliases: []
}