// controllers/bookingController.js
const connection = require('../config/dbConnection');

// Function to get all bookings
const getBookings = (callback) => {
    const query = 'SELECT * FROM booking';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching bookings:', err);
            if (typeof callback === 'function') {
                return callback(err, null);
            } else {
                console.error('Callback is not a function');
            }
        } else {
            if (typeof callback === 'function') {
                callback(null, results);
            } else {
                console.error('Callback is not a function');
            }
        }
    });
};

// Function to accept a booking
const acceptBooking = (id, callback) => {
    const query = 'UPDATE booking SET Status = ? WHERE BookingID = ?';
    connection.query(query, ['accepted', id], (err, results) => {
        if (err) {
            console.error('Error accepting booking:', err);
            if (typeof callback === 'function') {
                return callback(err, null);
            } else {
                console.error('Callback is not a function');
            }
        } else {
            if (typeof callback === 'function') {
                callback(null, results);
            } else {
                console.error('Callback is not a function');
            }
        }
    });
};

// Function to reject a booking
const rejectBooking = (id, callback) => {
    const query = 'UPDATE booking SET Status = ? WHERE BookingID = ?';
    connection.query(query, ['rejected', id], (err, results) => {
        if (err) {
            console.error('Error rejecting booking:', err);
            if (typeof callback === 'function') {
                return callback(err, null);
            } else {
                console.error('Callback is not a function');
            }
        } else {
            if (typeof callback === 'function') {
                callback(null, results);
            } else {
                console.error('Callback is not a function');
            }
        }
    });
};

module.exports = {
    getBookings,
    acceptBooking,
    rejectBooking
};
