'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = [
        {
            username: "ci-test-1",
            google_id: "000000000",
            email: "ci@example.com",
            language: "english"
        }
    ]
    return queryInterface.bulkInsert('users', users, {});
  },

  down: (queryInterface, Sequelize) => {

  }
};
