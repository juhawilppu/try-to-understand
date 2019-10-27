const requireLogin = require('../middlewares/requireLogin');

module.exports = (app, sequelize) => {

    app.get(
        '/api/guess',
        requireLogin,
        async (req, res) => {
            const explanations = await sequelize.models.Explanation.findAll();

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
            const word = await sequelize.models.Word.findByPk(explanation.word_id);

            console.log('received guess ' + req.body.guess);
            console.log('word in english' + word.english);
            console.log('guess language' + explanation.language);

            const message = await sequelize.models.Guess.build({
                assignmentId: explanation.id,
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