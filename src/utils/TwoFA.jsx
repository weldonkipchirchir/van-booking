import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import "./TwoFA.css";
function TwoFA() {
  const navigate = useNavigate();
  const { verify2Fa, is2FaVerifed,       setIs2FaVerifed
  } = useAuth();
  const [code, setCode] = useState("");
  const [twofaStatus, settwofaStatus] = useState(true);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await verify2Fa(code);
    if (isValid) {
      navigate("/");
      setIs2FaVerifed(true)
      console.log(is2FaVerifed)
      settwofaStatus(true);
    } else {
      settwofaStatus(false);
    }
  };
  
  return (
    <div className="container-2fa">
      <h1>2FA Verification</h1>
      <div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter verification code"
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
