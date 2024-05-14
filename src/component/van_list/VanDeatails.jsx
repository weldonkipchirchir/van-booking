/* eslint-disable react/prop-types */
// VanDetails.js
import { IoArrowBackSharp } from "react-icons/io5";
import { useLoaderData, useLocation, defer, Await } from "react-router-dom";
import "./VanDetails.css";
import { NavLink, Link } from "react-router-dom";
import { getVanListVanId1 } from "../../utils/api";
import { Suspense } from "react";
export function loader({ params }) {
  return defer({ van: getVanListVanId1(params.id) });
}
function VanDetails() {
  const location = useLocation(); //object
  const vanPromise = useLoaderData();

  const search = location.state?.search || " ";

  function renderElements(van) {
    console.log(van);
    if (!van) {
      return <div>Van not found</div>;
    }
    return (
      <>
        <Link className="back" to={`/vans/vans-list${search}`}>
          <IoArrowBackSharp className="arrow" />
          {search === "?" ? ` Back to all vans` : `Back to ${van.type}`}
        </Link>
        <div className="van-details-img">
          <img src={van.imageUrl} alt={van.name} />
        </div>
        <button className="b1">{van.type}</button>
        <h2>{van.name}</h2>
        <p>
          <b>
            <b>Price</b> ${van.price}
          </b>
          /day
        </p>
        <p>{van.description}</p>
        <NavLink
          className="rent"
          state={{ van }}
          to="/vans/vans-list/book-details"
        >
          Rent this Van
        </NavLink>
      </>
    );
  }

  return (
    <div className="container">
      <Suspense fallback={<h1>Loading...</h1>}>
        <Await resolve={vanPromise.van}>{renderElements}</Await>
      </Suspense>
    </div>
  );
}

export default VanDetails;
