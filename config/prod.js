// Production keys are defined here
module.exports = {
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    cookieKey: process.env.COOKIE_KEY,
    postgres: {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    }
}