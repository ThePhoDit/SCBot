const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'verification',
	aliases: ['verificaion'],
	run: async (client, msg) => {
		const role = await msg.guild.roles.create({ data: { name: 'Verificado' } });
		const channel = await msg.guild.channels.create('Verificación');

		// Send Webhhook
		const embed = new MessageEmbed()
			.setTitle('Verificación del Servidor.')
			.setColor('YELLOW')
			.setDescription(`Bienvenido al servidor. Antes de poder interactuar con otros usuarios, debes verificar que eres un humano.
Para hacerlo, reacciona al emoji de abajo.`);

		channel.createWebhook(msg.guild.name, { avatar: msg.guild.iconURL() || undefined }).then((w) => w.send({ embeds: [embed] }));

		// Set permissions
			// Main Channel
		channel.overwritePermissions([
			{
				id: msg.guild.id,
				allow: 1024,
				deny: 1088
			},
			{
				id: role.id,
				deny: 1024
			}
		]);

			// Rest of Channels
		for (const chnl of msg.guild.channels.cache.values()) {
			if (channel.id === chnl.id) continue;

			chnl.overwritePermissions([
				{
					id: msg.guild.id,
					deny: 1024,
				},
				{
					id: role.id,
					allow: 1024
				}
			]).catch((e) => console.log(e));
		}
		msg.channel.send('Sistema de verificación creado. Añade a algún bot para las reacciones.');
	}
}