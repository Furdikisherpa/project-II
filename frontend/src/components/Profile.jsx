import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/artist');
        setArtists(response.data);
      } catch (err) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Artist Information</h1>
      {artists.map((item) => (
        <div key={item.id}>
          <p><strong>:</strong> {item.name}</p>
          <p><strong>Email:</strong> {item.email}</p>
          <hr /> {/* Optional, for separating different artist details */}
        </div>
      ))}
    </div>
  );
};

export default Profile;
