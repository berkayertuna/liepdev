const Discord = require('discord.js');
const database = require('quick.db');
const ms = require('ms');

exports.run = async (client, message, args) => {// ' DΛЯWIN.GΛΛGHJS#9966
if(!message.member.hasPermission('MANAGE_MESSAGES')) return;

const muteRoleFetch = await database.fetch(`mute.${message.guild.id}`);
if(!muteRoleFetch) return message.channel.send('Mute Rol Ayarlı Değil. Ayarlamak İçin !mute-rol create (rol ismi)');

if(!args[0]) return message.channel.send(`\`\`\`${message.content.split('mute')[0]}mute  [duration]
      ^^^^^^^^
member is a required argument that is missing.\`\`\``);

let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.guild.members.cache.find(a => message.guild.members.cache.get(a.user.id).nickname && a.nickname.toLowerCase().includes(args[0].toLowerCase())) || message.guild.members.cache.find(a => a.user.username.toLowerCase().includes(args[0].toLowerCase()))
if(!member) return message.channel.send(`Member "${args[0]}" not found`);

let infinity = false;
if(args[1]) {
infinity = args.find(a => a.endsWith('m') || a.endsWith('h') || a.endsWith('s') || a.endsWith('d') || a.endsWith('w') || a.endsWith('y'));
};

var sayı = 0;
let zaman;
let gercek;
args.forEach(s => {
sayı++
if(s === infinity) {
gercek = sayı;
zaman = args[sayı-1];
};
});
args[gercek-1] = '';
args = args.filter(a => a !== '');

let reason;
if(!args[1]) reason = 'Reason: Sebep Verilmemiş!';
if(args[1]) reason = 'Reason: '+args.slice(1).join(' ');

if(!zaman) {
member.roles.add(muteRoleFetch).then(() => {
return message.channel.send(`**${message.author.tag}** muted **${member.user.tag}**. ${reason}`);
});
} 

}; 
exports.config = {  
  name: 'mute',
  aliases: []
 
};
