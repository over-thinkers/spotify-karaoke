var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'spoti-oki'
});
 
connection.connect();

var getPlaylist = (userEmail, callback) => {
    var query = `SELECT * FROM userinfo where email = '${userEmail}'`
  
    client.query(query, (err, data) => {
      if (err) {
        callback(err)
      } else {
        console.log(data.rows)
        callback(null, data.rows)
      }
    })
}

// var postPlaylist = (userEmail, callback) => {
//     var query = `SELECT * FROM userinfo where email = '${userEmail}'`
  
//     client.query(query, (err, data) => {
//       if (err) {
//         callback(err)
//       } else {
//         console.log(data.rows)
//         callback(null, data.rows)
//       }
//     })
// }

  module.exports = {
    getPlaylist, postPlaylist
  }