# GasBot
A discord bot for keeping track of Ethereum gas prices.

## Usage
To Invite the bot to your server, use the [Discord invite link](https://discord.com/oauth2/authorize?client_id=758798038134947880&scope=bot&permissions=8).
The bot's nickname is automatically updated every 10 seconds to reflect current gas prices.
<br />
To query the fastest, fast, average, and safe, low, use the command:
<br />
 `!gas`
 <br />
 To set a price alert at a particular price in gwei, use the command:
 <br />
 `!gas alert <price_in_gwei>`
 
 ## Self Hosting
 If you would like to host the bot yourself, first set up a Discord bot through the Discord Developer portal. Also obtain an API key from 
 [Eth Gas Station](https://www.ethgasstation.info/). Next, pull this repository onto your local machine:<br />
 `git clone <git_url>`
 <br>
 Open the .env file, and imput your API keys in the correct spaces.
 <br />
 Next, ensure that you have NodeJS and NPM installed and run:
 <br />
 `npm install`
 <br />
 `node .`
 <br />
 Congratulations! You now have a running the Discord bot.
