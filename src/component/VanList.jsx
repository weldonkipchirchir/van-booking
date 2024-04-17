
import { useState, useEffect } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { getVans } from "../utils/api";
import "./VanList.css";

function VanList() {
  const [vans, setVans] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getVans();
        setVans(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredVans = vans && typeFilter
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
        {typeFilter ? (
          <button
            onClick={() => setSearchParams({})}
            style={!searchParams ? activeStyle : {}}
          >
            Clear filters
          </button>
        ) : null}
      </div>
      <div className="vans">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>There was an error: {error.message}</h1>
        ) : (
          <>
            {filteredVans && filteredVans.length > 0 ? (
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
                      state={{ van, search: `?${searchParams.toString()}` }}
                    >
                      View Details
                    </NavLink>
                  </div>
                ))}
              </>
            ) : (
              <h2>No vans found.</h2>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default VanList;
