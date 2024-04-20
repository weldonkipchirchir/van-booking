import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useAuth } from "../../utils/auth";

function SignIn() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginStatus, setLoginStatus] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loginFormData.email === "weldonkipchirchir23@gmail.com" && loginFormData.password === "password") {
      const email = loginFormData.email;
      login({ email });
      navigate("/verify-2fa");
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }

  const handleToggle = () => {
    setType(type === "password" ? "text" : "password");
    setIcon(icon === eyeOff ? eye : eyeOff);
  };

  function handleChange(e) {
    setLoginStatus(true);
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="container-signin">
      <h1>Sign in to your account</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              onChange={handleChange}
              value={loginFormData.email}
              style={{ color: "black", fontSize: "16px", paddingLeft: "10px" }}
            />
          </div>
          <div className="form-input">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                name="password"
                onChange={handleChange}
                type={type}
                placeholder="Password"
                value={loginFormData.password}
                style={{
                  color: "black",
                  fontSize: "16px",
                  paddingLeft: "10px",
                }}
              />
              <span
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
                onClick={handleToggle}
              >
                <Icon style={{ position: "absolute", marginRight: "5px" }} icon={icon} size={25} />
              </span>{" "}
            </div>
          </div>
          <button type="submit">Sign In</button>
        </form>
        {loginStatus === false && (
          <p className="error">Invalid username or password</p>
          )}
        <p>
          Don’t have an account?{" "}
          <Link className="signup" to="/sign-up">
            Create one now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
