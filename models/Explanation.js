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

    // The naming is totally the opposite than what is actually happening
    Explanation.belongsTo(sequelize.models.Word, {foreignKey: 'word_id'})
    Explanation.hasMany(sequelize.models.Guess, {foreignKey: 'explanation_id'})
}