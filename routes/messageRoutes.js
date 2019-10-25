const mongoose = require('mongoose');
const Explanation = mongoose.model('explanations');
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    app.get(
        '/api/explanations',
        requireLogin,
        async (req, res) => {
            const messages = await Explanation.find();
            res.send(messages);
        }
    );
    
    app.post(
        '/api/explanations',
        requireLogin,
        async (req, res) => {
            const message = await new Explanation({ 
                explanation: req.body.explanation,
                word: req.body.word,
                language: req.body.language,
                user: {
                    userId: req.user.id,
                    email: req.user.email
                },
                sent: Date.now()
            }).save();

            res.send(message);
        }
    );
}