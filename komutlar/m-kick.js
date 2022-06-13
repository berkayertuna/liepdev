const Discord = require('discord.js');
const fs = require('fs');

const ayarlar = require('../ayarlar/bot.json'); 

exports.run = async(client, message, args) => { //' DΛЯWIN.GΛΛGHJS#9966

  let prefix = await require('quick.db').fetch(`prefix.${message.guild.id}`) || ayarlar.prefix


  const db = require('quick.db');
  

  
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(' **Gerekli izniniz bulunmuyor**')

  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
  if (message.mentions.users.size < 1) return message.channel.send(' **Lütfen Kicklemek İstediğiniz Kullanıcıyı Etiketleyin**');
  if (user.id === message.author.id) return message.channel.send('  **Kendini Kickleyeceğine Kendin Çıksana ?**');
  
  message.guild.member(user).kick();
  
  const embed2 = new Discord.MessageEmbed()
  .setColor("#00FFFF")
  .setDescription(` **Kullanıcı Başarıyla Kicklendi**`)
  message.channel.send(embed2)
  
};

exports.config = {  
  name: 'at',
  aliases: ['kick']
 
};

