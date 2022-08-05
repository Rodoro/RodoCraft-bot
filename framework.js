const { EmbedBuilder } = require('discord.js');
const setting = require('./setting.json');

function error (description) {
    const response = new EmbedBuilder()
        .setColor(setting.colorEmbed)
        .setTitle('❌ | Ошибка')
        .setDescription(description);
    return response;
}

module.exports = {
    error: error,
}