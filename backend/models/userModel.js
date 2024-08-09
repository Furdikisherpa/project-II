// models/userModel.js
const db = require('../config/dbConnection');

const User = {
  findById: (id, callback) => {
    db.query('SELECT * FROM user WHERE id = ?', [id], (err, results) => {
      if (err) return callback(err);
      if (results.length > 0) {
        callback(null, results[0]);
      } else {
        callback(new Error('User not found'));
      }
    });
  },
};

const Artist = {
  findById: (id, callback) => {
    db.query('SELECT * FROM artist WHERE id = ?', [id], (err, results) => {
      if (err) return callback(err);
      if (results.length > 0) {
        callback(null, results[0]);
      } else {
        callback(new Error('Artist not found'));
      }
    });
  },
};

module.exports = {
  User,
  Artist,
};
