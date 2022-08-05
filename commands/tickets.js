const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const setting = require('../setting');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('tickets')
        .setDescription('Содание UI для системы тикетов')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const Button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('application')
                    .setLabel('Написать жалобу')
                    .setStyle(ButtonStyle.Primary),
            )
        const Embed = new EmbedBuilder()
            .setColor(setting.colorEmbed)
            .setTitle('Заявки')
            .setDescription(`Для подачи жалобы на расмотрение в суд нажмите кнопку "Написать жалобу". Вам выделится специальный канал, где вы можети подробно описать жалобу и предоставить доказательства.`);
        return interaction.reply({embeds: [Embed], components: [Button]});
    }
}