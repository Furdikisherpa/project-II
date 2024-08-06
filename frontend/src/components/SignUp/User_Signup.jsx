import './User_Signup.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function User_Signup(){
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [contact, setcontact] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

const handleSubmit = (event) =>{
  event.preventDefault();

  const userData ={
    fullname,
    email,
    username,
    password,
    contact
  };
axios.post('http://localhost:3000/api/register', userData)
.then(response =>{
  console.log('user created:', response.data);
  navigate('/');
})
.catch(error => {
  setError(error.message);
});
};
  return (
    <div className='user'>
      <div className='user_signup2'>
    <h1>Welcome Back</h1>
    <p>To keep connected with us please login with your personal info</p>
    <button type="submit" className='Artist_Login'>Login</button>
    </div>
      <div className="user_signup">
        <h1 className='user_title'>Create New User Account</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Enter your username' value={username} onChange={(e) => setusername(e.target.value)} required/><br /> <br />
          <input type="text" placeholder='Enter your name' value={fullname} onChange={(e) => setfullname(e.target.value)} required/><br /> <br />
          <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setemail(e.target.value)} required /><br /> <br />
          <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setpassword(e.target.value)} required /> <br /> <br />
          <input type="number" placeholder='Enter your contact number' value={contact} onChange={(e) => setcontact(e.target.value)} required /> <br /> <br />
          {/* <label htmlFor="gender">Gender</label> <br />
          <input type="radio" id="male" name="Gender" value="male" className='gender' />
          <label htmlFor="male">Male</label> 
          <input type="radio" id="female" name="Gender" value="female" className='gender'/>
          <label htmlFor="female">Female</label> <br /> <br /> */}
          <button type="submit" className='user_submit'>Signup</button>
        </form> <br />
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  )
}


export default User_Signup
