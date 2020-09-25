//gets the most recently published item

const Discord = require("discord.js");
const { readdirSync } = require("fs");
const request = require('request');

module.exports.run = async (bot, message, args) => {

        const url = `https://api.superium.net/asset/catalog?type=hat&limit=1`;

        request(url, (err, response, body) => {

        const litem = JSON.parse(body);
        for(index in litem) {
        console.log(litem[index].id);

          if(litem[index].id == undefined) {
              message.reply('I am unable to fetch the asset');
          }
          else {
            const litemText =
            { embed:
              {
                color: 49306,
                title: `${litem[index].name}`,
                "thumbnail": {
                  "url": `https://superium.net/assets/thumbnails/catalog/${litem[index].id}.png`
                },
                fields: [

                    {
                    name: 'Type',
                    value: `${litem[index].type}`,
                    },
                    {
                    name: 'Sales',
                    value: `${litem[index].sales}`,
                    },
                    {
                    name: 'Price',
                    value: `${litem[index].price}`,
                    },
                    {
                    name: 'Item ID',
                    value: `${litem[index].id}`,
                    },
                ],
                timestamp: new Date(),
                footer: {
                  text: 'mad eby qqq',
                },
              },
            };
            message.channel.send(litemText);
          }
        }
        });
};
module.exports.help = {
  name: "lat-item",
  description: "",
  usage: "",
  category: "ur categoruy",
  aliases: [""]
}
