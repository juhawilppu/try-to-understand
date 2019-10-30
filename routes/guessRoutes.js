const requireLogin = require('../middlewares/requireLogin');
const Sequlize = require('sequelize');

module.exports = (app, sequelize) => {

    /*
        Get an explanation randomly from some user other than myself.
        Skip if already answered.
    */
    app.get(
        '/api/guess',
        requireLogin,
        async (req, res) => {
            const explanations = await sequelize.query(`
                select * from assignments where user_id != ${req.user.id}
                and downvotes < 2
                and id not in (select assignment_id from guesses where user_id=${req.user.id})
                order by random() limit 1
            `,
            { model: sequelize.models.Assignment });
            const explanation = explanations[0];

            if (explanation) {
                const user = await sequelize.models.User.findByPk(explanation.user_id);
                res.send({explanation, user});
            } else {
                res.send({message: 'Not explanations found'}, 404);
            }

        }
    );

    app.post(
        '/api/guess',
        requireLogin,
        async (req, res) => {
            
            const assignment = await sequelize.models.Assignment.findByPk(req.body.assignment_id);
            const word = await sequelize.models.Word.findByPk(assignment.word_id);

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

    app.post(
        '/api/guess/report/:assignmentId',
        requireLogin,
        async (req, res) => {            
            const assignment = await sequelize.models.Assignment.findByPk(req.params.assignmentId);
            assignment.downvotes = assignment.downvotes + 1;
            assignment.save();

            res.send({
                message: 'Downvoted'
            });
        }
    );

}