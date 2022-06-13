const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client ,message, args) =>{
if(args[0] === 'aç') {
    db.set(`kufur_${message.guild.id}`, "acik")
    message.channel.send('Başarılı Şekilde **Açıldı.**')
  return
}
if (args[0] === 'kapat') {
  db.delete(`kufur_${message.guild.id}`)
message.channel.send('Başarılı Şekilde **Kapatıldı.**')
return
}
  message.channel.send('Lütfen `Aç` yada `Kapat` Yazın!')
};
exports.config = {  
  name: 'küfür-engel',
  aliases: []
 
};