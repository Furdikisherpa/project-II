import './Artist_Signup.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Artist_Signup(){
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
    <div>
    <div className="Home-Image">
      <img src="/src/assets/images/register.jpg" alt="" className='image1' />
    </div>
      <div className="artist_signup">
        <h1 className='artist_title'>Signup</h1>
        <form onSubmit={handleSubmit} className='artist_form'>
          <input type="text" placeholder='Enter your name' value={username} onChange={(e) => setusername(e.target.value)} required className='Artist_username'/><br /> <br />
          <input type="text" placeholder='Enter your name' value={fullname} onChange={(e) => setfullname(e.target.value)} required className='Artist_password'/><br /> <br />
          <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setemail(e.target.value)} required className='Artist_email' /><br /> <br />
          <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setpassword(e.target.value)} required className='Artist_password'/> <br /> <br />
          <input type="text" placeholder='Enter your contact number' value={contact} onChange={(e) => setcontact(e.target.value)} required className='Artist_contact'/> <br /> <br />
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
