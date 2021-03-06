// Config file for sequelize-ci

module.exports = {
  "ci": {
    "username": "postgres",
    "password": "example",
    "database": "postgres",
    "host": "localhost",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "development": {
    "username": "postgres",
    "password": "example",
    "database": "postgres",
    "host": "localhost",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "operatorsAliases": false
  }
}