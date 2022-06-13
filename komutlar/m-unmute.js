const Discord = require('discord.js');
const database = require('quick.db');

exports.run = async (client, message, args) => {// ' DΛЯWIN.GΛΛGHJS#9966

if(!message.member.hasPermission('MANAGE_MESSAGES')) return;

const muteRoleFetch = await database.fetch(`mute.${message.guild.id}`);
if(!muteRoleFetch) return message.channel.send('mute rolü ayarlanmamış ayarlamak için !mute-rol');

if(!args[0]) return message.channel.send(`\`\`\`${message.content.split('unmute')[0]}unmute @kişi\`\`\``);

let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.guild.members.cache.find(a => message.guild.members.cache.get(a.user.id).nickname && a.nickname.toLowerCase().includes(args[0].toLowerCase())) || message.guild.members.cache.find(a => a.user.username.toLowerCase().includes(args[0].toLowerCase()))
if(!member) return message.channel.send(`Member "${args[0]}" not found`);
member.roles.remove(muteRoleFetch).then(() => {
return message.channel.send('Başarıyla, susturma kaldırıldı **'+member.user.tag+'**');
})
}; 
exports.config = {
name: "unmute",
  aliases: []
}