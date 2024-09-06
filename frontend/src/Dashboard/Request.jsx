import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const { jwt } = useContext(AuthContext); // Get JWT from AuthContext

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/bookings', {
          headers: { Authorization: `Bearer ${jwt}` }
        });
        setBookings(response.data);
      } catch (err) {
        if (err.response) {
          setError(`Error: ${err.response.status} ${err.response.statusText}`);
        } else if (err.request) {
          setError('Error: No response from server');
        } else {
          setError('Error: Unable to fetch bookings');
        }
        console.error(err);
      }
    };

    fetchBookings();
  }, [jwt]);

  const handleAccept = async (bookingID) => {
    try {
      await axios.patch(`http://localhost:3000/api/bookings/${bookingID}/accept`, {}, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.BookingID === bookingID ? { ...booking, Status: 'accepted' } : booking
        )
      );
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        setError('Error: No response from server');
      } else {
        setError('Error: Unable to accept booking');
      }
      console.error(err);
    }
  };

  const handleReject = async (bookingID) => {
    try {
      await axios.patch(`http://localhost:3000/api/bookings/${bookingID}/reject`, {}, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.BookingID === bookingID ? { ...booking, Status: 'rejected' } : booking
        )
      );
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        setError('Error: No response from server');
      } else {
        setError('Error: Unable to reject booking');
      }
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Booking Management</h1>
      {error && <div className="error-message">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Artist ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map(booking => (
              <tr key={booking.BookingID}>
                <td>{booking.BookingID}</td>
                <td>{booking.UserID}</td>
                <td>{booking.ArtistID}</td>
                <td>{booking.Status}</td>
                <td>
                  {booking.Status === 'pending' ? (
                    <>
                      <button onClick={() => handleAccept(booking.BookingID)}>Accept</button>
                      <button onClick={() => handleReject(booking.BookingID)}>Reject</button>
                    </>
                  ) : (
                    <span>{booking.Status.charAt(0).toUpperCase() + booking.Status.slice(1)}</span>
                  )}
                </td>
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

export default BookingManagement;
