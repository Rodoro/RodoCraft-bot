const { EmbedBuilder } = require('discord.js');
let setting = require('./../setting.json');

module.exports = {
    name: 'guildMemberRemove',
        async execute(member) {
            let channel = member.guild.channels.cache.get('955520258779779165')
            const Embed = new EmbedBuilder()
                .setColor(setting.colorEmbed)
                .setTitle('😥 | Прощай')
                .setDescription(`Нам тебя будет нехватать ${member.user.username}#${member.user.discriminator}`)
            return channel.send({embeds: [Embed]});
        }
}