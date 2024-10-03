import './Artist.css';
import { useEffect, useState, useCallback } from 'react';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookingForm from '../Booking/BookingForm';

function Artist() {
    const [artists, setArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [show, setShow] = useState(false);
    const [genre, setGenre] = useState('');
    const [location, setLocation] = useState('');

    // Memoized fetchArtists to avoid re-creating the function on every render
    const fetchArtists = useCallback(async () => {
        try {
            const queryParams = [];
            if (genre) queryParams.push(`genre=${genre}`);
            if (location) queryParams.push(`location=${location}`);

            const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
            const response = await axios.get(`http://localhost:3000/api/artists${queryString}`);
            console.log('API Response:', response.data);
            if (Array.isArray(response.data)) {
                setArtists(response.data);
            } else {
                console.error('Unexpected response format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching artist data:', error);
        }
    }, [genre, location]); // Include genre and location as dependencies

    useEffect(() => {
        fetchArtists(); // Call fetchArtists when component mounts or when genre/location changes
    }, [fetchArtists]); // Include fetchArtists in the dependency array

    const handleBookingClick = (artist) => {
        setSelectedArtist(artist);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    return (
        <div className="artist-page-container">
            {/* Filter Options */}
            <div className="filters">
                <Form.Group controlId="formGenre">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control as="select" value={genre} onChange={(e) => setGenre(e.target.value)}>
                        <option value="">All</option>
                        <option value="Pop">Pop</option>
                        <option value="Rock">Rock</option>
                        <option value="Jazz">Jazz</option>
                    </Form.Control>
                </Form.Group>
    
                <Form.Group controlId="formLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control as="select" value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option value="">All</option>
                        <option value="NYC">New York</option>
                        <option value="LA">Los Angeles</option>
                        <option value="Chicago">Chicago</option>
                        <option value="budanilkantha">Budanilkantha</option>
                    </Form.Control>
                </Form.Group>
            </div>
    
            {/* Artist Cards */}
            <div className="artist-cards-container">
                {Array.isArray(artists) && artists.map((artist) => (
                    <div key={artist.id} className="cards">
                        <Card>
                            <Card.Img 
                                variant="top" 
                                src={artist.imageUrl || "/src/assets/images/default.jpg"}
                                alt={artist.username}
                            />
                            <Card.Body>
                                <Card.Title>{artist.username}</Card.Title>
                                <Link to={`/artist/${artist.id}`}>
                                    <Button variant="primary">Profile</Button>
                                </Link>
                                <Button variant="primary" onClick={() => handleBookingClick(artist)}>Booking</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
    
            {/* Modal for Booking */}
            <Modal show={show} onHide={handleClose} backdrop={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Book {selectedArtist?.username}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedArtist && (
                        <BookingForm artistId={selectedArtist.id} />
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