const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    class Guess extends Model {}
    Guess.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        assignment_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        guess: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        correct: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        sequelize
    });
}