 const db = require("quick.db");
const gamedig = require('gamedig');
const Discord = require('discord.js');
const fynx = require("../ayarlar/bot.json");
var embed = new Discord.MessageEmbed()
const ayarlar = require('../ayarlar/bot.json')
const ip = ayarlar.serverip
const port = ayarlar.serverport
const gif = ayarlar.gif
const renk = ayarlar.serverembedrenk

exports.run = async(client, message, args, author) => {	
                embed.setColor(`${renk}`)
                embed.setTimestamp()
                embed.setImage(`${gif}`)
		gamedig.query({
        type: 'minecraft',
        host: `${ip}`,
        port: `${port}`
        }).then(async (state) => {
              embed.setTitle(state.name)
            console.log(state)
              message.channel.send(
              embed.setDescription(`
              Oyuncu: **${state.maxplayers}** Aktif
              Ping: **${state.ping}ms**
              IP: **${state.connect}**`),
              
                
              )
        }).catch(err => {
            console.log(err);
        });
}

exports.config = {
name: "server",
  aliases: []
}