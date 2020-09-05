module.exports = {
	name: 'createmute',
	aliases: ['crearmute'],
	run: async (client, msg) => {
		const role = await msg.guild.roles.create({ data: { name: 'Muteado' } });

		for (const chnl of msg.guild.channels.cache.values()) {
			chnl.createOverwrite(role.id, {
				'SEND_MESSAGES': false,
				'CONNECT': false,
				'ADD_REACTIONS': false
			})
		}
		msg.channel.send('Mute role created.')
	}
}