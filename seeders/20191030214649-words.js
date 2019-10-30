'use strict';
const fs = require('fs');

module.exports = {
  up: (queryInterface, Sequelize) => {

    const content = fs.readFileSync('./config/words.txt', 'utf8');
    const words = content.split('\n').map(r => {
      return {
        english: r,
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
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
