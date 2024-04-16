import { useLocation } from "react-router-dom";
import './Pricing.css'
function Pricing() {
  const location = useLocation();
  const van = location.state && location.state.van;

  if (!van) {
    return <div>Van not found</div>;
  }

  return (
    <div className="container-price">
        <div >
          <p className="container-text">Price <b>${van.price}</b>/day</p>
        </div>
    </div>
  );
}

export default Pricing;
