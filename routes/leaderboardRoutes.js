const requireLogin = require('../middlewares/requireLogin');
const Sequlize = require('sequelize');

module.exports = (app, sequelize) => {

    app.getList = async (username) => {
        const usernameFilter = username ? `where u.username='${username}'` : ``;
        const list = await sequelize.query(`
            WITH
            explains as (
                select
                    username,
                    count(g.correct) filter (where g.correct = true) as correct,
                    count(g.correct) as all
                from users u
                left join assignments e on (u.id = e.user_id)
                left join guesses g on (e.id = g.assignment_id)
                group by username
            ),
            guesses as (
                select
                    username,
                    count(g.correct) filter (where g.correct = true) as correct,
                    count(g.correct) as all
                from users u
                left join guesses g on (u.id = g.user_id)
                group by username
            )
            select
            u.id,
            u.username,
            explains.correct as explains_correct,
            explains.all as explains_all,
            guesses.correct as guesses_correct,
            guesses.all as guesses_all,
            explains.correct-(explains.all-explains.correct)+guesses.correct-(guesses.all-guesses.correct) as total_score
            from users u
            left join explains on (u.username = explains.username)
            left join guesses on (u.username = guesses.username)
            ${usernameFilter}
            order by total_score desc;
        `);
        return list[0]; // the query returns some weird nested array
    }

    app.get(
        '/api/leaderboards/me',
        requireLogin,
        async (req, res) => {
            const list = await app.getList(req.user.username);
            res.send(list[0]);
    });

    app.get(
        '/api/leaderboards',
        requireLogin,
        async (req, res) => {
            const list = await app.getList();
            res.send(list);
        }
    );

}