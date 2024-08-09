// controllers/ProfileController.js
const conn = require('../config/dbConnection');

const getProfile = (req, res) => {
  const userId = req.user.id; // Extract userId from req.user

  // First, find out the user type
  conn.query('SELECT user_type FROM user WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user type:', err);
      return res.status(500).json({ error: 'An error occurred while fetching user type.' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const userType = results[0].user_type;

    // Now, fetch the profile data based on the user type
    let query = '';
    let queryParams = [];
    
    if (userType === 'artist') {
      query = 'SELECT * FROM artist WHERE id = ?';
      queryParams = [userId];
    } else {
      query = 'SELECT * FROM user WHERE id = ?';
      queryParams = [userId];
    }

    conn.query(query, queryParams, (err, results) => {
      if (err) {
        console.error('Error fetching profile data:', err);
        return res.status(500).json({ error: 'An error occurred while fetching the profile data.' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Profile not found.' });
      }

      const profileData = results[0];
      res.json(profileData); // Ensure this is JSON
    });
  });
};

module.exports = {
  getProfile
};
