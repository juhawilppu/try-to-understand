const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

module.exports = (app, sequelize) => {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await sequelize.models.User.findOne({
            where: {
                id
            }
        });
        done(null, user);
    });

    passport.use(
        new GoogleStrategy(
            {
                clientID: keys.google.clientId,
                clientSecret: keys.google.clientSecret,
                callbackURL: '/auth/google/callback',
                proxy: true
            },
            async (accessToken, refreshToken, profile, done) => {
                const existingUser = await sequelize.models.User.findOne({
                    where: {
                        google_id: profile._json.sub
                    }
                })

                console.log('finding existin for ' + profile._json.sub)

                if (existingUser) {
                    // We already have saved this customer to db
                    done(null, existingUser);
                } else {
                    // New user. Save it to db.

                    // Get index for username (TODO)
                    const lastUser = await sequelize.query(`SELECT * FROM Users ORDER BY id DESC LIMIT 1`, {model: sequelize.models.User});

                    const user = await sequelize.models.User.build({
                        google_id: profile._json.sub,
                        username: 'player-' + (lastUser.length > 0 ? lastUser[0].id + 1 : 1000),
                        email: profile._json.email,
                        language: 'english'
                    }).save();

                    console.log('saved user with ' + profile._json.sub);
                    done(null, user);
                }
            }
        )
    );

}