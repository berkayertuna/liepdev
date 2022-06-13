const Discord = require('discord.js');
exports.run = function(client, message, args) {
 const embed = new Discord.MessageEmbed()  
  embed.setColor("#8A2BE2")
      if (!message.member.hasPermission("ADMİNİSTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`))
      const sayi = args.slice(0).join('');
if(sayi.length < 1) {
  return message.reply(embed.setDescription(`Silmem İçin Bir Miktar Belirt.`))
} else {
  message.channel.bulkDelete(sayi);
message.channel.send("**" + sayi + "** mesaj sildim. <a:bottik:871456184966713375>").then(message => {
	message.delete({ timeout:5000})
});
}
}
 
exports.config = {
  name: "sil",
  aliases: ["sil"]
};

