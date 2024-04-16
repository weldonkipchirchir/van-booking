import { useLocation } from "react-router-dom";
import './Photo.css'
function Photos() {
  const location = useLocation();
  const van = location.state && location.state.van;

  if (!van) {
    return <div>Van not found</div>;
  }

  return (
    <div className="container-photos">
        <div >
         <img src={van.imageUrl} alt="" />
        </div>
    </div>
  ); 
}

export default Photos;
