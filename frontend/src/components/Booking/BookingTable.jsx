import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import './BookingTable.css';  // Import the CSS

const BookingTable = () => {
    const { jwt } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBookings, setFilteredBookings] = useState([]);  // State for filtered bookings
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
                setFilteredBookings(response.data); // Initialize filtered bookings
            } catch (err) {
                console.error('Error fetching bookings:', err.response?.data || err.message);
                // setError('Error fetching bookings. Please try again.');
            }
        };

        fetchBookings();
    }, [jwt]);

    // Handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Perform linear search to filter bookings by artist name
        const filtered = bookings.filter(booking =>
            booking.Name.toLowerCase().includes(query)  // Match artist name
        );
        setFilteredBookings(filtered);
    };

    return (
        <div className="booking-table">
            <h2>Your Bookings</h2>
            <input
                type="text"
                placeholder="Search by Artist Name..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
            />
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
                    {filteredBookings.length > 0 ? (
                        filteredBookings.map((booking) => (
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