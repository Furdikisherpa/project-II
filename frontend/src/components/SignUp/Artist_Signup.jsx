import './Artist_Signup.css'
const Artist_Signup = () =>{
  return (
    <div>
    <div className="Home-Image">
      <img src="/src/assets/images/register.jpg" alt="" className='image1' />
    </div>
      <div className="artist_signup">
        <h1>Signup</h1>
        <form action="" method='get'>
          <label htmlFor="username">Name</label><br />
          <input type="text" placeholder='Enter your name' /><br /> <br />
          <label htmlFor="useremail">Email</label> <br />
          <input type="email" placeholder='Enter your email' /><br /> <br />
          <label htmlFor="userpassword">Password</label><br />
          <input type="password" placeholder='Enter your password' /> <br /> <br />
          <label htmlFor="userconfirmpassword">Confirm Password</label> <br />
          <input type="password" placeholder='Re-Enter your password' /><br /> <br />
          <label htmlFor="gender">Gender</label> <br />
          <input type="radio" id="male" name="Gender" value="male" className='gender' />
          <label htmlFor="male">Male</label> 
          <input type="radio" id="female" name="Gender" value="female" className='gender'/>
          <label htmlFor="female">Female</label> <br /> <br />
          <button type="submit">Signup</button>
        </form> <br />
      </div>
    </div>
  )
}

export default Artist_Signup
