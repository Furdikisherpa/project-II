import './Artist_Signup.css'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';



function Artist_Signup(){
  const [artistname, setartistname] = useState("");
  const [artistEmail, setartistEmail] = useState("");
  const [genre, setgenre] = useState("");
  const [artistpassword, setartistpassword] = useState("");
  const [Contactinfo, setContactinfo] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  


const handleSubmit = (event) =>{
  event.preventDefault();

  const userData ={
    artistname,
    artistEmail,
    genre,
    artistPassword: artistpassword,  // Change this to match backend
    contactinfo: Contactinfo  // Ensure this matches the backend field name
  };
axios.post('http://localhost:3000/api/artistregister', userData)
.then(response =>{
  console.log('artist created:', response.data);
  navigate('/');
})
.catch(error => {
  setError(error.message);
});
};
  return (
    <div className='artist'>
    <div className='artist_signup2'>
    <h1>Welcome Back</h1>
    <p>To keep connected with us please login with your personal info</p>
    <Link to="/login" className='link'>
      <button className='btn'>Log In</button>
    </Link>
    </div>
      <div className="artist_signup">
        <h1 className='artist_title'>Create New Artist Account</h1>
        <form onSubmit={handleSubmit} className='artist_form'>
          <input type="text" placeholder='Enter your name' value={artistname} onChange={(e) => setartistname(e.target.value)} required /><br /> <br />
          <input type="email" placeholder='Enter your Email' value={artistEmail} onChange={(e) => setartistEmail(e.target.value)} required/><br /> <br />
          <input type="password" placeholder='Enter your Password' value={artistpassword} onChange={(e) => setartistpassword(e.target.value)} /><br /> <br />
          <input type="text" placeholder='Enter your genre' value={genre} onChange={(e) => setgenre(e.target.value)} required/> <br /> <br />
          <input type="text" placeholder='Enter your contact number' value={Contactinfo} onChange={(e) => setContactinfo(e.target.value)} required /> <br /> <br />
          {/* <label htmlFor="gender">Gender</label> <br />
          <input type="radio" id="male" name="Gender" value="male" className='gender' />
          <label htmlFor="male">Male</label> 
          <input type="radio" id="female" name="Gender" value="female" className='gender'/>
          <label htmlFor="female">Female</label> <br /> <br /> */}
          <button type="submit" className='Artist_submit'>Signup</button>
        </form> <br /> 
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  )
}


export default Artist_Signup
