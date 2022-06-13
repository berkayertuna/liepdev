const discord = require('discord.js');
const disbut = require('discord-buttons')
const client = new discord.Client();
const ayarlar = require('../ayarlar/bot.json')
const sunucu = ayarlar.isim
const resim = ayarlar.kayıtresim
const renk = ayarlar.kayıtembedrenk
const mesaj = ayarlar.kayıtmesaj

exports.run = async (client, message, args) => { 
     
	let button11 = new disbut.MessageButton()
    .setStyle('blurple') 
    .setLabel('Kampanya Bildirim!') 
    .setID('kampanyabildirim')
	.setEmoji("💸")
	
	let button10 = new disbut.MessageButton()
    .setStyle('green') 
    .setLabel('Güncelleme Bildirim!') 
    .setID('güncellemebildirim')
	.setEmoji("🚀")
	
	let button9 = new disbut.MessageButton()
    .setStyle('red') 
    .setLabel('Duyuru Bildirim!') 
    .setID('duyurubildirim')
	.setEmoji("🎉")
	
    let button8 = new disbut.MessageButton()
    .setStyle('green') 
    .setLabel('Event Bildirim!') 
    .setID('eventbildirim')
	.setEmoji("⚜️")
	
	let button7 = new disbut.MessageButton()
    .setStyle('blurple') 
    .setLabel('Kayıt Ol!') 
    .setID('kayıt')
	.setEmoji("🔖")
	

    message.channel.send(" ", {
        buttons:[
            button7,button8,button9,button10,
			button11
        ],
        embed:new discord.MessageEmbed().setColor(`${renk}`).setTitle(`${sunucu} - Kayıt Sistemi`).setThumbnail(`${resim}`).setDescription(`${mesaj}`)
    });


};
exports.config = {
  name: 'kayıt',
  aliases: []
};