const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    class Assignment extends Model {}
    Assignment.init({
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
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        sequelize
    });

    // The naming is totally the opposite than what is actually happening
    Assignment.belongsTo(sequelize.models.Word, {foreignKey: 'word_id'})
    Assignment.hasMany(sequelize.models.Guess, {foreignKey: 'assignment_id'})
}