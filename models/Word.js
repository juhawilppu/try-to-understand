const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    class Word extends Model {}
    Word.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        english: {
            type: Sequelize.STRING(256)
        },
        finnish: {
            type: Sequelize.STRING(256)
        },
        user_id: {
            type: Sequelize.INTEGER
        }
    }, {
        sequelize
    });
}