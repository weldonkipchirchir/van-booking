import { Link } from "react-router-dom";
import "./SignIn.css";
function SignUp() {
  return (
    <div className="container-signin">
      <h1>Create your account</h1>
      <div className="form-container">
        <form action="">
          <div className="form-input">
            <label htmlFor="email">Username</label>
            <input type="email" id="email" />
          </div>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className="form-input">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="form-input">
            <label htmlFor="password">Confirm Password</label>
            <input type="password" id="password" />
          </div>
          <div style={{display:"flex", gap:"10px", alignItems:"center"}} className="checkbox-container">
            <label htmlFor="privacy-policy">
              I have read and agree to the{" "}
              <a href="/privacy-policy">Privacy Policy</a>
            </label>
            <input style={{height:"20px", width:"20px"}} type="checkbox" id="privacy-policy" name="privacy-policy" />
          </div>
          <div style={{display:"flex", gap:"10px", alignItems:"center"}} className="checkbox-container">
            <label htmlFor="newsletter">Subscribe to newsletter</label>
            <input style={{height:"20px",  width:"20px"}} type="checkbox" id="newsletter" name="newsletter" />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p></p>
        <p>
          Have an account? <Link className="signup">Login now</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
