const Discord = require('discord.js');
const ayarlar = require('../ayarlar/bot.json');
const embed = new Discord.MessageEmbed()
const db = require("quick.db");
const renk = ayarlar.puansistemiembedrenk
  
var prefix = ayarlar.prefix;

exports.run = async(client, message, args, author) => {
  
const member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
if (!member) {
    if (db.fetch(`begenme_${message.author.id}`) == null) {
    db.set(`begenme_${message.author.id}`, 0)
  }
message.channel.send(`Puanınız: ${db.fetch(`begenme_${message.author.id}`)}`)
} else {
  if (db.fetch(`begenme_${member.id}`) == null) {
    db.set(`begenme_${member.id}`, 0)
  }
  message.channel.send(`${member} Kişisinin Puanı: ${db.fetch(`begenme_${member.id}`)}`)
}
}
exports.config = {
name: "puan",
  aliases: []
}