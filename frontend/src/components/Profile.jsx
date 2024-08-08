import { useContext } from "react"
import { AuthContext  } from "../AuthContext"

function Profile() {
const {isLoggedIn, logout} = useContext(AuthContext);

  return (
    <div>
      <div className="Home-Image">
      <img src="/src/assets/images/Music Artist.jpg" alt="" />
    </div>
      <h1>Profile</h1>
      {isLoggedIn ? (
        <>
          <p>Welcome! You are logged in.</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please log in to access more features.</p>
      )}
    </div>
  )
}

export default Profile
