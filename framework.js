const { EmbedBuilder } = require('discord.js');

function error (description) {
    const response = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle('❌ | Ошибка')
        .setDescription(description);
    return response;
}

module.exports = {
    error: error,
}