const Discord = require('discord.js');
const database = require('quick.db');

exports.run = async (client, message, args) => {// ' DΛЯWIN.GΛΛGHJS#9966

if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
if(!args[0]) return message.channel.send('**Örnek:** !mute-rol create Cezalı');

if(args[0] === 'create') {
  
message.guild.roles.create({ data: { name: args.slice(1).join(' ') || 'muted', color: '#f4424b' }}).then(role => {
role.setPermissions(0);
message.channel.send("Rol Başarıyla Oluşturuldu.").then(() => {
let arrayed = message.guild.channels.cache.filter(a => a.type === 'text').array();

var okay = 0;

for(const key in arrayed) {
arrayed[key].overwritePermissions([{
id: role.id,
deny: ['SEND_MESSAGES', 'ADD_REACTIONS'],
}], 'Muterole update by '+message.author.tag);
okay++;
};
database.set(`mute.${message.guild.id}`, role.id);
return message.channel.send("Başarıyla! Rol **"+role.name+"** "+okay+" Kanalda Oluşturuldu.");

});
});
};

if(!args[0] === 'create') {
let role = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first() || message.guild.roles.cache.find(a => a.name.toLowerCase().includes(args.slice(0).join(' ').toLowerCase()))
if(!role) return message.channel.send('Role "'+args.slice(0).join(' ')+'" not found.');

database.set(`mute.${message.guild.id}`, role.id);
return message.channel.send(`Set **${role.name}** as the muterole.`);
};

}; 
exports.config = {  
  name: 'mute-rol',
  aliases: []
 
};