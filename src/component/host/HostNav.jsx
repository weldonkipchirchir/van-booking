import { NavLink } from "react-router-dom";
import './HostNav.css'
function HostNav() {
  const links = [
    {
      link: ".",
      name: "Dashboard",
    },
    {
      link: "reviews",
      name: "Reviews",
    },
    {
      link: "vans",
      name: "Vans",
    },
    {
      link: "income",
      name: "Income",
    },
    {
      link: "create",
      name: "create",
    },
    {
      link: "bookings",
      name: "bookings",
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
    <nav className="hostnav-container">
      <div className="hostnav-links">
        {links.map((link, key) => (
          <NavLink
            key={key}
            to={link.link}
            end
            style={ activeState }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default HostNav;
