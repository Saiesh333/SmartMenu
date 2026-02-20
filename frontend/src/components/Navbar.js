import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="nav-container">

        <h2 className="logo">Smart Restaurant</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/profile">Profile</Link>
        </div>

      </div>
    </div>
  );
}

export default Navbar;
