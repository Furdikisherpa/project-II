import React, { useEffect, useState } from 'react';
import axios from 'axios';


const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch bookings when the component mounts
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/bookedData');
                setBookings(response.data);
            } catch (err) {
                setError('Error fetching bookings.');
                console.error(err);
            }
        };

        fetchBookings();
    }, []);

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="bookings-table">
            <h2>Bookings</h2>
            <table>
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Artist Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <tr key={booking.BookingID}>
                                <td>{booking.BookingID}</td>
                                <td>{booking.ArtistName}</td>
                                <td>{booking.EventDate}</td>
                                <td>{booking.EventTime}</td>
                                <td>{booking.Status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No bookings available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BookingList;
