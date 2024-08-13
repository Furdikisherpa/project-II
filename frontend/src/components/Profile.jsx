import './Profile.css'; // Import CSS for styling the Profile component
import { useState, useEffect, useContext, useCallback } from 'react'; // Import necessary hooks
import axios from 'axios'; // Import axios for making HTTP requests
import { AuthContext } from '../AuthContext'; // Import AuthContext to access authentication data
import { useParams, useNavigate } from 'react-router-dom'; // Import hooks for routing

const Profile = () => {
    // Get artistId from the route parameters (if available)
    const { artistId: routeArtistId } = useParams();
    const navigate = useNavigate(); // Initialize navigate hook for programmatic navigation
    // State variables to hold artist/user data, loading state, error messages, and video information
    const [artist, setArtist] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [videos, setVideos] = useState([]);

    // Access authentication data from AuthContext
    const { artistId: contextArtistId, userId, jwt, isLoading, isLoggedIn } = useContext(AuthContext);

    // Effect to redirect users to the login page if they are not logged in
    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            navigate('/login'); // Redirect to login page
        }
    }, [isLoading, isLoggedIn, navigate]);

    // Function to fetch profile data based on artistId or userId
    const fetchProfileData = useCallback(async () => {
        // Determine the ID to use for fetching profile data
        const id = routeArtistId || contextArtistId || userId;

        if (!id) {
            console.error('No ID found'); // Log error if no ID is found
            setError('No user ID found'); // Set error state
            setLoading(false); // Stop loading
            return; // Exit function
        }

        // Define the endpoint to fetch artist or user profile data
        const endpoint = routeArtistId || contextArtistId ? 
            `http://localhost:3000/api/artist/${id}` : 
            `http://localhost:3000/api/user/${id}`;

        try {
            // Make GET request to fetch profile data
            const response = await axios.get(endpoint, {
                headers: { Authorization: `Bearer ${jwt}` } // Include JWT in the request headers
            });

            // Set artist or user data based on the response
            routeArtistId || contextArtistId ? setArtist(response.data) : setUser(response.data);
        } catch (err) {
            // Handle errors while fetching data
            console.error('Error fetching profile data:', err);
            if (err.response) {
                setError(`Error ${err.response.status}: ${err.response.data.msg || 'An error occurred while fetching profile data.'}`);
            } else if (err.request) {
                setError('No response from server. Please try again later.');
            } else {
                setError('Error: ' + err.message);
            }
        } finally {
            setLoading(false); // Stop loading regardless of success or error
        }
    }, [routeArtistId, contextArtistId, userId, jwt]);

    // Effect to fetch profile data when the component mounts or when user state changes
    useEffect(() => {
        if (isLoggedIn && !isLoading) {
            fetchProfileData(); // Fetch profile data if logged in
        }
    }, [fetchProfileData, isLoggedIn, isLoading]);

    // Function to fetch videos associated with the artist or user
    const fetchVideos = useCallback(async () => {
        try {
            // Make GET request to fetch videos
            const response = await axios.get('http://localhost:3000/api/getvideo', {
                params: { artistId: routeArtistId || contextArtistId || null, userId: userId || null }
            });
            setVideos(response.data); // Set videos data
        } catch (error) {
            console.error('Error fetching videos:', error); // Handle errors while fetching videos
        }
    }, [routeArtistId, contextArtistId, userId]);

    // Effect to fetch videos when the component mounts or when user state changes
    useEffect(() => {
        if (isLoggedIn && !isLoading) {
            fetchVideos(); // Fetch videos if logged in
        }
    }, [fetchVideos, isLoggedIn, isLoading]);

    // Show loading message if data is still being fetched
    if (loading) return <div>Loading...</div>;
    // Show error message if there's an error
    if (error) return <div>{error}</div>;

    // Function to handle video upload form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            // Make POST request to upload the video
            const response = await axios.post('http://localhost:3000/api/uploadvideo', { 
                videoUrl, // Video URL to upload
                artistId: routeArtistId || contextArtistId || null, // Artist ID if available
                userId: userId || null // User ID if available
            });
            console.log(response.data); // Log response data
            alert('Video uploaded successfully!'); // Show success message
            fetchVideos(); // Fetch videos again after upload
        } catch (error) {
            console.error('There was an error uploading the video!', error); // Handle upload errors
        }
    };

    return (
        <div>
            <div className="Heading_Image">
                {/* Image representing the artist */}
                <img src="/src/assets/images/Music Artist.jpg" alt="Music Artist" />
            </div>
            <div className='Profile'>
                <h1>{routeArtistId || contextArtistId ? 'Artist' : 'User'} Profile</h1>
                {routeArtistId || contextArtistId ? (
                    artist ? (
                        <div>
                            {/* Display artist profile information */}
                            <p><strong>Name:</strong> {artist.username}</p>
                            <p><strong>Email:</strong> {artist.email}</p>
                        </div>
                    ) : (
                        <p>No artist profile data found</p> // Message if no artist data is found
                    )
                ) : (
                    user ? (
                        <div>
                            {/* Display user profile information */}
                            <p><strong>Name:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                        </div>
                    ) : (
                        <p>No user profile data found</p> // Message if no user data is found
                    )
                )}
                <button type='submit'>Update Profile</button> {/* Button for updating profile */}
                <hr /> <br />
                <div className='videoUpload'>
                    {/* Form for uploading videos */}
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            value={videoUrl} 
                            onChange={(e) => setVideoUrl(e.target.value)} // Update videoUrl state on input change
                            placeholder="Enter YouTube Video URL" 
                            required 
                        />
                        <button type="submit">Upload</button> {/* Button for submitting video upload */}
                    </form>
                </div>
                <p>Settings</p>
            </div>

            <div className="video-gallery">
                {/* Map through videos and display them */}
                {videos.map((video, index) => {
                    const videoId = new URL(video.videoUrl).searchParams.get("v"); // Extract video ID from URL

                    return (
                        <div key={index} className="video-item">
                            {/* Link to the video on YouTube */}
                            <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
                                {/* Embed the YouTube video */}
                                <iframe 
                                    width="300" 
                                    height="200" 
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    title={`YouTube video player ${index}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Profile; // Export the Profile component for use in other parts of the application
