import './Artist.css'; // Importing CSS styles for the Artist component
import { useEffect, useState } from 'react'; // Importing necessary hooks from React
import { Button, Card } from 'react-bootstrap'; // Importing Button and Card components from React Bootstrap
import axios from 'axios'; // Importing Axios for making HTTP requests

function Artist() {
    const [artists, setArtists] = useState([]); // State to hold the list of artists

    useEffect(() => {
        // Function to fetch artist data from the API
        const fetchArtists = async () => {
            try {
                // Sending GET request to the API endpoint to fetch artists
                const response = await axios.get('http://localhost:3000/api/artists');
                console.log('API Response:', response.data); // Log the response data
                // Check if the response is an array
                if (Array.isArray(response.data)) {
                    setArtists(response.data); // Updating state with the fetched artist data
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                // Handling any errors that occur during the fetch
                console.error('Error fetching artist data:', error); // Log error to console
            }
        };

        fetchArtists(); // Call the function to fetch artists when the component mounts
    }, []); // Empty dependency array ensures this effect runs once on mount

    return (
        <div>
            {/* Container for the header image */}
            <div className="Home-Image">
                <img src="/src/assets/images/Music Artist.jpg" alt="Music Artist" /> {/* Header image */}
            </div>
            <h1>Artist</h1> {/* Title for the artist section */}
            <div className="artist-cards-container">
                {/* Mapping through the list of artists to create a card for each one */}
                {Array.isArray(artists) && artists.map((artist) => (
                    <div key={artist.id} className="cards"> {/* Unique key for each artist card */}
                        <Card style={{ width: '18rem' }}> {/* Bootstrap card for displaying artist info */}
                            <Card.Img 
                                variant="top" 
                                src={artist.imageUrl || "/src/assets/images/default.jpg"} // Use artist image or default image
                                style={{ height: '150px' }} // Setting fixed height for the image
                                alt={artist.username} // Alt text for the image
                            />
                            <Card.Body>
                                <Card.Title>{artist.username}</Card.Title> {/* Artist's username */}
                                <Card.Text>
                                    {artist.email || "No description available"} {/* Artist's email or default message */}
                                </Card.Text>
                                <Button variant="primary">Profile</Button> {/* Button for viewing artist profile */}
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Artist; // Exporting the Artist component for use in other parts of the application
