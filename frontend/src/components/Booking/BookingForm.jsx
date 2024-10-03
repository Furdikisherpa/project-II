import { useState, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css';

const BookingForm = ({ artistId }) => {
    const { userId, jwt } = useContext(AuthContext);
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error and success states on each submission
        setError(null);
        setSuccess(null);

        // Validate if totalPrice is a valid number
   

        // Validate if eventDate and eventTime are not empty
        if (!eventDate || !eventTime) {
            setError('Event Date and Event Time are required.');
            return;
        }

        // Format the date and time correctly before sending
        const formattedEventDate = new Date(eventDate).toISOString().split('T')[0]; // YYYY-MM-DD
        const formattedEventTime = eventTime; // Ensure it's in HH:mm format

        const bookingData = {
            EventDate: formattedEventDate,
            EventTime: formattedEventTime,
            UserID: userId,
            ArtistID: artistId,
            Status: 'pending'
        };

        try {
            const response = await axios.post('http://localhost:3000/api/bookings', bookingData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) { // Typically, a successful creation returns 201
                setSuccess('Booking created successfully!');
                setError(null);
                setTimeout(() => {
                    navigate('/profile');
                }, 2000);
            } else {
                setError('Unexpected response from server.');
            }

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Error creating booking. Please try again.';
            console.error('Error creating booking:', err.response?.data || err.message);
            setError(errorMessage);
            setSuccess(null);
        }
    };

    return (
        <div className="booking-form">
            <h2>Book Artist</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="eventDate">Event Date</label>
                    <input
                        type="date"
                        id="eventDate"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventTime">Event Time</label>
                    <input
                        type="time"
                        id="eventTime"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        required
                    />
                </div>
              
                <button type="submit" className="btn">Book Now</button>
            </form>
        </div>
    );
};

// PropTypes validation for artistId
BookingForm.propTypes = {
    artistId: PropTypes.number.isRequired,
};

export default BookingForm;
