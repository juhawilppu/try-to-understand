set -e


# not sure if necessary?
cd client
npm run build
cd ..

gcloud app deploy --verbosity=debug -v 1
sequelize db:migrate --env production
