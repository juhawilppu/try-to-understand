const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    class Assignment extends Model {}
    Assignment.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        explanation: {
            type: Sequelize.STRING(400)
        },
        word_id: {
            type: Sequelize.INTEGER
        },
        type: {
            /*
                Possible values:
                - TEXT_FREETEXT (Regular Alias type of assignment)
                - TEXT_OPTIONS (Alias type of assignment with list of options for the receiver)
            */
            type: Sequelize.STRING(128)
        },
        options: {
            /*
                TEXT_FREETEXT: null
                TEXT_OPTIONS: boy,girl,dog,man (a comma-separated list)
            */
            type: Sequelize.STRING(256)
        },
        language: {
            type: Sequelize.STRING(50)
        },
        user_id: {
            type: Sequelize.INTEGER
        }
    }, {
        sequelize
    });

    // The naming is totally the opposite than what is actually happening
    Assignment.belongsTo(sequelize.models.Word, {foreignKey: 'word_id'})
    Assignment.hasMany(sequelize.models.Guess, {foreignKey: 'assignment_id'})
}