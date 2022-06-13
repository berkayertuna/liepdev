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
        const darwin = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setColor(`${renk}`)
.setDescription(`**:mega: Bakım!** \n ${okemoji} Sunucumuzun Şuanda Bakımdadır En Kısa Sürede Açılacaktır.`)  
.setImage(`${gif}`)
.setFooter(`${message.author.username} tarafından istendi!`) 
            
        return message.channel.send(darwin);

}



exports.config = {
name: "bakım",
  aliases: ["bakımda"]
}