import { NavLink, useNavigate } from "react-router-dom";
import "./Nav.css";
import { useAuth } from "../utils/auth";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import { logOutUser } from "../utils/api";
import { PiVanLight } from "react-icons/pi";

function Nav() {
  const { logout, setIsToken, setVerifyCode, userInfo, is2FaVerifed } =
    useAuth();
  const [toggle, setToggle] = useState(window.innerWidth < 700);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setToggle(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    logOutUser();
    setIsToken(null);
    setVerifyCode(null);
    logout();
    navigate("/sign-in");
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const links = is2FaVerifed
    ? [
        {
          link: "/",
          name: "Home",
        },
        {
          link: "/vans",
          name: "Vans",
        },
        {
          link: userInfo.role === "owner" ? "/host" : "/booking",
          name: "Profile",
        },
      ]
    : [
        {
          link: "/",
          name: "Home",
        },
        {
          link: "/sign-in",
          name: "Sign In",
        },
      ];

  const activeState = ({ isActive, isPending }) => {
    return {
      color: isPending ? "rgb(23 30 138)" : "black",
      backgroundColor: isActive ? "orange" : "",
      fontWeight: isActive ? "bold" : "",
      borderRadius: isActive ? "5px" : "",
      boxShadow: isActive ? "5px 5px 5px rgba(0,0,0,0.9)" : "",
    };
  };

  return (
    <nav>
      <div className="logo">
        <PiVanLight className="van-icon" />
        <NavLink to="/"> VanVibe Rentals</NavLink>
      </div>
      <div className="nav-links-container">
        {!toggle ? (
          <div className="nav-toggle">
            <MdClose className="toggle" onClick={handleToggle} />
            <div className="nav-links">
              {links.map((link, key) => (
                <NavLink key={key} to={link.link} style={activeState}>
                  {link.name}
                </NavLink>
              ))}
              <div className="nav-logout">
                {is2FaVerifed && (
                  <NavLink onClick={handleLogout} className="nav-button">
                    Logout
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="nav-toggle">
            <FiMenu className="toggle" onClick={handleToggle} />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
