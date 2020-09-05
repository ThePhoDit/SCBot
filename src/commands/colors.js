const { rolesColors } = require('../../Constants');

module.exports = {
	name: 'colors',
	aliases: ['colores'],
	run: async (client, msg, args) => {
		for (const color of Object.keys(rolesColors)) await msg.guild.roles.create({ data: { name: color, color: rolesColors[color], mentionable: false } });
		msg.channel.send('Colores creados.');
	}
}