import { Link } from "react-router-dom";
import "./SignIn.css";
function SignIn() {
  return (
    <div className="container-signin">
      <h1>Sign in to your account</h1>
      <div className="form-container">
        <form action="">
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className="form-input">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <p>Don’t have an account? <Link className="signup">Create one now</Link></p>
      </div>
    </div>
  );
}

export default SignIn;
