import './Restro.css'
import { Button, Card } from 'react-bootstrap'
function Restro() {
  return (
    <div>
      <div className="Home-Image">
      <img src="/src/assets/images/Restro.jpg" alt="" />
    </div>
    <h1>Restaurant/Hotels</h1>
    <div className='cards'>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="/src/assets/images/restro1.jpg" style={{ height: '150px'}} />
      <Card.Body>
        <Card.Title>Hotel Name</Card.Title>
        <Card.Text>
          Hotels short description
        </Card.Text>
        <Button variant="primary">Profile</Button>
      </Card.Body>
    </Card>
    </div>
    <div className='cards'>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="/src/assets/images/restro2.jpg" style={{ height: '150px'}} />
      <Card.Body>
        <Card.Title>Hotel Name</Card.Title>
        <Card.Text>
        Hotels short description
        </Card.Text>
        <Button variant="primary">Profile</Button>
      </Card.Body>
    </Card>
    </div>
    <div className='cards'>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="/src/assets/images/restro3.jpg" style={{ height: '150px'}} />
      <Card.Body>
        <Card.Title>Hotel Name</Card.Title>
        <Card.Text>
        Hotels short description
        </Card.Text>
        <Button variant="primary">Profile</Button>
      </Card.Body>
    </Card>
    </div>
    </div>
  )
}

export default Restro
