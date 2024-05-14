import { NavLink, useLoaderData } from "react-router-dom";
import "./Vans.css";
import { getHostVans2 } from "../../utils/api";
export function loader() {
  return getHostVans2();
  // return getHostVans();
}
function Vans() {
  const vans = useLoaderData();

  return (
    <section className="container-vans">
      {vans ? (
        <>
          <h2 className="host-vans-title">Your listed vans</h2>
          <div className="host-vans-list">
            {vans.length > 0 ? (
              <section>
                {vans.map((van) => (
                  <NavLink
                    to={`/vans/vans-list/${van._id}`}
                    state={{ van }}
                    key={van.id}
                    className="host-van-link-wrapper"
                  >
                    <div className="host-van-single" key={van.id}>
                      <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                      <div className="host-van-info">
                        <h3>{van.name}</h3>
                        <p>${van.price}/day</p>
                      </div>
                    </div>
                  </NavLink>
                ))}
              </section>
            ) : (
              <h2>Loading...</h2>
            )}
          </div>
        </>
      ) : (
        <h1>No Vans Found</h1>
      )}
    </section>
  );
}

export default Vans;
