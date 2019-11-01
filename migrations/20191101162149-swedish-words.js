'use strict';
const fs = require('fs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const content = fs.readFileSync('./migrations/swedish_words.txt', 'utf8');
    const words = content.split('\n').map(row => {
        const word = row.split('\t')[1];
        const description = row.split('\t')[2];
        return {
          language: 'swedish',
          word: word,
          description: description,
          user_id: -1
        }
    });
    return queryInterface.bulkInsert('words', words, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
