// const connection = require('../config/dbConnection');

// const getArtistProfile = (req, res) => {
//   const userId = req.user.id;
//   const query = 'SELECT name, email FROM artist WHERE id = ?';

//   connection.query(query, [userId], (err, results) => {
//     if (err) {
//       console.error('Error fetching artist profile:', err);
//       res.status(500).json({ error: 'An error occurred while fetching artist profile' });
//     } else {
//       res.json(results[0]);
//     }
//   });
// };

// module.exports = {
//   getArtistProfile,
// };
