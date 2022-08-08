const { EmbedBuilder } = require('discord.js');
let setting = require('./../setting.json');

module.exports = {
    name: 'guildMemberAdd',
        async execute(member) {
            member.roles.add("955531414202351616")

            let channel = member.guild.channels.cache.get('955520258779779165')
            const Embed = new EmbedBuilder()
                .setColor(setting.colorEmbed)
                .setTitle('🖐 | Привет')
                .setDescription(`Привет, <@${member.id}>, добро пожаловать на сервер **RodoCraft**! Обязательно прочти <#${955509246684966932}>, а потом зайди в канал <#${955509414427783218}> и подай заявку на вайтлист сервера!`)
            return channel.send({embeds: [Embed]});
        }
}