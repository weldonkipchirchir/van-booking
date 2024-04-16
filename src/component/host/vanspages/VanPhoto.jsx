import { useEffect, useState } from "react"
import { useParams, Link } from 'react-router-dom';
import './VanPhoto.css'
import { IoArrowBackSharp } from "react-icons/io5";

function VanPhoto() {
  const { vanId } = useParams();
  const [van, setVan] = useState([])

  useEffect(() => {
    fetch(`/api/host/vans/${vanId}`)
    .then(res => res.json())
    .then(data => {
      setVan(data.vans);
    })
  }, [vanId]);
  
  return (
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
  );
}

export default VanPhoto;

