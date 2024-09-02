// src/components/BookingManagement.jsx
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const Request = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const { jwt } = useContext(AuthContext); // Get JWT from AuthContext

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/booking', {
          headers: { Authorization: `Bearer ${jwt}` }
        });
        setBookings(response.data);
      } catch (err) {
        if (err.response) {
          // Request made and server responded with a status code
          setError(`Error: ${err.response.status} ${err.response.statusText}`);
        } else if (err.request) {
          // Request made but no response received
          setError('Error: No response from server');
        } else {
          // Something happened in setting up the request
          setError('Error: Unable to fetch bookings');
        }
        console.error(err);
      }
    };

    fetchBookings();
  }, [jwt]);

  const handleAccept = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/booking/${id}/accept`, {}, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      setBookings(bookings.map(booking =>
        booking.id === id ? { ...booking, status: 'accepted' } : booking
      ));
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

  const handleReject = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/booking/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      setBookings(bookings.map(booking =>
        booking.id === id ? { ...booking, status: 'rejected' } : booking
      ));
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

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Booking Management</h1>
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
              <tr key={booking.id}>
                <td>{booking.BookingID}</td>
                <td>{booking.UserID}</td>
                <td>{booking.ArtistID}</td>
                <td>{booking.Status}</td>
                <td>
                  {booking.Status === 'pending' && (
                    <>
                      <button onClick={() => handleAccept(booking.id)}>Accept</button>
                      <button onClick={() => handleReject(booking.id)}>Reject</button>
                    </>
                  )}
                  {booking.Status !== 'pending' && (
                    <span>Action Completed</span>
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

export default Request;
