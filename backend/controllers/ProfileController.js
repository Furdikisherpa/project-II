// Import the database connection configuration.
const conn = require('../config/dbConnection');

// Define the getProfile function, which handles the request to retrieve a user's profile.
const getProfile = (req, res) => {
  // Extract the user ID from the authenticated request's user object.
  const userId = req.user.id;

  // First, query the database to find out the user's type.
  conn.query('SELECT user_type FROM user WHERE id = ?', [userId], (err, results) => {
    // Handle any errors that occur during the database query.
    if (err) {
      console.error('Error fetching user type:', err);
      // Respond with a 500 status code and an error message if an error occurs.
      return res.status(500).json({ error: 'An error occurred while fetching user type.' });
    }
    
    // If no results are found, it means the user doesn't exist in the database.
    if (results.length === 0) {
      // Respond with a 404 status code indicating that the user was not found.
      return res.status(404).json({ error: 'User not found.' });
    }

    // Extract the user type from the query results.
    const userType = results[0].user_type;

    // Initialize variables for the query string and query parameters.
    let query = '';
    let queryParams = [];
    
    // Based on the user type, set the appropriate query to fetch profile data.
    if (userType === 'artist') {
      // If the user is an artist, fetch the profile from the artist table.
      query = 'SELECT * FROM artist WHERE id = ?';
      queryParams = [userId];
    } else {
      // Otherwise, fetch the profile from the user table.
      query = 'SELECT * FROM user WHERE id = ?';
      queryParams = [userId];
    }

    // Execute the query to fetch the profile data.
    conn.query(query, queryParams, (err, results) => {
      // Handle any errors that occur during the database query.
      if (err) {
        console.error('Error fetching profile data:', err);
        // Respond with a 500 status code and an error message if an error occurs.
        return res.status(500).json({ error: 'An error occurred while fetching the profile data.' });
      }
      
      // If no profile data is found, respond with a 404 status code.
      if (results.length === 0) {
        return res.status(404).json({ error: 'Profile not found.' });
      }

      // Extract the profile data from the query results.
      const profileData = results[0];
      // Respond with the profile data in JSON format.
      res.json(profileData);
    });
  });
};

// Export the getProfile function so it can be used in other parts of the application.
module.exports = {
  getProfile
};
