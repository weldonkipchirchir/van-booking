import { useLocation } from "react-router-dom";
import './VanDetail.css';

function VanDetail() {
  const location = useLocation();
  const van = location.state && location.state.van;
  if (!van) {
    return <div>Van not found</div>;
  }


  return (
    <div className="container-vandetail">
        <div>
          <h3>{van.name}</h3>
          <p><b>${van.price}</b>/day</p>
          <p>{van.description}</p>
        </div>
    </div>
  );
}

export default VanDetail;
