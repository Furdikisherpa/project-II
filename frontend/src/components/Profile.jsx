import './Profile.css'; // Import CSS for styling the Profile component
import { useState, useEffect, useContext, useCallback } from 'react'; // Import React hooks for state management and side effects
import axios from 'axios'; // Import axios for making HTTP requests
import { AuthContext } from '../AuthContext'; // Import AuthContext to access authentication data and state
import { useParams, useNavigate } from 'react-router-dom'; // Import hooks for handling routing

const Profile = () => {
    // Extract artistId from route parameters
    const { artistId: routeArtistId } = useParams();
    const navigate = useNavigate(); // Initialize navigate hook for programmatic navigation

    // State variables to manage profile data, loading state, error messages, and video information
    const [artist, setArtist] = useState(null); // State for artist data
    const [user, setUser] = useState(null); // State for user data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error messages
    const [videoUrl, setVideoUrl] = useState(''); // State for storing the video URL input
    const [videos, setVideos] = useState([]); // State for storing fetched videos

    // Extract authentication data from AuthContext
    const { artistId: contextArtistId, userId, jwt, isLoading, isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (!isLoggedIn) {
            console.log('User is not logged in');
            // Redirect to login or show login prompt
        } else if (contextArtistId) {
            console.log('Artist is logged in:', contextArtistId);
            // Load artist-specific data
        } else if (userId) {
            console.log('User is logged in:', userId);
            // Load user-specific data
        }
    }, [contextArtistId, userId, isLoggedIn]);

    // Effect to redirect users to login page if they are not logged in
    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            console.log('User is not logged in, redirecting to login page...');
            navigate('/login');
        }
    }, [isLoading, isLoggedIn, navigate]);

    // Function to fetch profile data based on artistId or userId
    const fetchProfileData = useCallback(async () => {
        // Determine the ID to use for fetching profile data
        const id = routeArtistId || contextArtistId || userId;

        if (!id) {
            console.error('No ID found'); // Log error if no ID is found
            setError('No ID found'); // Set error state
            setLoading(false); // Stop loading
            return;
        }

        // Define the endpoint URL based on whether it's an artist or user profile
        const endpoint = routeArtistId || contextArtistId
            ? `http://localhost:3000/api/artist/${id}`
            : `http://localhost:3000/api/user/${id}`;

        console.log(`Fetching profile data from ${endpoint}`); // Debug endpoint URL

        try {
            // Make GET request to fetch profile data
            const response = await axios.get(endpoint, {
                headers: { Authorization: `Bearer ${jwt}` } // Include JWT in request headers
            });

            console.log('Profile data fetched successfully:', response.data); // Debug response data
            // Update state with fetched profile data
            routeArtistId || contextArtistId ? setArtist(response.data) : setUser(response.data);
        } catch (err) {
            // Handle errors during data fetch
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
            // Make GET request to fetch videos
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

    // Function to handle video upload form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Attempting to upload video with URL:', videoUrl); // Debug video URL

        try {
            // Make POST request to upload video
            const response = await axios.post('http://localhost:3000/api/uploadvideo', { 
                videoUrl,
                artistId: routeArtistId || contextArtistId || null,
                userId: userId || null
            }, {
                headers: { Authorization: `Bearer ${jwt}` } // Include JWT in request headers
            });

            console.log('Video uploaded successfully:', response.data); // Debug response data
            alert('Video uploaded successfully!'); // Show success message
            fetchVideos(); // Fetch videos again after upload
        } catch (error) {
            console.error('Error uploading video:', error);
            alert('Error uploading video. Please try again.'); // Show error message
        }

        // Debug IDs for troubleshooting
        console.log('Debugging IDs:');
        console.log('userId:', userId);
        console.log('routeArtistId:', routeArtistId);
        console.log('contextArtistId:', contextArtistId);
    };

    return (
        <div>
            <div className="Heading_Image">
                {/* Display image for the artist */}
                <img src="/src/assets/images/Music Artist.jpg" alt="Music Artist" />
            </div>
            <div className='Profile'>
                <h1>{routeArtistId || contextArtistId ? 'Artist' : 'User'} Profile</h1>
                {/* Display profile information based on whether it's an artist or user */}
                {routeArtistId || contextArtistId ? (
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
                
                {/* Conditionally render the video upload form if the logged-in user is viewing their own profile */}
                {
    /* Temporarily force the video upload form to render */
    <div className='videoUpload'>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={videoUrl} 
                onChange={(e) => setVideoUrl(e.target.value)} 
                placeholder="Enter YouTube Video URL" 
                required 
            />
            <button type="submit">Upload</button>
        </form>
    </div>
}

                
                <hr /> <br />
                <p>Settings</p>
            </div>

            <div className="video-gallery">
                {/* Display fetched videos */}
                {videos.length > 0 ? (
                    videos.map((video, index) => {
                        // Extract video ID from the video URL
                        const videoId = new URL(video.videoUrl).searchParams.get("v");
                        console.log(`Rendering video ${index} with ID: ${videoId}`); // Debug video ID

                        return (
                            <div key={index} className="video-item">
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
                            </div>
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
