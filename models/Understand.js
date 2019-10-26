const mongoose = require('mongoose');
const { Schema } = mongoose;

const understandSchema = new Schema({
    explanationId: String,
    guess: String,
    correct: Boolean,
    sent: Date,
    user: {
        id: String,
        email: String
    }
});

mongoose.model('understands', understandSchema);