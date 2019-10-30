'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('assignments', 
      {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        answer: {
            // The written answer provided by the user
            type: Sequelize.STRING(500),
            allowNull: false
        },
        word_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        type: {
            /*
                Possible values:
                - TEXT_FREETEXT (Regular Alias type of assignment)
                - TEXT_OPTIONS (Alias type of assignment with list of options for the receiver)
            */
            type: Sequelize.STRING(128),
            allowNull: false
        },
        options: {
            /*
                TEXT_FREETEXT: null
                TEXT_OPTIONS: boy,girl,dog,man (a comma-separated list)
            */
            type: Sequelize.STRING(256)
        },
        language: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        downvotes: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        created_at: {
          type: Sequelize.DATE
        },
        updated_at: {
          type: Sequelize.DATE
        },
        deleted_at: {
          type: Sequelize.DATE
        }
      }
    );
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
