const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client();
require('dotenv').config();

client.once('ready', () => {
    console.log('Running...')
    getGas();
});

let gasPrices = [];
let alerts = new Map()

getGas = () => {
    let req = `https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=${process.env.ETH_GAS_KEY}`;
    axios.get(req).then(res => {
        gasPrices = res.data;
        client.guilds.cache.forEach((guild, id) => {
            guild.member(client.user).setNickname(`${res.data.fast/10} gwei`);
        })
        checkAlerts();
    })
}

checkAlerts = () => {
    alerts.forEach((amounts, author) => {
        console.log(amounts);
        amounts.forEach((amount, index) => {
            if(amount*10 >= gasPrices.fast) {
                author.send(`Gas price is now ${gasPrices.fast/10} gwei. Get those transactions in while it's cheap!`);
                let newAlertList = [...alerts.get(author).slice(0, index), ...alerts.get(author).slice(index+1)];
                alerts.set(author, newAlertList);
            }
        })
    })
}

setInterval(getGas, 10 * 1000);

client.on('message', message => {
    const prefix = '!gas';
    if (message.content.startsWith(prefix)) {
        let args = message.content.slice(prefix.length+1).trim().split(' ');
        if(args[0] === '') args = args.splice(0,0);
        if(args.length === 0) {
            message.channel.send(`Fastest: ${gasPrices.fastest/10} gwei\nFast: ${gasPrices.fast/10} gwei\nAverage: ${gasPrices.average/10} gwei\nSafe Low: ${gasPrices.safeLow/10} gwei`);
        }
        if(args[0] === 'alert' && args.length === 2) {
            let amount = args[1];
            let user = message.author;
            let name = message.member.nickname ? message.member.nickname : message.member.user.username;
            message.channel.send(`Thanks, ${name}. I will send you a private message when gas price drops below ${amount} gwei.`);
            if(!alerts.has(user)) {
                alerts.set(user, [amount]);
            } else {
                let newAlertList = alerts.get(user);
                newAlertList.push(amount);
                alerts.set(user, newAlertList);
            }
        }
    }
});

client.login(process.env.DISCORD_TOKEN);