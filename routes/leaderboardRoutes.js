const requireLogin = require('../middlewares/requireLogin');
const Sequlize = require('sequelize');
const Op = Sequlize.Op;

module.exports = (app, sequelize) => {

    app.get(
        '/api/leaderboards',
        requireLogin,
        async (req, res) => {
            const list = await sequelize.query(`
            select
                username,
                count(g.correct) filter (where g.correct = true) as explainer_correct_guesses,
                count(*) as explainer_all_guesses
            from users u
            left join assignments e on (u.id = e.user_id)
            left join guesses g on (e.id = g.assignment_id)
            group by username;
            `);
            res.send(list[0]);
        }
    );

}