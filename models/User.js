const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {}
    User.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        google_id: {
            type: Sequelize.STRING(50)
        },
        email: {
            type: Sequelize.STRING(50)
        },
        language: {
            type: Sequelize.STRING(50)
        }
    }, {
        sequelize
    });
}