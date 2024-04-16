import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import './Nav.css'
function Nav() {
  const { vanId } = useParams();
  const location = useLocation();
  const van = location.state && location.state.van;


  const activeState = ({ isActive, isPending }) => {
    return {
      color: isPending ? "rgb(23 30 138)" : "black",
      backgroundColor: isActive ? "rgb(289 126 34)" : "",
      fontWeight: isActive ? "bold" : "",
      borderRadius: isActive ? "5px" : "",
      boxShadow: isActive ? "5px 5px 5px rgba(0,0,0,0.9)" : "",
    };
  };

  const links = [
    {
      link: `/host/vans/${vanId}`,
      name: "Details", 
    },
    {
      link: `/host/vans/${vanId}/pricing`,
      name: "Pricing",
    },
    {
      link: `/host/vans/${vanId}/photos`,
      name: "Photos",
    },
  ];

  return (
    <nav className="container-nav">
      {van && (
        <div className="nav-container" key={van.id}>
          {links.map((link, key) => (
            <NavLink
              key={key}
              to={link.link}
              className="nav-container-link"
              end
              state={{ van }}
              style={activeState}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Nav;
