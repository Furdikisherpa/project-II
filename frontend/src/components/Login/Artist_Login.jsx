import './Artist_Login.css'
function Artist_Login() {
  return (
    <div>
      <div className="Home-Image">
      <img src="/src/assets/images/music.jpg" alt="" />
    </div>
      <div className='artist_login'>
        <h1>Login</h1>
        <form action="" method='get'>
          <label htmlFor="username">Username</label>
          <input type="text" placeholder='Enter User Name' /><br /> <br />
          <label htmlFor="password">Password</label>
          <input type="password" placeholder='Enter Password' /> <br /> <br />
          <button type='submit'>Login</button>
        </form> <br />
      </div>
    </div>
  )
}

export default Artist_Login
