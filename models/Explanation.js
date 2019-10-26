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
            type: Sequelize.STRING(50)
        },
        word_id: {
            type: Sequelize.INTEGER
        },
        language: {
            type: Sequelize.STRING(50)
        },
        downvotes: {
            type: Sequelize.INTEGER
        },
        sent: {
            type: Sequelize.DATE
        },
        user_id: {
            type: Sequelize.INTEGER
        }
    }, {
        sequelize
    });
}