import { useState, useContext } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { AuthContext } from '../AuthContext';
import '../styles.css/UpdateForm.css';

function Update({ onClose }) {
    const { jwt, artistId } = useContext(AuthContext);
    const [artistData, setArtistData] = useState({
        location: '',
        socialLinks: '',
        website: '',
        genre: '',
        bio: '',
        pricingInfo: '',
        contactInfo: ''
    });
    const [photo, setPhoto] = useState(null); // State for photo file

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArtistData({ ...artistData, [name]: value });
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]); // Handle photo file selection
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('location', artistData.location);
        formData.append('socialLinks', artistData.socialLinks);
        formData.append('website', artistData.website);
        formData.append('genre', artistData.genre);
        formData.append('bio', artistData.bio);
        formData.append('pricingInfo', artistData.pricingInfo);
        formData.append('contactInfo', artistData.contactInfo);

        // Append the photo file to the mediaGallery key
        if (photo) {
            formData.append('mediaGallery', photo);  // Use mediaGallery to match the database
        }

        try {
            await axios.put(`http://localhost:3000/api/artists/${artistId}`, formData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'multipart/form-data'
                }
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
            <Form.Group controlId="formPricingInfo">
                <Form.Label>Pricing Info</Form.Label>
                <Form.Control type="text" name="pricingInfo" value={artistData.pricingInfo} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formContactInfo">
                <Form.Label>Contact Info</Form.Label>
                <Form.Control type="text" name="contactInfo" value={artistData.contactInfo} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formPhoto">
                <Form.Label>Upload Photo</Form.Label>
                <Form.Control type="file" name="photo" onChange={handlePhotoChange} />
            </Form.Group>
            <Button variant="primary" type="submit">Save Changes</Button>
        </Form>
    );
}

Update.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default Update;
