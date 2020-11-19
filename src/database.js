const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:P@ssw0rd@cluster0.zo5ak.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var mongooseConnect = mongoose.connection;

mongoose.set('useFindAndModify', false);

const Note = mongoose.model("Note", {
    title: String,
    date: String,
    url: String,
    content: String,
    video: String,
    reminder: String,
    Image: String
});

const Upcoming = mongoose.model("Upcoming", {
    title: String,
    date: String,
    url: String,
    content: String,
    video: String,
    reminder: String,
    Image: String
});

module.exports = {
    Note,
    Upcoming,
}