const mongoose = require('mongoose');
const Explanation = mongoose.model('explanations');
const Word = mongoose.model('words');
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {

    app.get(
        '/api/assignment',
        requireLogin,
        async (req, res) => {
            const words = await Word.find();
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
            const words = await Word.find();
            res.send(words);
        }
    );

    app.post(
        '/api/words',
        requireLogin,
        async (req, res) => {
            const message = await new Word({
                english: req.body.english,
                french: req.body.french,
                finnish: req.body.finnish,
                user: {
                    userId: req.user.id,
                    email: req.user.email
                },
                created: Date.now()
            }).save();
            res.send(message);
        }
    );

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