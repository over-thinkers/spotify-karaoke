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
    // var query = `SELECT * FROM playlist where email = '${userEmail}'`
  
    // client.query(query, (err, data) => {
    //   if (err) {
    //     callback(err)
    //   } else {
    //     console.log(data.rows)
    //     callback(null, data.rows)
    //   }
    // })
}

var postSong = (userEmail, callback) => {
    // var query = `DELETE FROM playlist WHERE title = ${title}`;
    // var query = `INSERT INTO playlist (email, artist, title, albumUrl) VALUES (${userEmail}, ${artist}, ${title}, ${albumUrl})'`
    // client.query(query, (err, data) => {
    //   if (err) {
    //     callback(err)
    //   } else {
    //     console.log(data.rows)
    //     callback(null, data.rows)
    //   }
    // })
}

var removeSong = (userEmail, songTitle, callback) => {
  // var query = `DELETE FROM playlist WHERE email = ${userEmail} title = ${songTitle}`;
  // client.query(query, (err, data) => {
  //   if (err) {
  //     callback(err)
  //   } else {
  //     console.log(data.rows)
  //     callback(null, data.rows)
  //   }
  // })
}

  module.exports = {
    getPlaylist, postSong, removeSong,
  }