const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar/bot.json')
exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(`❌ Bu Komutu Kullana Bilmek İçin \`Mesajları Yönet\` Yetkisine Sahip Olmalısın!`)
  if (!args[0]) return message.channel.send(`**Örnek:** !caps-engel aç/kapat`)
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
  if(args[0] === 'aç') {
    db.set(`capslock_${message.guild.id}`, true)
    message.channel.send(`Capslock Engel Sistemi Aktif!`)
  return
}
if (args[0] === 'kapat') {
  db.delete(`capslock_${message.guild.id}`)
message.channel.send(`Capslock Engel Sistemi Deaktif!`)
return
}
  
};
exports.config = {
  name: 'caps-engel',
  aliases: []
};