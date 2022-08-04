const fs = require('fs');
const { Client, Collection, IntentsBitField} = require('discord.js');
const { token } = require('./config.json');

const otherIntents = new IntentsBitField(14023);
const client = new Client({ intents: otherIntents });


client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Бот запущен');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;
	if (interaction.guild === null){
        return interaction.reply('Бот не расчитан для выполнения команд в личных сообщений.')
    }
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Ошибка при выполнении команды.', ephemeral: true });
	}
});

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);