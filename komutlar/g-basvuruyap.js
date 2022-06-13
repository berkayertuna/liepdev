const Discord = require("discord.js");
const disbut = require("discord-buttons");
const db = require('quick.db');
const embed = new Discord.MessageEmbed()
const ayar = require('../ayarlar/bot.json')
const renk = ayar.basvuruembedrenk

exports.run = async (client, message, args) => { 
    message.delete()
	const basvurdata = await db.get(`basvurbilgi`);
	if(basvurdata) return message.reply(`Başvurular geçici olarak durdurulmuştur.`);
	
	const bandata = await db.get(`ban.${message.author.id}`)
	if(bandata) return message.reply("Başvurulardan banlısın");
		
  let category = message.guild.channels.cache.get(ayar.basvurkategori);
            
  message.guild.channels.create(`${message.author.username}-başvur`, {
    parent: category,
    permissionOverwrites: [
        {id: ayar.everyoneid, deny: [('VIEW_CHANNEL'), ('SEND_MESSAGES')]},
		{id: ayar.adminrol, allow: [('VIEW_CHANNEL'), ('SEND_MESSAGES')]},
        {id: message.author.id, allow: [('VIEW_CHANNEL'), ('SEND_MESSAGES')]}]
    }).then( async baschannel => {

  const soru1 = ayar.basvurusoru1 
  const soru2 = ayar.basvurusoru2 
  const soru3 = ayar.basvurusoru3  
  const soru4 = ayar.basvurusoru4  
  const soru5 = ayar.basvurusoru5  
  const soru6 = ayar.basvurusoru6  
  const sorular = [
    `${soru1} isim/yaş`,
    `${soru2} 1/24 saat`,
    `${soru3} evet/hayır`,
    `${soru4} yıl`,
    `${soru5} <isim>`,
    `${soru6} <cevabınız>`
  ]
  let sayac = 0
  
  const filter = m => m.author.id === message.author.id
  const collector = new Discord.MessageCollector(baschannel, filter, {
    max: sorular.length,
    time: 2000 * 60
  })
  embed.setColor(`${renk}`)
  baschannel.send(`${message.author}`)
  baschannel.send(embed.setDescription(`Merhaba ${message.author}, demek sunucumuzda yetkili olmak istiyorsun ama önce bazı soruları cevaplaman gerek başarılar\n:hourglass: Unutma!!! Tüm soruları cevaplaman için tam 2 Dakikan var hızlı ol :)`));
  baschannel.send(sorular[sayac++])
  collector.on('collect', m => {
    if(sayac < sorular.length){
      m.channel.send(sorular[sayac++])
    }
  })

  collector.on('end', collected => {
    if(!collected.size) return baschannel.send('**Süre Bitti!**\nBu kanal 5 saniye sonra silinecektir').then(
      setTimeout(function() {
        baschannel.delete();
         }, 5000));
    baschannel.send('**Başvurunuz Başarıyla iletilmiştir!**\nBu kanal 5 saniye sonra silinecektir').then(
      setTimeout(function() {
        baschannel.delete();
         }, 5000));
    let sayac = 0
    
    const onybuton = new disbut.MessageButton()
    .setLabel('Onayla')
    .setStyle('green')
    .setID('onay');
    const redbuton = new disbut.MessageButton()
    .setLabel('Reddet')
    .setStyle('red')
    .setID('red');
    let row = new disbut.MessageActionRow()
    .addComponents(onybuton, redbuton);

    const log = new Discord.MessageEmbed()
    .setAuthor(message.author.username + ` (${message.author.id})`, message.author.avatarURL({dynamic: true}))
	.setTitle('Yeni Başvuru Geldi!')
	.setDescription('Aşağıdaki butonlardan onay/red işlemlerini gercekleştirebilirsiniz')
    .setColor(`${renk}`)
    .addField('Başvuran Hakkında',[
      `${soru1} \t\t${collected.map(m => m.content).slice(0,1)}`,
      `${soru2} \t\t${collected.map(m => m.content).slice(1,2)}`,
      `${soru3} \t\t${collected.map(m => m.content).slice(2,3)}`,
      `${soru4} \t\t${collected.map(m => m.content).slice(3,4)}`,
	  `${soru5} \t\t${collected.map(m => m.content).slice(4,5)}`,
      `${soru6} \t\t${collected.map(m => m.content).slice(5,6)}`
    ])
    .setTimestamp()
    .setFooter(client.user.username, message.guild.iconURL());
    client.channels.cache.get(ayar.yetkililog).send({
		buttons: [onybuton, redbuton],
	    embed: log}).then(async m => {
      db.set(`basvur.${m.id}`, message.author.id);
    })
    message.guild.channels.cache.get(ayar.yetkililog).send(`@everyone`)
  })
  
})
};

exports.config = {
name: "başvuru",
  aliases: []
}