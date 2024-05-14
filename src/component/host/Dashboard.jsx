import "./Dashboard.css";
import { NavLink, useLoaderData } from "react-router-dom";
import { income } from "../../utils/api";
import { useState, useEffect } from "react";
import { getToken } from "../../utils/utils";

function Dashboard() {
  const vans = useLoaderData();
  const [totalIncome, setTotalIncome] = useState(null);

  useEffect(() => {
    async function fetchIncomeData() {
      try {
        const data = await income();
        setTotalIncome(data.totalIncome); // Update totalIncome with data.totalIncome
      } catch (err) {
        console.error(err);
        setTotalIncome(0);
      }
    }
    fetchIncomeData();
  }, []);

  async function handleDelete(id) {
    try {
      const token = getToken();
      await fetch(`http://localhost:8080/api/v1/vans/vans/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <main className="container-dashboard">
      {vans ? (
        <>
          <div className="containner-inner">
            <h2>Welcome!</h2>
            <div className="container-innner-innner">
              <p>
                Income in the <span>last 30 days</span>
              </p>
            </div>
            <h3>{totalIncome !== null ? `$${totalIncome}` : "Loading..."}</h3>{" "}
            {/* Render totalIncome or "Loading..." */}
          </div>
          <div>
            <div className="dashbaord-van-head">
              <h2>Your listed vans</h2>
            </div>
            <div className="dashbaord-van">
              {vans.map((van) => (
                <div key={van._id} className="dashbaord-van-single">
                  <div className="dashboard-image-container">
                    <img
                      src={van.imageUrl}
                      alt=""
                      className="dashboard-image"
                    />
                    <div className="dashboard-details">
                      <h2>{van.name}</h2>
                      <p>
                        <b>${van.price}</b>/day
                      </p>
                    </div>
                  </div>
                  <div className="edit-button">
                  {/* Attach handleDelete to onClick event */}
                  <button onClick={() => handleDelete(van._id)} className="delete-button">Delete</button>
                  <NavLink to={"/host/update"} state={{ van }} className="edit">
                    Edit
                  </NavLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <h1>No Vans Found</h1>
      )}
    </main>
  );
}

export default Dashboard;
