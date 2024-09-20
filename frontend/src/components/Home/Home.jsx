import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-text">
          <h1>Book Your Favorite Artists Now</h1>
          <p>
            Discover and book talented performers for your events! From singers to instrumentalists,
            our platform connects you with artists who will make your event unforgettable.
          </p>
          <button className="book-now-button">Book Now</button>
        </div>
        <div className="hero-illustration">
          <img
            src="/src/assets/images/sing.png"
            alt="Singing illustration"
          />
        </div>
      </div>

     
    </div>
  );
};

export default Home;
