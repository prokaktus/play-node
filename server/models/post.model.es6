const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
    author: { type: ObjectId, required: true },
    body: { type: String, required: true },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Post', PostSchema);