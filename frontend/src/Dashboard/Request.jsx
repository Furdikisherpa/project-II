import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

const ArtistBookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Manage loading state
  const { jwt, userRole, isLoggedIn, isLoading, artistId } = useContext(AuthContext); // Use JWT, userRole, and artistId from AuthContext
  const navigate = useNavigate(); // Initialize navigate hook for programmatic navigation

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      console.log('User is not logged in, redirecting to login page...');
      navigate('/login');
    }
  }, [isLoading, isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn && !isLoading) {
      if (userRole !== 'artist') {
        console.log('User is not an artist, redirecting to home page...');
        navigate('/'); // Redirect to home or another appropriate page
        return;
      }

      const fetchBookings = async () => {
        if (!jwt) {
            console.error("JWT is not available");
            setError('Authorization token missing. Please log in.');
            setLoading(false);
            return;
        }
    
        try {
            console.log("Fetching bookings with JWT:", jwt);
            const response = await axios.get(`http://localhost:3000/api/artist/bookings/${artistId}`, {
                headers: { Authorization: `Bearer ${jwt}` }
            });
            setBookings(response.data);
        } catch (err) {
            let errorMessage = 'Unable to fetch bookings';
            if (err.response) {
                console.error(`Error: ${err.response.status} - ${err.response.statusText}`);
                errorMessage = `Error: ${err.response.status} - ${err.response.statusText}`;
            } else if (err.request) {
                console.error('Error: No response from server');
                errorMessage = 'Error: No response from server';
            } else {
                console.error('Error:', err.message);
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    
      fetchBookings();
    }
  }, [jwt, userRole, isLoggedIn, isLoading, navigate, artistId]); // Add artistId to dependency array

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
        errorMessage = `Error: ${err.response.status} - ${err.response.statusText}`;
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
        errorMessage = `Error: ${err.response.status} - ${err.response.statusText}`;
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
      {loading && <p>Loading...</p>}
      {error && <div className="error-message">{error}</div>}
      {userRole === 'artist' ? (
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
      ) : (
        <p>You do not have permission to view this page.</p>
      )}
    </div>
  );
};

export default ArtistBookingManagement;
