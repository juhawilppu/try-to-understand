const requireLogin = require('../middlewares/requireLogin');
const Sequlize = require('sequelize');
const Op = Sequlize.Op;

module.exports = (app, sequelize) => {

    app.get(
        '/api/guess',
        requireLogin,
        async (req, res) => {
            // Get an explanation randomly from some user other than myself
            const explanations = await sequelize.query(`SELECT * FROM Assignments WHERE user_id != ${req.user.id} ORDER BY random() LIMIT 1`,
            { model: sequelize.models.Assignment });
            const explanation = explanations[0];
            res.send(explanation);
        }
    );

    app.post(
        '/api/guess',
        requireLogin,
        async (req, res) => {

            console.log(req.body);
            
            const explanation = await sequelize.models.Assignment.findByPk(req.body.assignmentId);
            console.log('explanation')
            console.log(explanation)
            const word = await sequelize.models.Word.findByPk(explanation.wordId);

            console.log('received guess ' + req.body.guess);
            console.log('word in english' + word.english);
            console.log('guess language' + explanation.language);

            const message = await sequelize.models.Guess.build({
                explanationId: explanation.id,
                guess: req.body.guess,
                correct: word[explanation.language] === req.body.guess,
                userId: req.user.id
            }).save();
            res.send({
                correct: message.correct,
                correctAnswer: word[explanation.language]
            });
        }
    );

}