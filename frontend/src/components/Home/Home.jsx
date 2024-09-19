import { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/artists');
        console.log('API Response:', response.data);
        if (Array.isArray(response.data)) {
          setArtists(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching artist data:', error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="home">
      {/* Home Image Section */}
      <div className="Home-Image">
        <img src="/src/assets/images/drum.jpg" alt="Home" />
      </div>

      {/* Home Text Section */}
      <div>
        <h1>Home</h1>
        <p>Home is where the heart is. Home is where you feel safe and secure.</p>
      </div>

      {/* Scrollable Artist Profiles Section */}
      <div className="artist-profile-container">
        <h2>Featured Artists</h2>
        <div className="artist-profile-scroll">
          {artists.map((artist) => (
            <div className="artist-card" key={artist.id}>
              <img
                src={artist.imageUrl || '/src/assets/images/default-artist.jpg'}
                alt={artist.name}
                className="artist-image"
              />
              <div className="artist-details">
                <h3>{artist.username}</h3>
                <p>{artist.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
