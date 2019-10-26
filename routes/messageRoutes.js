const mongoose = require('mongoose');
const Explanation = mongoose.model('explanations');
const Word = mongoose.model('words');
const Understand = mongoose.model('understands');
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {

    app.get(
        '/api/understand',
        requireLogin,
        async (req, res) => {
            const explanations = await Explanation.find({ downvotes: null });

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

            const explanation = await Explanation.findById(req.body.assignmentId);

            const message = await new Understand({
                assignmentId: explanation.id,
                guess: req.body.guess,
                correct: explanation.word === req.body.guess,
                user: {
                    userId: req.user.id,
                    email: req.user.email
                },
                created: Date.now()
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
            const explanation = await Explanation.findById(req.params.id);
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
            const messages = await Explanation.find({ "user.id": req.user.id });

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
                    id: req.user.id,
                    email: req.user.email
                },
                sent: Date.now()
            }).save();

            res.send(message);
        }
    );
}