import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Profile = () => {
    const [artist, setArtist] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { artistId, userId, jwt, logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchProfileData = async () => {
            const id = artistId || userId;

            if (!id) {
                console.error('No ID found in AuthContext');
                setError('No user ID found');
                setLoading(false);
                return;
            }

            console.log('Fetching from endpoint:', id);
            const endpoint = artistId ? `http://localhost:3000/api/artist/${id}` : `http://localhost:3000/api/user/${id}`;

            try {
                const response = await axios.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });

                if (artistId) {
                    setArtist(response.data); // Set artist data if artistId is present
                } else {
                    setUser(response.data); // Set user data if userId is present
                }
            } catch (err) {
                console.error('Error fetching profile data:', err);
                if (err.response) {
                    setError(`Error ${err.response.status}: ${err.response.data.msg || 'An error occurred while fetching profile data.'}`);
                } else if (err.request) {
                    setError('No response from server. Please try again later.');
                } else {
                    setError('Error: ' + err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [artistId, userId, jwt]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>{artistId ? 'artist' : 'user'}</h1>
            {artistId ? (
                artist ? (
                    <div>
                        <p><strong>Name:</strong> {artist.username}</p>
                        <p><strong>Email:</strong> {artist.email}</p>
                    </div>
                ) : (
                    <p>No artist profile data found</p>
                )
            ) : (
                user ? (
                    <div>
                        <p><strong>Name:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>
                ) : (
                    <p>No user profile data found</p>
                )
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;
