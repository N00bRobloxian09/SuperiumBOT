// searches for user information by the specified ID
const Discord = require("discord.js");
const { readdirSync } = require("fs");
const request = require('request');

module.exports.run = async (bot, message, args) => {

        const url = `https://api.superium.net/users/getbyusername?username=${args}`;

        request(url, (err, response, body) => {
        
        const user = JSON.parse(body);

          if(user.ID == undefined) {
              message.reply('I am unable to fetch the user');
          }
          else {
            const userText =
            { embed:
              {
                color: 3447003,
                title: `${user.Username}`,
                "thumbnail": {
                  "url": `https://superium.net/assets/thumbnails/avatars/headshots/${user.AvatarHash}.png`
                },
                fields: [

                    {
                    name: 'Description',
                    value: `${user.Description}`,
                    },
                    {
                    name: 'ID',
                    value: `${user.ID}`,
                    },
                ],
                timestamp: new Date(),
                footer: {
                  text: 'me when',
                },
              },
            };
            message.channel.send(userText);
          }
        });
};
module.exports.help = {
  name: "user",
  description: "",
  usage: "",
  category: "YOUR catergorogrugyrgyrgrgr",
  aliases: [""]
}
