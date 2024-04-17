/* eslint-disable react/prop-types */
// VanDetails.js
import { IoArrowBackSharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import "./VanDetails.css";
import { Link } from "react-router-dom";
function VanDetails() {
  const location = useLocation(); //object
  const { van } = location.state;
  const search = location.state?.search || " ";
  if (!van) {
    return <div>Van not found</div>;
  }

  return (
    <div className="container">
      <Link className="back" to={`/vans/vans-list${search}`}>
        <IoArrowBackSharp className="arrow" />
        {search === "?" ? ` Back to all vans` : `Back to ${van.type}`}
      </Link>
      <img src={van.imageUrl} alt={van.name} />
      <button className="b1">{van.type}</button>
      <h1>{van.name}</h1>
      <p>
        <b>${van.price}</b>/day
      </p>
      <p>{van.description}</p>
      <div className="rent">
        <button>Rent this Van</button>
      </div>
    </div>
  );
}

export default VanDetails;
