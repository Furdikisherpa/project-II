import { useState, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css';

const BookingForm = ({ artistId }) => {
    const { userId, jwt } = useContext(AuthContext);
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate if totalPrice is a valid number
        if (isNaN(parseFloat(totalPrice)) || parseFloat(totalPrice) <= 0) {
            setError('Total Price must be a valid number greater than zero.');
            return;
        }
    
        const bookingData = {
            EventDate: eventDate,
            EventTime: eventTime,
            UserID: userId,
            ArtistID: artistId,
            Status: 'Pending',
            TotalPrice: parseFloat(totalPrice)
        };
    
        try {
            await axios.post('http://localhost:3000/api/bookings', bookingData, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
    
            setSuccess('Booking created successfully!');
            setError(null);
            setTimeout(() => {
                navigate('/profile');
            }, 2000);
    
        } catch (err) {
            setError('Error creating booking. Please try again.');
            setSuccess(null);
            console.error(err);
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
                <div className="form-group">
                    <label htmlFor="totalPrice">Total Price</label>
                    <input
                        type="number"
                        id="totalPrice"
                        value={totalPrice}
                        onChange={(e) => setTotalPrice(e.target.value)}
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
    artistId: PropTypes.number.isRequired, // Ensure artistId is a number and required
};

export default BookingForm;
