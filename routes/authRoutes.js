const passport = require('passport');

module.exports = (app, sequelize) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
    
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/')
        })
    
    app.get('/api/logout', (req, res) => {
        req.logout()
        res.redirect('/')
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    app.put('/api/current_user', async (req, res) => {
        const user = await sequelize.models.User.findOne({
            where: {
                id: req.user.id
            }
        });
        user.language = req.body.language;
        user.save();
        res.send(user);
    });

}