// proof it works: https://www.youtube.com/watch?v=LB-khYNW1Q4
// if u use please subscribe
const Discord = require("discord.js");
const { readdirSync } = require("fs");
const request = require('request');

module.exports.run = async (bot, message, args) => {

const userEmbed = new Discord.MessageEmbed()
.setColor("RED")
.setTitle("Verification")
.setDescription("You're already verified!")
.setFooter("If you would wish to change your username do -idk its not done yet ask an admin")
.setTimestamp()

let verifiedRole = message.guild.roles.cache.find(x => x.name == "Verified").id;

if(message.member.roles.cache.has(verifiedRole)) { // check if user has the role START
  message.channel.send(userEmbed)
  console.log(message.author.username)
} else {

let msg = await message.channel.send("verification START") // Send a message for awaiting.
function makeid() {
var text = "";
var randomText = ['stud','brick','emoji','lol']; // Emoji list This can be used for words.
text += randomText[Math.floor(Math.random() * randomText.length)];
text += randomText[Math.floor(Math.random() * randomText.length)];
return text;
}

const filter = m => m.author.id === message.author.id
const collector = message.channel.createMessageCollector(filter, {
max: '1',
maxMatches: "1",
time: "200000"
})


const usernameEMbed = new Discord.MessageEmbed()
.setColor("BLUE")
.setTitle("Verification")
.setDescription("What's your Superium username?")
.setFooter("This prompt will cancel after 200 seconds.")
.setTimestamp()
msg.channel.send(usernameEMbed) //sends the first embed

collector.on("collect", m => {
if (m.content === 'cancel' || m.content === 'Cancel') {
    message.channel.send('Cancelled prompt')
    return
} //Collector1 End

const url = `https://api.superium.net/users/getbyusername?username=${m.content}`;
request(url, (err, response, body) => {
    const user = JSON.parse(body);
    if (user.ID == undefined) {
        message.reply('I am unable to fetch the user');
    } else {
        const id = user.ID
        const newString = makeid() // gets the randomtext
        const foundUsername = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle("Verification")
            .setDescription("Hello **" + m.content + "**, to verify that you are this user. Please put this in your description. \n `" + newString + "`\n\nSay **done** when complete.\nSay **cancel** to cancel. ")
            .setFooter("Player ID is " + id)
            .setTimestamp()
        msg.channel.send(foundUsername)


        const collector2 = message.channel.createMessageCollector(filter, {
            max: '1',
            maxMatches: "1",
            time: "200000"
        })

        collector2.on('collect', async mag => { // START COLLECTOR2
        if (mag.content === 'cancel' || mag.content === 'Cancel') {
          message.channel.send('**Cancelled prompt.**')
          return
        }
            if (mag.content.includes('done') & mag.content.includes("done") && mag.author.id == message.author.id) {
                const fetchDesc = new Discord.MessageEmbed()
                    .setColor("BLUE")
                    .setTitle("Verification")
                    .setDescription("Please hold tight. I am fetching your description.")
                    .setFooter("Fetching..")
                    .setTimestamp()
                msg.channel.send(fetchDesc)
                setTimeout(function() {
                  const url2 = `https://api.superium.net/users/getbyusername?username=${m.content}`;
                  request(url2, (err, response, body) => {
                    const user2 = JSON.parse(body);
                        if (user2.Description == undefined) {
                            message.reply('I am unable to fetch the description, are you sure your username is correct LOL?');
                        } else {
                        console.log("passed through")
                            if (user2.Description.includes(newString)) { 
                                const verified = new Discord.MessageEmbed()
                                    .setColor("GREEN")
                                    .setTitle("Verification")
                                    .setDescription("You have now been verified! Please wait shortly as you are going to recieve the Verified role.")
                                    .setFooter("Verifying..")
                                    .setTimestamp()
                                msg.channel.send(verified)
                                message.member.roles.add(message.guild.roles.cache.find(r => r.name == "Verified")) // add the user role
                                message.member.setNickname(m.content)
                            } else {
                                message.channel.send("Can not find the code. Are you sure you pasted your code in your description?") // Sent if user has not put code
                            }
                        }
                  })
                }, 5000)
        }}) // END COLLECTOR2
    }

    })
    if (msg.content.includes('cancel') && mag.author.id == message.author.id) {
        message.channel.send('Cancelled prompt')
        return
    }
})
} // check if user has the role END
};
module.exports.help = {
    name: "verify",
    description: "",
    usage: "",
    category: "ur catgory vibe check",
    aliases: [""]
}
