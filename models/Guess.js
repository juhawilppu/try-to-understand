const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    class Guess extends Model {}
    Guess.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        explanationId: {
            type: Sequelize.INTEGER
        },
        guess: {
            type: Sequelize.STRING(50)
        },
        correct: {
            type: Sequelize.BOOLEAN
        },
        user_id: {
            type: Sequelize.INTEGER
        }
    }, {
        sequelize
    });
}