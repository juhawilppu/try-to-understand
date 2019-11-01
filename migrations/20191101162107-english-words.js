'use strict';
const fs = require('fs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const content = fs.readFileSync('./migrations/english_words.txt', 'utf8');
    const words = content.split('\n').map(word => {
      return {
        language: 'english',
        word: word,
        description: word,
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
