const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    class Explanation extends Model {}
    Explanation.init({
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
        language: {
            type: Sequelize.STRING(50)
        },
        user_id: {
            type: Sequelize.INTEGER
        }
    }, {
        sequelize
    });
}