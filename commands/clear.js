const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Удаляет сообщения')
        .addIntegerOption(options => 
            options.setName('amount')
                .setDescription('Количество сообщений которых нужно удалить')
                .setRequired(true)),
    async execute(interaction) {
        const { channel, options } = interaction;

        await channel.bulkDelete(options.getInteger("amount"), true).then(messages => {
            const response = new EmbedBuilder()
                .setColor('#ffffff')
                .setTitle('🧹 | Очистка')
                .setDescription(`Очищено ${messages.size} сообщений.`);
            return interaction.reply({embeds: [response]});
        })
    }
}
