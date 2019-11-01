set -e


# not sure if necessary?
cd client
npm run build
cd ..

gcloud app deploy --verbosity=debug
heroku run sequelize db:migrate --env production --app trytounderstand
#heroku run sequelize db:seed:all --env production --app trytounderstand
