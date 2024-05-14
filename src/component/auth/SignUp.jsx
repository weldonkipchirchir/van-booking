import { Link } from "react-router-dom";
import "./SignUp.css";
import { useState } from "react";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { createUser } from "../../utils/api";
import { useNavigate, useLocation } from "react-router-dom";

function SignUp() {
  // 1. Use the useLocation hook to access the location object
  const location = useLocation();
  const role = location.state?.role;
  console.log(role);
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    privacyPolicy: false,
    newsLetter: false,
    role: role,
  });

  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(eyeOff);
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(eyeOff);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleTogglePassword = (field) => {
    if (field === "password") {
      setPasswordType(passwordType === "password" ? "text" : "password");
      setPasswordIcon(passwordIcon === eyeOff ? eye : eyeOff);
    } else if (field === "confirmPassword") {
      setConfirmPasswordType(
        confirmPasswordType === "password" ? "text" : "password"
      );
      setConfirmPasswordIcon(confirmPasswordIcon === eyeOff ? eye : eyeOff);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    const { name, email, privacyPolicy, newsLetter, password, role } =
      registerFormData;
    registerFormData.role = role;
    console.log(registerFormData);
    if (password !== registerFormData.confirmPassword) {
      setError("Passwords do not match");
      return; // Exit the function early if passwords do not match
    }

    createUser({ name, email, privacyPolicy, newsLetter, password, role })
      .then((response) => {
        console.log("User created successfully:", response);
        navigate("/sign-in", { replace: true });
        // Handle the response data here, e.g., show a success message to the user
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        // Handle the error, e.g., display an error message to the user
      });
  }

  function handleChange(e) {
    setError(null);
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setRegisterFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }

  return (
    <div className="container-signin">
      <div className="container-card">
        <h1>Create your account</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                name="name"
                placeholder="username"
                onChange={handleChange}
                value={registerFormData.name}
                style={{
                  color: "black",
                  fontSize: "16px",
                  paddingLeft: "10px",
                }}
              />
            </div>
            <div className="form-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                onChange={handleChange}
                value={registerFormData.email}
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
                  type={passwordType}
                  name="password"
                  placeholder="password"
                  onChange={handleChange}
                  value={registerFormData.password}
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
                  onClick={() => handleTogglePassword("password")}
                >
                  <Icon
                    style={{ position: "absolute", marginRight: "5px" }}
                    icon={passwordIcon}
                    size={25}
                  />
                </span>{" "}
              </div>
            </div>
            <div className="form-input">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input">
                <input
                  type={confirmPasswordType}
                  name="confirmPassword"
                  placeholder="confirm password"
                  onChange={handleChange}
                  value={registerFormData.confirmPassword}
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
                  onClick={() => handleTogglePassword("confirmPassword")}
                >
                  <Icon
                    style={{ position: "absolute", marginRight: "5px" }}
                    icon={confirmPasswordIcon}
                    size={25}
                  />
                </span>{" "}
              </div>
            </div>
            <div
              className="checkbox-container"
              style={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <label htmlFor="privacy-policy">
                I have read and agree to the{" "}
                <a href="/privacy-policy">Privacy Policy</a>
              </label>
              <input
                type="checkbox"
                id="privacy-policy"
                name="privacyPolicy"
                onChange={handleChange}
                checked={registerFormData.privacyPolicy}
                style={{ height: "20px", width: "20px" }}
              />
            </div>
            <div
              className="checkbox-container"
              style={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <label htmlFor="newsLetter">Subscribe to newsletter</label>
              <input
                type="checkbox"
                id="newsLetter"
                name="newsLetter"
                onChange={handleChange}
                checked={registerFormData.newsLetter}
                style={{ height: "20px", width: "20px" }}
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p>
            Have an account?{" "}
            <Link className="signup" to="/sign-in">
              Login now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
