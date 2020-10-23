const Discord = require("discord.js");
const { readdirSync } = require("fs");
const request = require('request');

module.exports.run = async (bot, message, args) => {

const userEmbed = new Discord.MessageEmbed()
.setColor("RED")
.setTitle("Verification")
.setDescription("This will unverify you, are you sure you want to do this?")
.setFooter("Type "cancel" to exit this prompt")
.setTimestamp()
message.channel.send(userEmbed)

let verifiedRole = message.guild.roles.cache.find(x => x.name == "Verified").id;

if(!message.member.roles.cache.has(verifiedRole)) { // check if user has the role START
  message.channel.send('You arent verified!')
  console.log(message.author.username)
} else {

const filter = m => m.author.id === message.author.id
const collector = message.channel.createMessageCollector(filter, {
max: '1',
maxMatches: "1",
time: "200000"
})

collector.on("collect", m => {
if (m.content === 'cancel' || m.content === 'Cancel') {
    message.channel.send('Cancelled prompt')
    return
} //Collector1

if (m.content.includes('done') & m.content.includes("done") && m.author.id == message.author.id) {
               message.member.roles.remove(message.guild.roles.cache.find(r => r.name == "Verified"))
} else {
message.channel.send("wrong command")
}
}};


module.exports.help = {
    name: "unverify",
    description: "",
    usage: "",
    category: "ur catgory vibe check",
    aliases: [""]
}
