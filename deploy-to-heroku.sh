git push heroku master
heroku run sequelize db:migrate --env production --app trytounderstand
heroku run sequelize db:seed:all --env production --app trytounderstand
