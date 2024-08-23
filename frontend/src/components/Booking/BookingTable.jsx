import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import './BookingTable.css';  // Import the CSS

const BookingTable = () => {
    const { jwt } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [error] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            console.log('JWT Token:', jwt);  // Debugging JWT
            try {
                const response = await axios.get('http://localhost:3000/api/bookeddata', {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                console.log('Bookings data:', response.data); // Debugging response data
                setBookings(response.data);
            } catch (err) {
                console.error('Error fetching bookings:', err.response?.data || err.message);
                // setError('Error fetching bookings. Please try again.');
            }
        };

        fetchBookings();
    }, [jwt]);

    return (
        <div className="booking-table">
            <h2>Your Bookings</h2>
            {error && <p className="error">{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Artist Name</th>
                        <th>Event Date</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <tr key={booking.BookingID}>
                                <td data-label="Booking ID">{booking.BookingID}</td>
                                <td data-label="Artist Name">{booking.Name}</td>
                                <td data-label="Date">{booking.EventDate}</td>
                                <td data-label="Time">{booking.EventTime}</td>
                                <td data-label="Status">{booking.Status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No bookings found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BookingTable;
