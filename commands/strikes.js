module.exports = async(client, msg, suffix) => {
	if (!suffix) {
		return msg.reply("You didn't specify an ID!");
	}

	let offender;
	if (msg.mentions.users.first()) {
		offender = msg.mentions.users.first().id;
	} else {
		offender = suffix;
	}

	let allStrikes = await Strikes.find({ offender: offender });
	if (allStrikes.size == 0 || !allStrikes) return msg.reply("No strikes associated with this ID were found.");
	let fields = [];
	for (const s of allStrikes) {
		fields.push({
			name: `ID: ${s._id}`,
			value: s.reason,
			inline: true,
		});
	}
	if (allStrikes.size == 1) {
		return msg.channel.send({
			embed: {
				color: 0x00FF00,
				title: `Here are the strikes for ${suffix}`,
				description: `They currently have ${allStrikes.size} strike`,
				fields,
			},
		});
	} else if (allStrikes.size == 3) {
		msg.channel.send({
			embed: {
				color: 0x00FF00,
				title: `Here are the strikes for ${suffix}`,
				description: `They currently have ${allStrikes.size} strikes`,
				fields,
				footer: {
					text: `This user may be on the blacklist.`,
				},
			},
		});
	}
	msg.channel.send({
		embed: {
			color: 0x00FF00,
			title: `Here are the strikes for ${suffix}`,
			description: `They currently have ${allStrikes.size} strikes`,
			fields,
		},
	});
};
