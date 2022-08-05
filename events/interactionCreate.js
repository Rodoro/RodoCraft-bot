const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionsBitField  } = require('discord.js');
let setting = require('./../setting.json');
const fs = require('fs');

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId == 'application') {
            fs.writeFileSync('setting.json', JSON.stringify({ ticketId: ++setting.ticketId, colorEmbed: setting.colorEmbed}))

            interaction.guild.channels.create({
                name: `Заявка №${setting.ticketId}`,
                type: ChannelType.GuildText,
                parent: "1004450739386585148",
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: interaction.guild.roles.cache.find(role => role.name === "Судья"),
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ManageChannels,]
                    }
                ],
            }).then(async(channel) => {
                const Button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('pickUp')
                        .setLabel("Забрать заявку")
                        .setStyle(ButtonStyle.Primary)
                )
            const Embed = new  EmbedBuilder()
                .setColor(setting.colorEmbed)
                .setTitle('Забрать заявку')
                .setDescription('Вы можете забрать свою заявку в суд и она не будет рассматриватся.')
            await channel.send({embeds: [Embed], components: [Button]})
            return await interaction.reply({content: `${interaction.member} ваша заявка была создана: №${setting.ticketId}`, ephemeral: true})
            });
        } else if (interaction.customId == 'pickUp') {
            interaction.channel.delete();
        }
    }
}