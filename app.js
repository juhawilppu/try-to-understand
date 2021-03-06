const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const Sequelize = require('sequelize');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

Array.prototype.unique = function() {
    return [...new Set(this)]
}

const sequelize = new Sequelize(keys.postgres.database, keys.postgres.username, keys.postgres.password, {
    host: keys.postgres.host,
    dialect: 'postgresql',
    define: {
        timestamps: true,
        paranoid: true,
        underscored: true
    },
    force: false // If true, will drop all tables and rebuild schema
});

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [keys.cookieKey] // cookie encryption key
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

require('./models/User')(sequelize);
require('./models/Word')(sequelize);
require('./models/Guess')(sequelize);
require('./models/Assignment')(sequelize);

require('./routes/authRoutes')(app, sequelize);
require('./routes/assignmentRoutes')(app, sequelize);
require('./routes/guessRoutes')(app, sequelize);
require('./routes/adminRoutes')(app, sequelize);
require('./routes/leaderboardRoutes')(app, sequelize);

require('./services/passportConfig')(app, sequelize);

if (['production', 'ci'].includes(process.env.NODE_ENV)) {
    // Express will serve the client main.js etc.
    app.use(express.static('client/build'));

    // Express will redirect to / if it's doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);