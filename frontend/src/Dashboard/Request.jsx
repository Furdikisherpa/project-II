import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext'; // Import AuthContext

const ArtistBookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const { jwt } = useContext(AuthContext); // Use JWT from AuthContext

  // Fetch artist bookings when the component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      if (!jwt) {
        console.error("JWT is not available");
        return;
      }

      try {
        console.log("Fetching bookings with JWT:", jwt);

        const response = await axios.get('http://localhost:3000/api/artist/bookings', {
          headers: { Authorization: `Bearer ${jwt}` }
        });

        console.log("Response data:", response.data);
        setBookings(response.data);
      } catch (err) {
        let errorMessage = 'Unable to fetch bookings';
        if (err.response) {
          console.error(`Error: ${err.response.status} - ${err.response.statusText}`);
          errorMessage = `Error: ${err.response.status} ${err.response.statusText}`;
        } else if (err.request) {
          console.error('Error: No response from server');
          errorMessage = 'Error: No response from server';
        } else {
          console.error('Error:', err.message);
        }
        setError(errorMessage);
      }
    };

    fetchBookings();
  }, [jwt]); // Dependency array includes jwt

  // Accept booking by ID
  const handleAccept = async (bookingID) => {
    try {
      await axios.put(`http://localhost:3000/api/artist/bookings/${bookingID}/accept`, {}, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.BookingID === bookingID ? { ...booking, Status: 'accepted' } : booking
        )
      );
    } catch (err) {
      let errorMessage = 'Unable to accept booking';
      if (err.response) {
        errorMessage = `Error: ${err.response.status} ${err.response.statusText}`;
      } else if (err.request) {
        errorMessage = 'Error: No response from server';
      }
      setError(errorMessage);
      console.error(err);
    }
  };

  // Reject booking by ID
  const handleReject = async (bookingID) => {
    try {
      await axios.put(`http://localhost:3000/api/artist/bookings/${bookingID}/reject`, {}, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.BookingID === bookingID ? { ...booking, Status: 'rejected' } : booking
        )
      );
    } catch (err) {
      let errorMessage = 'Unable to reject booking';
      if (err.response) {
        errorMessage = `Error: ${err.response.status} ${err.response.statusText}`;
      } else if (err.request) {
        errorMessage = 'Error: No response from server';
      }
      setError(errorMessage);
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
            <th>Booking ID</th>
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
                <td>{booking.Status.charAt(0).toUpperCase() + booking.Status.slice(1)}</td>
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
              <td colSpan="5">No bookings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ArtistBookingManagement;
