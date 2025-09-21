import { Link, useLocation } from "react-router-dom";
import "./LoginPage.css"; // Make sure this CSS has dashboard styles

export default function Dashboard() {
  const location = useLocation();

  // Show dashboard info only on exact /dashboard path
  const showDashboardInfo = location.pathname === "/dashboard";

  return (
    <div className="dashboard-container" style={{ paddingTop: "80px" }}>
      {showDashboardInfo && (
        <div className="dashboard-card">
          <h2 className="dashboard-title">Welcome to SmartAccess Portal</h2>

          <div className="dashboard-section">
            <h3>About the Project</h3>
            <p>
              Our platform enables users to securely register and log in with role-based access, ensuring a smooth and secure experience.
            </p>
          </div>

          <div className="dashboard-section">
            <h3>Purpose</h3>
            <ul>
              <li>✅ Secure authentication and role-based access</li>
              <li>✅ Simple and elegant user interface</li>
              <li>✅ Easy navigation and user experience</li>
            </ul>
          </div>

          <div className="dashboard-section">
            <h3>About our team</h3>
            <ul>
              <li>Padala Tejasri Reddy</li>
              <li>Madhuri</li>
              <li>Javvaji Jyothi Keerthana</li>
            </ul>
          </div>

          <div className="dashboard-section">
            <h3>Applications We Sell</h3>
            <ul>
              <li>
                💻 Laptops – <Link to="/dashboard/laptops" className="dashboard-link">Click Here</Link>
              </li>
              <li>
                📱 Smartphones – <Link to="/dashboard/smartphones" className="dashboard-link">Click Here</Link>
              </li>
              <li>
                🎧 Bluetooth Devices – <Link to="/dashboard/bluetooth" className="dashboard-link">Click Here</Link>
              </li>
              <li>
                ⌚ Smartwatches – <Link to="/dashboard/smartwatches" className="dashboard-link">Click Here</Link>
              </li>
              <li>
                🖱️ Computer Accessories - <Link to ="/dashboard/computerAccessories" className="dashboard-link">Click Here</Link>
                </li>
              <li>
                🔊 Speakers - <Link to ="/dashboard/speakers" className="dashboard-link">Click Here</Link> 
                </li>
              <li>
                📷 Cameras - <Link to ="/dashboard/cameras" className="dashboard-link">Click Here</Link>
                </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
