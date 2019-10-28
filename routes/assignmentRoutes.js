const requireLogin = require('../middlewares/requireLogin');

module.exports = (app, sequelize) => {

    const shuffleArray = array => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    /**
     * Get a random list of Words which also contains the given word.
     */
    const getRandomOptions = (wordId) => {
        return sequelize
        .query(`
            (SELECT * FROM Words WHERE id != ${wordId} ORDER BY random() LIMIT 9)
            UNION
            (SELECT * FROM Words WHERE id = ${wordId})
            `,
        { model: sequelize.models.Word });
    }

    app.get(
        '/api/assignments/:language',
        requireLogin,
        async (req, res) => {
            const words = await sequelize.query(`
            SELECT * FROM Words ORDER BY random() LIMIT 1
            `, { model: sequelize.models.Word });

            const assignment = {
                word: words[0],
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
                shuffleArray(await getRandomOptions(req.body.word_id));

            const message = await sequelize.models.Assignment.build({
                answer: req.body.answer,
                word_id: req.body.word_id,
                options: options ? options.map(o => o[req.body.language]).join(',') : null,
                language: req.body.language,
                type: req.params.assignmentType,
                user_id: req.user.id
            }).save();
            res.send(message);
        }
    );
}