import './Profile.css';
import { useState, useEffect, useContext } from 'react'; // Importing necessary hooks from React
import axios from 'axios'; // Importing Axios for making HTTP requests
import { AuthContext } from '../AuthContext'; // Importing the AuthContext for accessing authentication state
// import ProfileUpdateForm from './Profile_Update/ProfileUpdateForm'; // Correct import

const Profile = () => {
    // State variables to hold artist and user data, loading state, and any errors
    const [artist, setArtist] = useState(null); // State for storing artist profile data
    const [user, setUser] = useState(null); // State for storing user profile data
    const [loading, setLoading] = useState(true); // State for tracking loading status
    const [error, setError] = useState(null); // State for storing error messages

    // Accessing authentication context to get user IDs and JWT
    const { artistId, userId, jwt, isLoading, isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        // Function to fetch profile data based on the logged-in user's role
        const fetchProfileData = async () => {
            const id = artistId || userId; // Determine which ID to use (artist or user)

            // If no ID is found, set an error message and exit the function
            if (!id) {
                console.error('No ID found in AuthContext'); // Log error to console
                setError('No user ID found'); // Set error state
                setLoading(false); // Stop loading
                return; // Exit the function
            }

            console.log('Fetching from endpoint:', id); // Log the endpoint being fetched
            // Determine the endpoint based on whether the user is an artist or a regular user
            const endpoint = artistId ? `http://localhost:3000/api/artist/${id}` : `http://localhost:3000/api/user/${id}`;

            try {
                // Make a GET request to the appropriate endpoint with the JWT in the header
                const response = await axios.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${jwt}` // Include the JWT for authentication
                    }
                });

                // Set the artist or user state based on the response data
                if (artistId) {
                    setArtist(response.data); // Set artist data if artistId is present
                } else {
                    setUser(response.data); // Set user data if userId is present
                }
            } catch (err) {
                // Handle errors that may occur during the fetch
                console.error('Error fetching profile data:', err); // Log the error to console
                // Set error state based on the type of error received
                if (err.response) {
                    setError(`Error ${err.response.status}: ${err.response.data.msg || 'An error occurred while fetching profile data.'}`);
                } else if (err.request) {
                    setError('No response from server. Please try again later.');
                } else {
                    setError('Error: ' + err.message);
                }
            } finally {
                // Ensure loading is set to false regardless of success or failure
                setLoading(false);
            }
        };

        // Only fetch profile data if the user is logged in and context is loaded
        if (isLoggedIn && !isLoading) {
            fetchProfileData(); // Call the fetch function
        }
    }, [artistId, userId, jwt, isLoggedIn, isLoading]); // Dependencies for the effect

    // Conditional rendering based on loading and error states
    if (loading) return <div>Loading...</div>; // Show loading message while data is being fetched
    if (error) return <div>{error}</div>; // Show error message if there was an error

    // Render the profile information based on whether the user is an artist or a regular user
    return (
        <div>
            <div className="Heading_Image">
                <img src="/src/assets/images/Music Artist.jpg" alt="Music Artist" /> {/* Header image */}
            </div>
        <div className='Profile'>
            <h1>{artistId ? 'Artist' : 'User'} Profile</h1> {/* Display appropriate header */}
            {artistId ? (
                artist ? ( // Check if artist data is available
                    <div>
                        <p><strong>Name:</strong> {artist.username}</p> {/* Display artist username */}
                        <p><strong>Email:</strong> {artist.email}</p> {/* Display artist email */}
                    </div>
                ) : (
                    <p>No artist profile data found</p> // Message if no artist data is available
                )
            ) : (
                user ? ( // If artistId is not present, check for user data
                    <div>
                        <p><strong>Name:</strong> {user.username}</p> {/* Display user username */}
                        <p><strong>Email:</strong> {user.email}</p> {/* Display user email */}
                    </div>
                ) : (
                    <p>No user profile data found</p> // Message if no user data is available
                )
            )}
            <button type='submit'>Update Profile</button>
            <hr /> <br />
            <p>Settting</p>
        </div>
        <div className='grid'>
        <div className="responsive">
  <div className="gallery">
    <a target="_blank" href="">
      <img src="/src/assets/images/Music Artist.jpg" alt="Cinque Terre" width="600" height="400" />
    </a>
    <div className="desc">description</div>
  </div>
</div>


<div className="responsive">
  <div className="gallery">
    <a target="_blank" href="img_forest.jpg">
      <img src="/src/assets/images/Music Artist.jpg" alt="Forest" width="600" height="400" />
    </a>
    <div className="desc">description </div>
  </div>
</div>

<div className="responsive">
  <div className="gallery">
    <a target="_blank" href="img_lights.jpg">
      <img src="/src/assets/images/Music Artist.jpg" alt="Northern Lights" width="600" height="400" />
    </a>
    <div className="desc">escription</div>
  </div>
</div>

<div className="responsive">
  <div className="gallery">
    <a target="_blank" href="img_mountains.jpg">
      <img src="/src/assets/images/Music Artist.jpg" alt="Mountains" width="600" height="400" />
    </a>
    <div className="desc">description </div>
  </div>
</div>

<div className="responsive">
  <div className="gallery">
    <a target="_blank" href="img_mountains.jpg">
      <img src="/src/assets/images/Music Artist.jpg" alt="Mountains" width="600" height="400" />
    </a>
    <div className="desc">Description</div>
  </div>
</div>
<div className="clearfix"></div>

        </div>
        </div>
        
    );
};

export default Profile; // Export the Profile component for use in other parts of the application
