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
    const getRandomOptions = (wordId, language) => {
        return sequelize
        .query(`
            (select * from words where language = :language and id != :word_id order by random() limit 8)
            union
            (select * from words where id = :word_id)
            `,
        {
            replacements: {
                language,
                word_id: wordId
            },
            model: sequelize.models.Word 
        });
    }

    app.get(
        '/api/assignments/me',
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

    app.get(
        '/api/assignments/:language',
        requireLogin,
        async (req, res) => {
            const words = await sequelize.query(`
            select * from words where language = :language order by random() limit 1
            `, {
                replacements: { language: req.params.language },
                model: sequelize.models.Word
            });

            const assignment = {
                word: words[0],
                language: req.params.language
            }

            res.send(assignment);
        }
    );
    
    app.post(
        '/api/assignments/:assignmentType',
        requireLogin,
        async (req, res) => {

            const options = req.params.assignmentType === 'TEXT_FREETEXT' ?
                null :
                shuffleArray(await getRandomOptions(req.body.word_id, req.body.language));

            const message = await sequelize.models.Assignment.build({
                answer: req.body.answer,
                word_id: req.body.word_id,
                options: options ? options.map(o => o.word).join(',') : null,
                language: req.body.language,
                type: req.params.assignmentType,
                downvotes: 0,
                user_id: req.user.id
            }).save();
            res.send(message);
        }
    );
}