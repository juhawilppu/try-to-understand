const requireLogin = require('../middlewares/requireLogin');

module.exports = (app, sequelize) => {

    const getRandomOptions = (wordId) => {
        return sequelize
        .query('SELECT * FROM words ORDER BY random() LIMIT 4',
        { model: sequelize.models.Word });
    }

    // Not really in use, used for testing.
    app.get(
        '/api/assignments/random',
        requireLogin,
        async (req, res) => {
            res.send(await getRandomOptions(1));
        });

    app.get(
        '/api/assignments/:language',
        requireLogin,
        async (req, res) => {
            const words = await sequelize.models.Word.findAll();
            if (words.length === 0) {
                return res.send({ message: 'No words on server'}, 404);
            }

            function random(mn, mx) {
                return Math.random() * (mx - mn) + mn;  
            } 
            const word = words[Math.floor(random(0, words.length))];

            const assignment = {
                word,
                language: req.params.language
            }

            res.send(assignment);
        }
    );

    app.get(
        '/api/assignments',
        requireLogin,
        async (req, res) => {
            const messages = await sequelize.models.Assignment.findAll({
                where: {
                    user_id: req.user.id
                },
                include: [sequelize.models.Word, sequelize.models.Guess]
            })
            res.send(messages);
        }
    );
    
    app.post(
        '/api/assignments/:assignmentType',
        requireLogin,
        async (req, res) => {

            const options = req.params.assignmentType === 'TEXT_FREETEXT' ?
                null :
                await getRandomOptions(req.body.word_id);

            const message = await sequelize.models.Assignment.build({
                explanation: req.body.explanation,
                word_id: req.body.word_id,
                options: options ? options.map(o => o[req.body.language]).join(',') : null,
                language: req.body.language,
                user_id: req.user.id
            }).save();
            res.send(message);
        }
    );
}