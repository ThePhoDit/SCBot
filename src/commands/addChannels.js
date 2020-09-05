module.exports = {
	name: 'addchannels',
	aliases: ['añadircanales', 'crearcanales'],
	run: async (client, msg, args) => {
		if (!args[0]) return msg.channel.send('Debes indicar una categoría.');
		if (!args[1]) return msg.channel.send('Debes indicar al menos el nombre de un canal.');

		const category = args.shift();
		const existsCategory = msg.guild.channels.cache.find((c) => c.name === category && c.type === 'category');
		const cat = !existsCategory ? await msg.guild.channels.create(category, { type: 'category' }) : existsCategory;

		for (const channel of args) msg.guild.channels.create(channel, { parent: cat.id });

		msg.channel.send('Canales creados en la categoría especificada.');
	}
}