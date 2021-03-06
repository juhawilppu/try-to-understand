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
        const list = await app.getList(user.username);
        done(null, {
            id: user.id,
            username: user.username,
            language: user.language,
            totalScore: list[0].total_score
        });
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

                if (existingUser) {
                    // We already have saved this customer to db
                    done(null, existingUser);
                } else {
                    // New user. Save it to db.
                    const user = await sequelize.models.User.build({
                        google_id: profile._json.sub,
                        email: profile._json.email,
                        language: 'english'
                    }).save();

                    done(null, user);
                }
            }
        )
    );

}