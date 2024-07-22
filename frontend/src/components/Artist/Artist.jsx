import './Artist.css'
import { Button, Card } from 'react-bootstrap'; // Import Card from react-bootstrap
function Artist() {
  return (
    <div>
      <div className="Home-Image">
      <img src="/src/assets/images/Music Artist.jpg" alt="" />
    </div>
    <h1>Artist</h1>
    <div className='cards'>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="/src/assets/images/dj.jpg" style={{ height: '150px'}} />
      <Card.Body>
        <Card.Title>Artist Name</Card.Title>
        <Card.Text>
          Artist description
        </Card.Text>
        <Button variant="primary">Profile</Button>
      </Card.Body>
    </Card>
    </div>
    <div className='cards'>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="/src/assets/images/dj.jpg" style={{ height: '150px'}} />
      <Card.Body>
        <Card.Title>Artist Name</Card.Title>
        <Card.Text>
        Artist description
        </Card.Text>
        <Button variant="primary">Profile</Button>
      </Card.Body>
    </Card>
    </div>
    <div className='cards'>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="/src/assets/images/dj.jpg" style={{ height: '150px'}} />
      <Card.Body>
        <Card.Title>Artist Name</Card.Title>
        <Card.Text>
        Artist description
        </Card.Text>
        <Button variant="primary">Profile</Button>
      </Card.Body>
    </Card>
    </div>
    </div>
  )
}

export default Artist
