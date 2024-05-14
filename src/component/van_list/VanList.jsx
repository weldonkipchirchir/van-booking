import {
  NavLink,
  useLoaderData,
  useSearchParams,
  defer,
  Await,
} from "react-router-dom";
import {  getVans1 } from "../../utils/api";
import "./VanList.css";
// import { useAuth } from "../utils/auth";
import { Suspense } from "react";
export function loader() {
  return defer({ vans: getVans1() });
}

function VanList() {
  // const [vans, setVans] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  
  const vansPromise = useLoaderData();
  // const { userInfo } = useAuth();
  
  function renderVanElements(vans) {
    const filteredVans =
    vans && typeFilter ? vans.filter((van) => van.type === typeFilter) : vans;

    const activeStyle = {
      color: "rgb(253 230 138)",
      backgroundColor: "rgb(69 26 3)",
      fontWeight: "bold",
      borderRadius: "5px",
      boxShadow: "5px 5px 5px rgba(0,0,0,0.9)",
    };

    return (
      <><div>
        <div className="filters">
          <button
            onClick={() => setSearchParams({ type: "simple" })}
            style={typeFilter === "simple" ? activeStyle : {}}
          >
            Simple
          </button>
          <button
            onClick={() => setSearchParams({ type: "luxury" })}
            style={typeFilter === "luxury" ? activeStyle : {}}
          >
            Luxury
          </button>
          <button
            onClick={() => setSearchParams({ type: "rugged" })}
            style={typeFilter === "rugged" ? activeStyle : {}}
          >
            Rugged
          </button>
          {typeFilter ? (
            <button
              onClick={() => setSearchParams({})}
              style={!typeFilter ? activeStyle : {}}
            >
              Clear
            </button>
          ) : null}
        </div>
        </div>
        <div className="vans">
          <div className="van-container">
            {filteredVans && filteredVans.length > 0 ? (
              <>
                {filteredVans.map((van) => (
                  <div key={van._id} className="van-list-item">
                    <img
                      src={van.imageUrl}
                      alt={van.name}
                      className="van-image"
                    />
                    <div className="van-info">
                      <h2>{van.name}</h2>
                      <p className="p2">
                        <span>
                        <b>Price:</b>
                          <i> ${van.price}</i>/day
                        </span>
                      </p>
                    </div>
                    <NavLink
                      className="details"
                      to={van._id}
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
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="container">
      {/* <h1>Explore our van options {userInfo.user.name}</h1> */}
      <Suspense fallback={<h1>Loading...</h1>}>
        <Await resolve={vansPromise.vans}>{renderVanElements}</Await>
      </Suspense>
    </div>
  );
}

export default VanList;
