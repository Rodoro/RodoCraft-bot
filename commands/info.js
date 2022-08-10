const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const setting = require('../setting');
const config = require('../config.json');
const util = require('minecraft-server-util');


module.exports = {
    data : new SlashCommandBuilder()
        .setName('info')
        .setDescription('Информция о сервере'),
    async execute(interaction) {
        const getUserSample = (users, size) => {
            if (!users || !users.length) {
              return 'Нету никого';
            }
          
            let samplesInText = '';
            const sampleToUse = users.slice(0, size);
          
            sampleToUse.forEach((user) => {
              if (!samplesInText) {
                samplesInText = user.name;
              } else {
                samplesInText += `\n ${user.name}`;
              }
            });
          
            return samplesInText;
          };

        const serverStatus = await util.status(config.adressIp, config.port, {
            timeout: 5000,
            enableSRV: true,
          });

        const Embed = new EmbedBuilder()
            .setColor(setting.colorEmbed)
            .setTitle(':information_source: | Информация')
            .setDescription(serverStatus.motd.clean)
            .setFields({
                name : "Информация",
                value : [
                    `Адресс ${config.adressIp}:${config.port}`,
                    `Версия ${serverStatus.version.name}`
                ].join("\n")
            }, {
                name : "Игроки",
                value : [
                    `${serverStatus.players.online}/${serverStatus.players.max}`,
                    `${getUserSample(serverStatus.players.sample, 5)}`
                ].join("\n")
            });
        return interaction.reply({embeds: [Embed]});
    }
}