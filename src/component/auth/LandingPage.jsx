import { NavLink } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="container-landing">
      <h1>Welcome to Van Rental</h1>
      <div className="options">
        <NavLink to="/sign-up" state={{ role: "owner" }}>
          Offer Rental Service
        </NavLink>
        <NavLink to="/sign-up" state={{ role: "customer" }}>
          Acquire Rental Service
        </NavLink>
      </div>
    </div>
  );
}

export default LandingPage;
