git push heroku master
heroku run sequelize db:migrate --env production --app trytounderstand
