const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB!');
});

const userSchema = new mongoose.Schema({
  email: String,
  playlist: [
    {
      artist: String,
      title: String,
      uri: String,
      albumUrl: String,
      length: Number,
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
};
