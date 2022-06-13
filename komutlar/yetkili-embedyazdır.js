const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()
const ayarlar = require('../ayarlar/bot.json');
const renk = ayarlar.puansistemiembedrenk

exports.run = (client, message, args) => {
    embed.setColor(`${renk}`)
  	  if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Yetkin Yok!")
  
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply('Yazmam için herhangi bir şey yazmalısın.');
    message.delete();
    return message.channel.send(embed.setDescription(mesaj));
};

exports.config = {  
  name: 'embedyazdır',
  aliases: []
 
};