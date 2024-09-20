import './'
import { useState, useContext } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { AuthContext } from '../AuthContext';




function Update({ onClose }) {
    const { jwt, artistId } = useContext(AuthContext);
    const [artistData, setArtistData] = useState({
        location: '',
        socialLinks: '',
        website: '',
        genre: '',
        bio: '',
        mediaGallery: '',
        pricingInfo: '',
        contactInfo: ''
    });

    // useEffect(() => {
    //     const fetchArtistData = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:3000/api/artists/${artistId}`, {
    //                 headers: { Authorization: `Bearer ${jwt}` }
    //             });
    //             setArtistData(response.data);
    //         } catch (error) {
    //             console.error('Error fetching artist data:', error);
    //         }
    //     };
    //     if (jwt && artistId) fetchArtistData();
    // }, [jwt, artistId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArtistData({ ...artistData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/artists/${artistId}`, artistData, {
                headers: { Authorization: `Bearer ${jwt}` }
            });
            alert('Artist data updated successfully');
            onClose();
        } catch (error) {
            console.error('Error updating artist data:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" name="location" value={artistData.location} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formSocialLinks">
                <Form.Label>Social Links</Form.Label>
                <Form.Control type="text" name="socialLinks" value={artistData.socialLinks} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formWebsites">
                <Form.Label>Website</Form.Label>
                <Form.Control type="text" name="website" value={artistData.website} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formGenre">
                <Form.Label>Genre</Form.Label>
                <Form.Control type="text" name="genre" value={artistData.genre} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formBio">
                <Form.Label>Bio</Form.Label>
                <Form.Control as="textarea" rows={3} name="bio" value={artistData.bio} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formMediaGallery">
                <Form.Label>Media Gallery</Form.Label>
                <Form.Control type="text" name="mediaGallery" value={artistData.mediaGallery} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formPricingInfo">
                <Form.Label>Pricing Info</Form.Label>
                <Form.Control type="text" name="pricingInfo" value={artistData.pricingInfo} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formContactInfo">
                <Form.Label>Contact Info</Form.Label>
                <Form.Control type="text" name="contactInfo" value={artistData.contactInfo} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">Save Changes</Button>
        </Form>
    );
}

Update.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default Update;
