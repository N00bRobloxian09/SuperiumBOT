//finds information about the item by the specified ID 

const Discord = require("discord.js");
const { readdirSync } = require("fs");
const request = require('request');

module.exports.run = async (bot, message, args) => {

        const url = `https://api.superium.net/asset/info?id=${args}`;

        request(url, (err, response, body) => {

        const item = JSON.parse(body);

          if(item.id == undefined) {
              message.reply('I am unable to fetch the asset');
          }
          else {
            const itemText =
            { embed:
              {
                color: 39393,
                title: `${item.name}`,
                "thumbnail": {
                  "url": `https://superium.net/assets/thumbnails/catalog/${item.id}.png`
                },
                fields: [

                    {
                    name: 'Type',
                    value: `${item.type}`,
                    },
                    {
                    name: 'Sales',
                    value: `${item.sales}`,
                    },
                    {
                    name: 'Price',
                    value: `${item.price}`,
                    },
                ],
                timestamp: new Date(),
                footer: {
                  text: 'made by noobrobloxian09 change this',
                },
              },
            };
            message.channel.send(itemText);
          }
        });
};
module.exports.help = {
  name: "item",
  description: "",
  usage: "",
  category: "ur category bro",
  aliases: [""]
}
