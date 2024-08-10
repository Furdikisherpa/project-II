import { useContext,} from "react";
import { AuthContext } from "../AuthContext";

function ArtistProfile() {

    const { isLoggedIn, logout } = useContext(AuthContext);

    return (
        <div>

            {isLoggedIn ? (
                <>
                    <p>Welcome, You are logged in.</p>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <p>Please log in to access more features.</p>
            )}
    </div>
    );
}

export default ArtistProfile;
