const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { //' DΛЯWIN.GΛΛGHJS#9966

if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` **Bu komutu kullanabilmek için** "\`Yönetici\`" **yetkisine sahip olmalısın.**`);
 const rol = db.fetch(`otoRM_${message.guild.id}`) 
 if(!rol) return message.reply(` **Ayarlanmamış bir özellik sıfırlanamaz!  **`)
 
 
  message.channel.send(`  **Otorol mesajı başarılı bir şekilde sıfırlandı.**`)

 
 db.delete(`otoRM_${message.guild.id}`)  

};
exports.config = {
  name: 'otorol-mesaj-sıfırla',
  aliases: ["otorolmesajsıfırla"]
};
