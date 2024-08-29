import 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Create and style this CSS file as needed

const Dashboard = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <nav>
          <ul>
            <li>
              <Link to="/dashboard/home">Home</Link>
            </li>
            <li>
              <Link to="/dashboard/upload">Upload</Link>
            </li>
            <li>
              <Link to="/dashboard/message">Message</Link>
            </li>
            <li>
              <Link to="/dashboard/request">Request</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        {/* You can use React Router's Outlet to render the selected component here */}
      </main>
    </div>
  );
}

export default Dashboard;
