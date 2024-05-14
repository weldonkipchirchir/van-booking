import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useAuth } from "../../utils/auth";
import { loginUser2 } from "../../utils/api";

function SignIn() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const navigate = useNavigate();
  const { login, setUserInfo, setIsToken, setVerifyCode } = useAuth();
  const [loginError, setLoginError] = useState(null);
  const [status, setStatus] = useState("idle");
  const location = useLocation();
  const { pathname } = location.state || "/";

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setLoginError(null);
    console.log("signin pathnmae", pathname);

    const path = pathname;

    try {
      // const logInData = await loginUser(loginFormData);
      const logInData = await loginUser2(loginFormData);
      setUserInfo(logInData.user);

      setIsToken(logInData.access_token);
      setVerifyCode(logInData.verification_code);

      const email = loginFormData.email;
      login({ email });
      navigate("/verify-2fa", { state: { myProp: path }, replace: true });
      setStatus("idle");
    } catch (err) {
      setLoginError(err);
      console.log(err);
      setStatus("idle");
    }
  }

  const handleToggle = () => {
    setType(type === "password" ? "text" : "password");
    setIcon(icon === eyeOff ? eye : eyeOff);
  };

  function handleChange(e) {
    setLoginError(null);
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="container-signin">
      <div className="container-card">
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
                style={{
                  color: "black",
                  fontSize: "16px",
                  paddingLeft: "10px",
                }}
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
                  <Icon
                    style={{ position: "absolute", marginRight: "5px" }}
                    icon={icon}
                    size={25}
                  />
                </span>{" "}
              </div>
            </div>
            <button type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Logging in..." : "Log in"}
            </button>
          </form>
          {loginError && <p className="error">{loginError.message}</p>}
          <p>
            Don’t have an account?{" "}
            <Link className="signup" to="/landing-page">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
