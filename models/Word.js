const mongoose = require('mongoose');
const { Schema } = mongoose;

const wordSchema = new Schema({
    english: String,
    french: String,
    finnish: String,
    created: Date
});

mongoose.model('words', wordSchema);