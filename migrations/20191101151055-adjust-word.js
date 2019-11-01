'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.renameColumn('words', 'english', 'word'),
                queryInterface.addColumn('words', 'language', Sequelize.STRING(16)),
                queryInterface.addColumn('words', 'description', Sequelize.STRING(256))
            ]);
        });
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
