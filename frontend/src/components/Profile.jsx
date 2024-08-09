import './Profile.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";

function Profile() {
  // const [profileData, setProfileData] = useState(null);
  const { isLoggedIn, logout, jwt, userId } = useContext(AuthContext); // Use userId from context
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (isLoggedIn && userId) {
  //     fetch(`http://localhost:3000/api/profile/${userId}`, {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${jwt}`,
  //       },
  //     })
  //     .then(response => {
  //       if (!response.ok) {
  //         return response.text().then(text => { throw new Error(text) });
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setProfileData(data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       setError(error.message);
  //       setLoading(false);
  //     });
  //   } else {
  //     setLoading(false);
  //   }
  // }, [isLoggedIn, jwt, userId]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>{error}</p>;
  // }

  // if (!profileData) {
  //   return <p>No profile data available.</p>;
  // }

  return (
    <div>
      {/* <div>
        <img src={profileData.imageUrl} alt={profileData.username} />
      </div> */}
      {/* <div>
        <h2>Introduction</h2>
        <p>Bio: {profileData.bio}</p>
        <p>Username: {profileData.username}</p>
        <p>Name: {profileData.name}</p>
        <p>Email: {profileData.email}</p>
        {profileData.genre && <p>Genre: {profileData.genre}</p>}
        {profileData.contact && <p>Contact: {profileData.contact}</p>}
      </div> */}
      {isLoggedIn ? (
        <>
          <p>Welcome! You are logged in.</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please log in to access more features.</p>
      )}
    </div>
  );
}

export default Profile;
