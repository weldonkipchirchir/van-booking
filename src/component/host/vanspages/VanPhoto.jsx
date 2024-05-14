import { Link, Outlet, useLoaderData } from 'react-router-dom';
import './VanPhoto.css'
import { IoArrowBackSharp } from "react-icons/io5";
import { getHostVanId } from '../../../utils/api';
export  function loader({params}){
  return getHostVanId(params.vanId)
}

function VanPhoto() {
 
const van = useLoaderData();

  return (
    <> 
    <div className="container-vanphoto">
      <Link className='back' to='/host/vans'><IoArrowBackSharp className="arrow"/>Back to all vans</Link>
      <div >
        {van.map((van, index) => (
          <div key={index} className="inner-container">
            <img src={van.imageUrl} alt="a van" />
            <div className="van-photo-info">
                <button>{van.type}</button>
                <h2 >{van.name}</h2>
                <p><b>${van.price}</b>/day</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Outlet/>
    </>
  );
}

export default VanPhoto;

