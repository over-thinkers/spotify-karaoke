const { User } = require('./mongo');

const getUser = (email, callback) => {
  User.find({ email }, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  })
}

const createUser = (email, playlist, callback) => {
  User.create({ email, playlist }, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  })
}

const updatePlaylist = (email, playlist, callback) => {
  User.updateOne({ email }, { playlist }, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  })
}

module.exports = {
  getUser,
  createUser,
  updatePlaylist,
}