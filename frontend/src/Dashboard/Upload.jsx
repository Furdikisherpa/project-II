import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { useParams } from 'react-router-dom';

const Upload = () => {
  const { artistId: routeArtistId } = useParams();
  const [videoUrl, setVideoUrl] = useState('');
  const { artistId: contextArtistId, userId, jwt } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Attempting to upload video with URL:', videoUrl);
  
    try {
      const response = await axios.post('http://localhost:3000/api/uploadvideo', {
        videoUrl,
        artistId: routeArtistId || contextArtistId || null,
        userId: userId || null,
      }, {
        headers: { Authorization: `Bearer ${jwt}` }, // Ensure correct Authorization header
      });
  
      console.log('Video uploaded successfully:', response.data);
      alert('Video uploaded successfully!');
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Error uploading video. Please try again.');
    }
  };
  

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
    </div>
  );
}

export default Upload;
