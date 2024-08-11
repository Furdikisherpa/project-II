import './Artist.css';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';

function Artist() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    // Fetch artist data from your API or another source
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/artist');
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artist data:', error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div>
      <div className="Home-Image">
        <img src="/src/assets/images/Music Artist.jpg" alt="Music Artist" />
      </div>
      <h1>Artist</h1>
      <div className="artist-cards-container">
        {artists.map((artist) => (
          <div key={artist.id} className="cards">
            <Card style={{ width: '18rem' }}>
              <Card.Img 
                variant="top" 
                src={artist.imageUrl || "/src/assets/images/default.jpg"} 
                style={{ height: '150px' }} 
                alt={artist.name}
              />
              <Card.Body>
                <Card.Title>{artist.username}</Card.Title>
                <Card.Text>
                  {artist.email || "No description available"}
                </Card.Text>
                <Button variant="primary">Profile</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Artist;
