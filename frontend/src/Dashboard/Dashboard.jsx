import 'react';
import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css';

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
            <li>
              <Link to="/dashboard/review">Review</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>



  );
}

export default Dashboard;
