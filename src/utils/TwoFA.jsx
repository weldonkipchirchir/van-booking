import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";
import "./TwoFA.css";
function TwoFA() {
  const navigate = useNavigate();
  const { verify2Fa, is2FaVerifed, setIs2FaVerifed, user } = useAuth();
  const [code, setCode] = useState("");
  const [twofaStatus, settwofaStatus] = useState(true);

  console.log("2fa verified", is2FaVerifed);

  const location = useLocation();
  const { state } = location;

  // Access the passed prop from state
  const myPropValue = (state && state.myProp) || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await verify2Fa(code);
    if (isValid) {
      navigate(`${myPropValue}`, { replace: true });
      setIs2FaVerifed(true);
      settwofaStatus(true);
    } else {
      settwofaStatus(false);
    }
  };

  return (
    <div className="container-2fa">
      <div className="container-card">
        <h1>Two-FA Verification</h1>
        <p>Verification sent {user.email}</p>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter verification code"
              style={{
                cursor: "auto",
                border: "1px solid",
                borderColor: "#ccc",
              }} // Add border styles
            />
            <button type="submit">Verify</button>
          </form>
          {twofaStatus === false && (
            <p className="error">Invalid code. Try Again!!!</p>
          )}
          <NavLink to="/sign-in" className="twofa-link">
            Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default TwoFA;
