const Discord = require('discord.js');

exports.run = (client, message, args) => {
  	  if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Yetkin Yok!")
  
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply('Yazmam için herhangi bir şey yazmalısın.');
    message.delete();
    return message.channel.send(mesaj);
};

exports.config = {  
  name: 'yazdır',
  aliases: []
 
};