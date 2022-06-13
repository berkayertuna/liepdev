const Discord = require('discord.js');
const ayarlar = require('../ayarlar/bot.json');
const embed = new Discord.MessageEmbed()
const db = require("quick.db");
const renk = ayarlar.puansistemiembedrenk
  
var prefix = ayarlar.prefix;

exports.run = async(client, message, args, author) => {
 
embed.setColor(`${renk}`)  
const member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
const deger = args[1]
if(!member) return message.channel.send(embed.setDescription("Öncelikle geçerli bir **Kullanıcı** belirtmelisin!"));
if (member == message.author) {
  message.channel.send("Çok Akıllısın .d")
} else {
if(!deger) return message.channel.send(embed.setDescription("Öncelikle bir **0-10** arası 'değer' belirtmelisin."));
if (deger < 0 || deger > 10) {
  message.channel.send("Değer 0-10 Arası Olmalıdır!")
} else {
db.add(`begenme_${member.id}`, deger)
message.channel.send(`${member} Kişisine ${deger} Puan Verildi!`)
}
}
}
exports.config = {
name: "beğen",
  aliases: []
}