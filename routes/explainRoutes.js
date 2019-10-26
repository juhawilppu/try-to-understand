const requireLogin = require('../middlewares/requireLogin');

module.exports = (app, sequelize) => {

    app.get(
        '/api/assignment',
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
                language: 'french',
                languageUi: 'French'
            }

            res.send(assignment);
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