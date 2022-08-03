const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const framework = require ('../framework')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Удаляет сообщения')
        .addIntegerOption(options => 
            options.setName('amount')
                .setDescription('Количество сообщений которых нужно удалить')
                .setRequired(true))
        .addUserOption(options =>
            options.setName('target')
                .setDescription('Сообщение каво нужно удалить?')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
        const { channel, options } = interaction;

        const Amount = options.getInteger("amount");
        const Target = options.getUser("target");
        const Messages = await channel.messages.fetch();

        if (options.getInteger("amount") > 100) {
            return interaction.reply({embeds: [framework.error("Выбранно слишком большое число для удаления. Максемальное допустимое 100.")]});
        } else if (Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if(m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                const response = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('🧹 | Очистка')
                    .setDescription(`Очищено ${messages.size} сообщений от ${Target}.`);
                return interaction.reply({embeds: [response]});
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                const response = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('🧹 | Очистка')
                    .setDescription(`Очищено ${messages.size} сообщений.`);
                return interaction.reply({embeds: [response]});
            })
        }
    }
}