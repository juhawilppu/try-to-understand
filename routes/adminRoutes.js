const requireLogin = require('../middlewares/requireLogin');
const fs = require('fs');

module.exports = (app, sequelize) => {

    app.get(
        '/api/admin/words/add-basic',
        requireLogin,
        async(req, res) => {

            fs.readFile('./config/words.txt', 'utf8', function(err, data) {
                if (err) {
                    res.send(err, 500);
                } else {
                    const words = data.split('\n');
                    const promises = words.map(b => {
                        sequelize.models.Word.build({
                            english: b,
                            userId: -1
                        }).save();
                    });

                    Promise.all(promises).then(r => {
                        res.send({message: 'saved'});
                    }).catch(err => {
                        res.send({message: 'failed'}, 500);
                    })
                }
            })
        }
    );

    app.get(
        '/api/admin/words',
        requireLogin,
        async (req, res) => {
            const words = await sequelize.models.Word.findAll();
            res.send(words);
        }
    );

    app.post(
        '/api/admin/words',
        requireLogin,
        async (req, res) => {
            const message = await sequelize.models.Word.build({
                english: req.body.english,
                french: req.body.french,
                finnish: req.body.finnish,
                swedish: req.body.swedish,
                userId: req.user.id
            }).save();
            res.send(message);
        }
    );

    app.delete(
        '/api/admin/words/:id',
        requireLogin,
        async (req, res) => {
            const word = await sequelize.models.Word.findById(req.params.id);
            word.delete();
            res.send({message: 'deleted'});
        }
    );

}