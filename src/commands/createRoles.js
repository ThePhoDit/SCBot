module.exports = {
	name: 'createroles',
	aliases: ['crearroles'],
	run: async (client, msg, args) => {
		if (args.length < 1) return msg.channel.send('Debes pedir al menos un rol.');
		for (const role of args) msg.guild.roles.create({ data: { name: role } }).catch(() => false);
		msg.channel.send('Roles creados');
	}
}