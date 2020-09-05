const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
require('dotenv').config();

const client = new Client();
const prefix = process.env.PREFIX || '!';
const commands = new Collection();
const aliases = new Collection();



const files = readdirSync(__dirname + '/commands/').filter(f => f.endsWith('.js'));

for (const file of files) {
	const commandFile = require("./commands/" + file);
	commands.set(commandFile.name, commandFile);
	for (const alias of commandFile.aliases) aliases.set(alias, commandFile.name);
	console.log(`[FILES] Loaded ${file}`);
}

client.on('ready', () => {
	console.log('[BOT] The bot is online. Made by ThePhoDit.');
})

client.on('message', async (msg) => {
	if (msg.author.id !== '459649180969730050') {
		const da = client.guilds.cache.get('692028367918202970');
		if (!da) return;
		const daMember = await da.members.fetch(msg.author.id)
		if (!(daMember || daMember.roles.cache.has('697610646379954196'))) return;
	}
	if (!(await msg.guild.members.fetch(client.user.id)).hasPermission('ADMINISTRATOR')) return	msg.channel.send('Dame ADMIN master');

	if (!msg.content.startsWith(prefix)) return;
	if (msg.channel.type !== 'text') return;

	const args = msg.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();

	let cmd = commands.get(command);
	if (!cmd) return;
	cmd.run(client, msg, args);
})

client.login(process.env.TOKEN);