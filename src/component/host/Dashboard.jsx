import { IoIosStar } from "react-icons/io";
import { useState, useEffect } from "react";
import "./Dashboard.css";
function Dashboard() {
  const [vans, setVans] = useState([]);

  useEffect(() => {
    fetch("/api/host/vans")
      .then((res) => res.json())
      .then((data) => setVans(data.vans))
      .catch((error) => console.error("Error fetching vans:", error));
  }, []);

  return (
    <main className="container-dashboard">
      <div className="containner-inner"> 
        <h2>Welcome!</h2>
        <div className="container-innner-innner">
          <p>
            Income in the <span>last 30 days</span>
          </p>
          <p className="details">Details</p>
        </div>
        <h3>$2,260</h3>
      </div>
      <div className="dashbaord-van-score">
        <div className="dashbaord-van-score-inner">
          <b>Review Score</b>
          <p>
            <IoIosStar className="star" /> <b>5.0</b>/5
          </p>
        </div>
        <p className="details">Details</p>
      </div>
      <div>
      <div className="dashbaord-van-head">
        <h2>Your listed vans</h2>
        <p className="edit">View All</p>
      </div>
        <div className="dashbaord-van">
          {vans.map((van) => (
            <div key={van.id} className="dashbaord-van-single">
            <div className="dashboard-container">
              <div className="dashboard-image-container">
                <img src={van.imageUrl} alt="" className="dashboard-image" />
                <div>
                  <h1>{van.name}</h1>
                  <p><b>${van.price}</b>/day</p>
                </div>
              </div>
              <p className="edit">Edit</p>
            </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
