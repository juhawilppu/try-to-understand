const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {}
    User.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING(32)
        },
        google_id: {
            type: Sequelize.STRING(64),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(64),
            allowNull: false
        },
        language: {
            type: Sequelize.STRING(64),
            allowNull: false
        }
    }, {
        sequelize
    });
}