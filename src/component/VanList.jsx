import { useState, useEffect } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

import "./VanList.css";

function VanList() {
  const [vans, setVans] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
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

  const filteredVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
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
        <button
          onClick={() => setSearchParams({ type: "simple" })}
          style={searchParams === "simple" ? activeStyle : {}}
        >
          Simple
        </button>
        <button
          onClick={() => setSearchParams({ type: "luxury" })}
          style={searchParams === "luxury" ? activeStyle : {}}
        >
          Luxury
        </button>
        <button
          onClick={() => setSearchParams({ type: "rugged" })}
          style={searchParams === "rugged" ? activeStyle : {}}
        >
          Rugged
        </button>
        {typeFilter? (
          <button
            onClick={() => setSearchParams({})}
            style={!searchParams ? activeStyle : {}}
          >
            Clear filters
          </button>
        ): null}
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
                  to={van.id}
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
