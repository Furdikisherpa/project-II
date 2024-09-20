import './Profile.css'; // Import CSS for styling the Profile component
import { useState, useEffect, useContext, useCallback } from 'react'; // Import React hooks for state management and side effects
import axios from 'axios'; // Import axios for making HTTP requests
import { AuthContext } from '../AuthContext'; // Import AuthContext to access authentication data and state
import { useParams, useNavigate } from 'react-router-dom'; // Import hooks for handling routing

const Profile = () => {
    const { artistId: routeArtistId } = useParams();
    const navigate = useNavigate(); // Initialize navigate hook for programmatic navigation

    // State variables to manage profile data, loading state, error messages, and video information
    const [artist, setArtist] = useState(null); // State for artist data
    const [user, setUser] = useState(null); // State for user data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error messages
    const [videos, setVideos] = useState([]); // State for storing fetched videos
    // const [imageUrl, setImageUrl] = useState(''); // State for storing the image URL

    // Extract authentication data from AuthContext
    const { artistId: contextArtistId, userId, jwt, isLoading, isLoggedIn } = useContext(AuthContext);

    // Effect to redirect users to login page if they are not logged in
    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            console.log('User is not logged in, redirecting to login page...');
            navigate('/login');
        }
    }, [isLoading, isLoggedIn, navigate]);

    // Function to fetch profile data based on artistId or userId
    const fetchProfileData = useCallback(async () => {
        const id = routeArtistId || contextArtistId || userId;

        if (!id) {
            console.error('No ID found'); // Log error if no ID is found
            setError('No ID found'); // Set error state
            setLoading(false); // Stop loading
            return;
        }

        const endpoint = routeArtistId || contextArtistId
            ? `http://localhost:3000/api/artist/${id}`
            : `http://localhost:3000/api/user/${id}`;

        console.log(`Fetching profile data from ${endpoint}`); // Debug endpoint URL

        try {
            const response = await axios.get(endpoint, {
                headers: { Authorization: `Bearer ${jwt}` } // Include JWT in request headers
            });

            console.log('Profile data fetched successfully:', response.data); // Debug response data
            if (routeArtistId || contextArtistId) {
                setArtist(response.data);
                // setImageUrl(response.data.MediaGallery); // Set the image URL from the response
            } else {
                setUser(response.data);
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
            setLoading(false); // Stop loading regardless of success or failure
        }
    }, [routeArtistId, contextArtistId, userId, jwt]);

    // Effect to fetch profile data when component mounts or user state changes
    useEffect(() => {
        if (isLoggedIn && !isLoading) {
            console.log('Fetching profile data as user is logged in and loading is complete...');
            fetchProfileData();
        }
    }, [fetchProfileData, isLoggedIn, isLoading]);

    // Function to fetch videos associated with the artist or user
    const fetchVideos = useCallback(async () => {
        const params = { artistId: routeArtistId || contextArtistId || null, userId: userId || null };
        console.log(`Fetching videos with params:`, params); // Debug fetch parameters

        try {
            const response = await axios.get('http://localhost:3000/api/getvideo', { params });
            console.log('Videos fetched successfully:', response.data); // Debug response data
            setVideos(response.data); // Update state with fetched videos
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    }, [routeArtistId, contextArtistId, userId]);

    // Effect to fetch videos when component mounts or user state changes
    useEffect(() => {
        if (isLoggedIn && !isLoading) {
            console.log('Fetching videos as user is logged in and loading is complete...');
            fetchVideos();
        }
    }, [fetchVideos, isLoggedIn, isLoading]);

    // Show loading message if data is still being fetched
    if (loading) return <div>Loading...</div>;

    // Show error message if there's an error
    if (error) return <div>{error}</div>;

    return (
        <div>
            {/* <div className="Heading_Image">
                {imageUrl ? ( // Check if imageUrl is available
                    <img src={imageUrl} alt="Artist" /> // Use the fetched image URL
                ) : (
                    <img src="src/assets/images/Music Artist.jpg" alt="Default Artist" /> // Fallback image
                )}
            </div> */}
            <div className='Profile'>
                <h1>{routeArtistId || contextArtistId ? 'Artist' : 'User'} Profile</h1>
                {routeArtistId || contextArtistId ? (
                    artist ? (
                        <div>
                            <p><strong>Name:</strong> {artist.username}</p>
                            <p><strong>Email:</strong> {artist.email}</p>
                            <p><strong>Location:</strong> {artist.Location}</p>
                            <p><strong>Genre :</strong> {artist.Genre}</p>
                            <p><strong>Number:</strong> {artist.ContactInfo}</p>
                            
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
                
            </div>

            <h1>Videos</h1>

            <div className="video-gallery">
              
                {videos.length > 0 ? (
                    videos.map((video, index) => {
                        // Validate video URL before creating URL object
                        let videoId;
                        try {
                            const url = new URL(video.videoUrl);
                            videoId = url.searchParams.get("v");
                        } catch (error) {
                            console.error('Invalid video URL:', video.videoUrl);
                            videoId = null; // Fallback if URL is invalid
                        }
                        console.log(`Rendering video ${index} with ID: ${videoId}`); // Debug video ID

                        return (
                            videoId ? (
                                <div key={index} className="video-item">
                                    <iframe 
                                        width="300" 
                                        height="200"
                                        src={`https://www.youtube.com/embed/${videoId}`} 
                                        title={`YouTube video player ${index}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            ) : (
                                <p key={index}>Invalid video URL</p>
                            )
                        );
                    })
                ) : (
                    <p>No videos available</p>
                )}
            </div>
        </div>
    );
};

export default Profile; // Export the Profile component for use in other parts of the application
