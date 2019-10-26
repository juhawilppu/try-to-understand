const requireLogin = require('../middlewares/requireLogin');

module.exports = (app, sequelize) => {

    app.get(
        '/api/understand',
        requireLogin,
        async (req, res) => {
            const explanations = await sequelize.models.Explanation.findAll({
                where: {
                    downvotes
                }
            })

            if (explanations.length === 0) {
                res.send(null, 404);
            }

            function random(mn, mx) {
                return Math.random() * (mx - mn) + mn;  
            } 
            const explanation = explanations[Math.floor(random(0, explanations.length))];
            res.send(explanation);
        }
    );

    app.post(
        '/api/understand',
        requireLogin,
        async (req, res) => {

            const explanation = await sequelize.models.Explanation.findByPk(req.body.assignmentId);

            const message = await sequelize.models.Guess.build({
                assignmentId: explanation.id,
                guess: req.body.guess,
                correct: explanation.word === req.body.guess,
                user_id: req.user.id
            }).save();
            res.send({
                correct: message.correct,
                correctAnswer: explanation.word
            });
        }
    );

    app.post(
        '/api/understand/report/:id',
        requireLogin,
        async (req, res) => {

            console.log('downvoting ' + req.params.id)
            const explanation = await sequelize.models.Explanation.findByPk(req.params.id);
            explanation.downvotes = 1;
            explanation.save();

            res.send({
                message: 'reported'
            });
        }
    );

    app.get(
        '/api/assignment',
        requireLogin,
        async (req, res) => {
            const words = await sequelize.models.Word.findAll();
            if (words.length === 0) {
                return res.send(null, 404);
            }

            function random(mn, mx) {
                return Math.random() * (mx - mn) + mn;  
            } 
            const word = words[Math.floor(random(0, words.length))];

            const assignment = {
                word,
                language: 'french',
                languageUi: 'French'
            }

            res.send(assignment);
        }
    );

    app.get(
        '/api/words',
        requireLogin,
        async (req, res) => {
            const words = await sequelize.models.Word.findAll();
            res.send(words);
        }
    );

    app.post(
        '/api/words',
        requireLogin,
        async (req, res) => {
            const message = await sequelize.models.Word.build({
                english: req.body.english,
                french: req.body.french,
                finnish: req.body.finnish,
                swedish: req.body.swedish,
                user_id: req.user.id
            }).save();
            res.send(message);
        }
    );

    app.delete(
        '/api/words/:id',
        requireLogin,
        async (req, res) => {
            const word = await Word.findById(req.params.id);
            word.delete();
            res.send({message: 'deleted'});
        }
    );

    app.get(
        '/api/explanations',
        requireLogin,
        async (req, res) => {
            const messages = await sequelize.models.Explanation.findAll({
                where: {
                    user_id: req.user.id
                }
            })

            res.send(messages);
        }
    );
    
    app.post(
        '/api/explanations',
        requireLogin,
        async (req, res) => {
            const message = await sequelize.models.Explanation.build({
                explanation: req.body.explanation,
                word: req.body.word,
                language: req.body.language,
                user_id: req.user.id
            }).save();
            res.send(message);
        }
    );
}