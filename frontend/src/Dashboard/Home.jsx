
import './DashHome.css';

const DashHome = () => {
  // Example data
  const stats = {
    uploads: 12,
    messages: 23,
    reviews: 8,
    requests: 5,
  };

  return (
    <div className="dash-home">
      <p>Welcome to your dashboard home page.</p>
      <div className="cards-container">
        <div className="card">
          <h3>Uploads</h3>
          <p>{stats.uploads}</p>
        </div>
        <div className="card">
          <h3>Messages</h3>
          <p>{stats.messages}</p>
        </div>
        <div className="card">
          <h3>Reviews</h3>
          <p>{stats.reviews}</p>
        </div>
        <div className="card">
          <h3>Requests</h3>
          <p>{stats.requests}</p>
        </div>
      </div>
    </div>
  );
}

export default DashHome;
