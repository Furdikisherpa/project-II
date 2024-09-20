import { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { useParams } from 'react-router-dom';
import './Upload.css';

const Upload = () => {
  const { artistId: routeArtistId } = useParams();
  const [videoUrl, setVideoUrl] = useState('');
  const [videos, setVideos] = useState([]); // State for fetched videos
  const { artistId: contextArtistId, userId, jwt } = useContext(AuthContext);

  // Function to handle video upload submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!routeArtistId && !contextArtistId && !userId) {
      alert("No valid user or artist ID available for upload.");
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/uploadvideo', {
        videoUrl,
        artistId: routeArtistId || contextArtistId || null,
        userId: userId || null,
      }, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      alert('Video uploaded successfully!');
      setVideoUrl(''); // Clear the input after successful upload
      fetchVideos(); // Fetch updated videos after upload
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Error uploading video. Please try again.');
    }
  };

  // Function to fetch uploaded videos
  const fetchVideos = useCallback(async () => {
    const params = { artistId: routeArtistId || contextArtistId || null, userId: userId || null };
    try {
      const response = await axios.get('http://localhost:3000/api/getvideo', { params });
      setVideos(response.data); // Update state with fetched videos
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }, [routeArtistId, contextArtistId, userId]);

  // Function to handle video deletion
  const handleDelete = async (videoUrl) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        await axios.delete('http://localhost:3000/api/deletevideo', {
          data: { 
            videoUrl, 
            artistId: routeArtistId || contextArtistId || null,
            userId: userId || null
          },
          headers: { Authorization: `Bearer ${jwt}` }
        });

        alert('Video deleted successfully!');
        fetchVideos(); // Fetch updated videos after deletion
      } catch (error) {
        console.error('Error deleting video:', error.response ? error.response.data : error.message);
        alert('Error deleting video. Please try again.');
      }
    }
  };

  // Fetch videos when the component mounts
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
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

      <h2>Uploaded Videos</h2>
      <table className="video-table">
        <thead>
          <tr>
            <th>Video</th>
            <th>URL</th>
            <th>Action</th> {/* Add a header for actions like delete */}
          </tr>
        </thead>
        <tbody>
          {videos.length > 0 ? (
            videos.map((video, index) => {
              let videoId;
              try {
                const url = new URL(video.videoUrl);
                videoId = url.searchParams.get("v");
              } catch (error) {
                console.error('Invalid video URL:', video.videoUrl);
                videoId = null;
              }

              return (
                <tr key={index}>
                  <td>
                    {videoId ? (
                      <iframe 
                        width="150" 
                        height="100" 
                        src={`https://www.youtube.com/embed/${videoId}`} 
                        title={`YouTube video player ${index}`} 
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      'Invalid video URL'
                    )}
                  </td>
                  <td>
                    <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">{video.videoUrl}</a>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(video.videoUrl)}>Delete</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3">No videos available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Upload;
