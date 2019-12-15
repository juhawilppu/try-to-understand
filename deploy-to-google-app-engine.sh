set -e

# Build frontend because production mode will use it
cd client
npm run build
cd ..

gcloud app deploy --verbosity=debug -v 1
sequelize db:migrate --env production
