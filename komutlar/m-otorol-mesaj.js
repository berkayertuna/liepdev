const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async (client, message, args) => { //' DΛЯWIN.GΛΛGHJS#9966
  
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`  **Bu komutu kullanabilmek için** "\`Yönetici\`" **yetkisine sahip olmalısın.**`);
  
  let mesaj = args.slice(0).join(' ');
  if(mesaj.length < 5) return message.channel.send('  **Kullanabileceğin Argumanlar -uye-, -uyesayisi-, -uyetag-, -rol-, -server-, -botsayisi-, -bolge-, -kanalsayisi- **\n `Örnek:` !otorol-mesaj -uye- Hoşgeldin! senle beraber -uyesayisi- Kişiyiz!`')
  
 message.channel.send(' **Oto-Rol mesajı** `'+mesaj+'` **Olarak ayarlandı!**') 
 db.set(`otoRM_${message.guild.id}`, mesaj)  

  
};
exports.config = {
  name: 'otorol-mesaj', 
  aliases: ['otorolmesaj','otorol-mesaj-ayarla','otorolmesaj-ayarla', 'otorolmesajayarla']
};

