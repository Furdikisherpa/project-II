import './Artist.css';
import { useEffect, useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookingForm from '../Booking/BookingForm'; // Import BookingForm

function Artist() {
    const [artists, setArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null); // State to hold the currently selected artist for booking
    const [show, setShow] = useState(false); // State to control modal visibility

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

    const handleBookingClick = (artist) => {
        setSelectedArtist(artist); // Set the selected artist when booking is clicked
        setShow(true); // Show the modal
    };

    const handleClose = () => setShow(false); // Function to close the modal

    return (
        <div>
            <div className="Home-Image">
                <img src="/src/assets/images/Music Artist.jpg" alt="Music Artist" />
            </div>
            <h1>Artist</h1>
            <div className="artist-cards-container">
                {Array.isArray(artists) && artists.map((artist) => (
                    <div key={artist.id} className="cards">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img 
                                variant="top" 
                                src={artist.imageUrl || "/src/assets/images/default.jpg"}
                                style={{ height: '150px' }}
                                alt={artist.username}
                            />
                            <Card.Body>
                                <Card.Title>{artist.username}</Card.Title>
                                <Card.Text>
                                    {artist.email || "No description available"}
                                </Card.Text>
                                <Link to={`/artist/${artist.id}`}>
                                    <Button variant="primary">Profile</Button>
                                </Link>
                                <Button variant="primary" onClick={() => handleBookingClick(artist)}>Booking</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Modal for the BookingForm */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Book {selectedArtist?.username}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedArtist && (
                        <BookingForm artistId={selectedArtist.id} /> // Pass artistId to BookingForm
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Artist;
