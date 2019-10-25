const mongoose = require('mongoose');
const { Schema } = mongoose;

const explanationSchema = new Schema({
    explanation: String,
    word: String,
    language: String,
    sent: Date,
    user: {
        id: String,
        email: String
    }
});

mongoose.model('explanations', explanationSchema);