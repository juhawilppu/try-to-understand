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

            const user = await sequelize.models.User.findByPk(explanation.user_id);

            res.send({explanation, user});
        }
    );

    app.post(
        '/api/guess',
        requireLogin,
        async (req, res) => {

            console.log(req.body);
            
            const assignment = await sequelize.models.Assignment.findByPk(req.body.assignment_id);
            const word = await sequelize.models.Word.findByPk(assignment.word_id);

            console.log('received guess ' + req.body.guess);
            console.log('word in english' + word.english);
            console.log('guess language' + assignment.language);

            const guess = await sequelize.models.Guess.build({
                assignment_id: assignment.id,
                guess: req.body.guess,
                correct: word[assignment.language] === req.body.guess,
                user_id: req.user.id
            }).save();
            res.send({
                correct: guess.correct,
                correctAnswer: word[assignment.language]
            });
        }
    );

}