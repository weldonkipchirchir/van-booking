import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./VanList.css";

function VanList() {
  const [vans, setVans] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/vans");
        const data = await response.json();
        setVans(data.vans);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  const filteredVans = selectedType
    ? vans.filter((van) => van.type === selectedType)
    : vans;

  const activeStyle = {
    color: "rgb(253 230 138)",
    backgroundColor: "rgb(69 26 3)",
    fontWeight: "bold",
    borderRadius: "5px",
    boxShadow: "5px 5px 5px rgba(0,0,0,0.9)",
  };

  return (
    <div className="container">
      <h1>Explore our van options</h1>
      <div className="filters">
        <NavLink
          to="/vans/vans-list"
          style={selectedType === "simple" ? activeStyle : {}}
          onClick={() => handleTypeClick("simple")}
        >
          Simple
        </NavLink>
        <NavLink
          to="/vans/vans-list"
          style={selectedType === "luxury" ? activeStyle : {}}
          onClick={() => handleTypeClick("luxury")}
        >
          Luxury
        </NavLink>
        <NavLink
          to="/vans/vans-list"
          style={selectedType === "rugged" ? activeStyle : {}}
          onClick={() => handleTypeClick("rugged")}
        >
          Rugged
        </NavLink>
        <NavLink
          to="/vans/vans-list"
          style={!selectedType ? activeStyle : {}}
          onClick={() => setSelectedType(null)}
        >
          Clear filters
        </NavLink>
      </div>
      <div className="vans">
        {vans.length > 0 ? (
          <>
            {filteredVans.map((van) => (
              <div key={van.id} className="van-list-item">
                <img src={van.imageUrl} alt={van.name} className="van-image" />
                <div className="van-info">
                  <h2>{van.name}</h2>
                  <p className="p2">
                    <span>
                      <i>${van.price}</i>/day
                    </span>
                  </p>
                </div>
                <NavLink
                  className="details"
                  to={`/vans/vans-list/${van.id}`}
                  state={{ van }}
                >
                  View Details
                </NavLink>
              </div>
            ))}
          </>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
}

export default VanList;
