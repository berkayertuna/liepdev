const Discord = require('discord.js');
const ayarlar = require('../ayarlar/bot.json');
const renk = ayarlar.aktifbakımipembedrenk
const gif = ayarlar.gif
  
var prefix = ayarlar.prefix;

exports.run = async(client, message, args, author) => {
  
  
const okemoji = (`<:810118122727669800:896756066996584468>`)


//message.channel.send(`<@!${message.author.id}>`)
        const darwin = new Discord.MessageEmbed()
        
.setAuthor(client.user.username, client.user.avatarURL())
.setColor(`${renk}`)
.setDescription(
  `**:mega: Sunucumuzun İpsi: \n ${okemoji} Server İp** | xxx.xxx.xxx.xxx`)  
.setImage(`${gif}`)
.setFooter(`${message.author.username} tarafından istendi!`) 
            
        return message.channel.send(darwin);
}

exports.config = {
name: "ip",
  aliases: []
}