const requireLogin = require('../middlewares/requireLogin');

module.exports = (app, sequelize) => {

    app.get(
        '/api/guess',
        requireLogin,
        async (req, res) => {
            const explanations = await sequelize.models.Explanation.findAll({
                where: {
                    downvotes: 0
                }
            })

            if (explanations.length === 0) {
                res.send({ message: 'No explanations on server'}, 404);
            }

            function random(mn, mx) {
                return Math.random() * (mx - mn) + mn;  
            } 
            const explanation = explanations[Math.floor(random(0, explanations.length))];
            res.send(explanation);
        }
    );

    app.post(
        '/api/guess',
        requireLogin,
        async (req, res) => {

            const explanation = await sequelize.models.Explanation.findByPk(req.body.assignmentId);

            const message = await sequelize.models.Guess.build({
                assignmentId: explanation.id,
                guess: req.body.guess,
                correct: explanation.word === req.body.guess,
                userId: req.user.id
            }).save();
            res.send({
                correct: message.correct,
                correctAnswer: explanation.word
            });
        }
    );

    app.post(
        '/api/guess/report/:id',
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

}