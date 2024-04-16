import { NavLink } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const links = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/vans",
      name: "Vans",
    },
    {
      link: "/host",
      name: "Host",
    },
  ];

  const activeState = ({ isActive, isPending }) => {
    return {
      color: isPending ? "rgb(23 30 138)" : "black",
      backgroundColor: isActive ? "rgb(289 126 34)" : "",
      fontWeight: isActive ? "bold" : "",
      borderRadius: isActive ? "5px" : "",
      boxShadow: isActive ? "5px 5px 5px rgba(0,0,0,0.9)" : "",
    };
  };

  return (
    <nav>
      <div className="logo">
        <NavLink to="/">#VANLIFE</NavLink>
      </div>
      <div className="nav-links">
        {links.map((link, key) => (
          <NavLink
            key={key}
            to={link.link}
            style={ activeState }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Nav;
