const connection = require('../config/dbConnection');

const getbooking = (req, res) => {
  
    connection.query('SELECT * FROM booking ', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching booking' });
        }

        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'No Bookings found' });
        }

        res.status(200).json(results[0]);
    });
};

module.exports = { getbooking };
