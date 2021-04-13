var mysql = require('mysql');

var connection = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: ''
});

connection.connect();


var getPlaylist = (userEmail, callback) => {
  console.log('connection worked')
    var query = `SELECT * FROM playlist where email = '${userEmail}' ORDER BY id DESC `

    connection.query(query, (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(null, data)
      }
    })
}

var postSong = (params, callback) => {
  const artist = params.artist
  const title = params.title
  const albumUrl = params.albumUrl
  const userEmail = params.userEmail

    var query = `INSERT INTO playlist (email, artist, title, albumUrl)
        SELECT * FROM (SELECT '${userEmail}', '${artist}', '${title}', '${albumUrl}') AS tmp
        WHERE NOT EXISTS (
            SELECT * FROM playlist WHERE email = '${userEmail}' AND title = '${title}'
        ) LIMIT 1;`


    connection.query(query, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        callback(null, data)
      }
    })
}

var removeSong = (songTitle, userEmail, callback) => {
  var query = `DELETE FROM playlist WHERE email = '${userEmail}' AND title = '${songTitle}'`;

  connection.query(query, (err, data) => {
    if (err) {
      callback(err)
    } else {
      callback(null, data)
    }
  })
}

  module.exports = {
    getPlaylist, postSong, removeSong,
  }