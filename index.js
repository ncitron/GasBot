const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client();
require('dotenv').config();

client.once('ready', () => {
    console.log('Running...')
    getGas();
});

let gasPrices = [];
getGas = () => {
    let req = `https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=${process.env.ETH_GAS_KEY}`;
    axios.get(req).then(res => {
        gasPrices = res.data;
        client.guilds.cache.forEach((guild, id) => {
            guild.member(client.user).setNickname(`${res.data.fast/10} gwei`);
        })
    })
}

setInterval(getGas, 10 * 1000);

client.on('message', message => {
    if (message.content === '!gas') {
        message.channel.send(`Fastest: ${gasPrices.fastest/10} gwei\nFast: ${gasPrices.fast/10} gwei\nAverage: ${gasPrices.average/10} gwei\nSafe Low: ${gasPrices.safeLow/10} gwei`);
    }
});

client.login(process.env.DISCORD_TOKEN);