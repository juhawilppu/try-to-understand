# TryToUnderstand

Language learning platform where you explain words (in writing) and try to guess what other have explained. Gain points with each successful guess by you or others.

## Architecture

Built using React, NodeJS and PostgreSQL. Frontend uses TypeScript but backend doesn't (yet). Uses Google OAuth 2.0 for authentication.

Deployed as a NodeJS service where the compiled frontend code is baked in and served using express. Contains scripts for Google App Engine and Heroku deployment. Deployment expects to have a remote PostgreSQL running somewhere.

## How to run locally

Create a file `config/dev.js` with the secrets (Google OAuth 2.0 configuration etc.). See example of format from `config/prod.js`.

Start local PostgreSQL
```
docker-compose up -d
```

Migrate database
```
./migrate-dev-db.sh
```

Start frontend and backend
```
cd client
npm install
cd ..
npm install
npm run dev
```

The app should now be running on [localhost:3000](http://localhost:3000/).

## How to configure Google OAuth 2.0
Got to [https://console.developers.google.com](https://console.developers.google.com) .

1. Create a new project by clicking the top bar, then click "NEW PROJECT". It takes about 1 minute until it's created.
2. On the "APIs & Services" -page Dashboard, click "ENABLE APIS AND SERVICES".
3. Search for "Google+ API" and open it. Click "Enable".
4. Goto "Credentials" -page. Click "CREATE CREDENTIAL".
5. Settings:
"Which API are you using" -> Google+ API
"Where will you be caliling the API from?" -> Web browser (Javascript)
"What data will you be accessing?" -> User data

Next, click on "What credentials do I need?"
Click "SET UP A CONSENT SCREEN". Write something to "Application name" and click "Save".

6. You should now be in "Credentials" -page again.
Click "Create credentials" -> OAuth client id.
"Application type" -> Web application
"Authorized JavaScript origins" -> http://localhost:3000
"Authorized redirect URIs" -> http://localhost:3000/auth/google/callback

A popup should open with the keys.

7. Create a file `./config/dev.js` like below and insert the keys there.
```
module.exports = {
    google: {
        clientId: "${Insert here the Client ID}",
        clientSecret: "${Insert here the Client secret}"
    },
    ...
}
```

Google OAuth is now configured.

## How to create a Heroku project
Install Heroku CLI tools
```
brew tap heroku/brew && brew install heroku
```

Configure credentials and create a new project
```
heroku login
heroku create
```

Heroku is now configured.

## How to deploy to Heroku
Complete steps mentioned in [create a Heroku project](#how-to-create-a-heroku-project) first.

Deploy to Heroku by pushing your latest commit to Heroku
```
git push heroku master
```

Go to https://limitless-ocean-63000.herokuapp.com/ or whatever is your Heroku application URL.

## How to deploy to Google App Engine
Ensure that `gcloud` is configured to the correct Google project.

Then run
```
./deploy-to-google.sh
```

## Built with
* [NodeJS](https://nodejs.org/en/) with [express](https://expressjs.com/)
* [React](https://reactjs.org/), [Redux](https://redux.js.org/) and [TypeScript](https://www.typescriptlang.org/).
* [Google OAuth](https://developers.google.com/identity/protocols/OAuth2).
* [PostgreSQL](https://www.postgresql.org/)
