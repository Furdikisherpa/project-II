import './Contact.css'
import { Button, Card } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
function Contacts() {
  return (
    <div>
      <div className="Home-Image">
      <img src="/src/assets/images/contacts.jpg" alt="" />
    </div>
    <h1>Contact Us</h1>
    <h3>Any question or remarks? just write a message!</h3>
    <form action="https://formspree.io/f/mrgvzjyj"
    method="POST">
      <label>Name :</label> 
      <input type="text" name="name" placeholder="Your name" required/> <br />
      <label>Email :</label> 
      <input type="email" name="_replyto" placeholder="Your email" required/> <br />
      <Button>Submit</Button>
    </form>

    
    <div className='cards'>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="/src/assets/images/about.png" style={{ height: '100px'}} />
      <Card.Body>
        <Card.Title><h3>About</h3>
        </Card.Title>
        {/* <Card.Text>
        Artist description
        </Card.Text> */}
      </Card.Body>
    </Card>
    </div>
    <div className='cards'>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="/src/assets/images/phone.png" style={{ height: '100px'}} />
      <Card.Body>
        <Card.Title><h3>Phone (LandLine)</h3></Card.Title>
        {/* <Card.Text>
        Artist description
        </Card.Text> */}
      </Card.Body>
    </Card>
    </div>
    <div className='cards'>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="/src/assets/images/gps.png" style={{ height: '100px'}} />
      <Card.Body>
        <Card.Title><h3>Our Office Location</h3></Card.Title>
        {/* <Card.Text>
        Artist description
        </Card.Text> */}
      </Card.Body>
    </Card>
    </div>
    <div className='card-group'>
    </div>
    </div>
  )
}

export default Contacts
