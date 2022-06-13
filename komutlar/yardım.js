const discord = require('discord.js');
const disbut = require('discord-buttons')
const client = new discord.Client();
const embed = new discord.MessageEmbed()  
const db = require('quick.db')
const ayarlar = require('../ayarlar/bot.json')
const gif = ayarlar.gif
const renk = ayarlar.yardımembedrenk
const mesaj = ayarlar.yardımmesaj

exports.run = async (client, message, args) => { 

  

    let button7 = new disbut.MessageButton()
    .setStyle('green') 
    .setLabel('Genel') 
    .setEmoji("📠")
    .setID('genel')

    let button8 = new disbut.MessageButton()
    .setStyle('red') 
    .setLabel('Moderasyon')
    .setEmoji("⛏")
    .setID('moderasyon')
    
    message.channel.send(" ", {
        buttons:[
            button7,button8
        ],
        embed:new discord.MessageEmbed().setColor(`${renk}`).setTitle(`Yardım`).setDescription(`${mesaj}`).setImage(`${gif}`)
    });
      }
      
exports.config = {
name: "yardım",
  aliases: []
}