import './Artist_Login.css'


function Artist_Login() {
  return (
    <div className='artist_login'>
      <form action="" >
        <input type="text" name='username' placeholder='Enter username' /><br />
        <input type='password' name='password' placeholder='Enter password'/><br /><br />
        <button type='submit'>SUBMIT</button>
      </form>
    </div>
  )
}

export default Artist_Login
