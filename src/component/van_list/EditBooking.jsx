import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditBooking.css";
import { getToken } from "../../utils/utils";

function EditBooking() {
  const location = useLocation();
  const booking = location.state.booking;
  const [status, setStatus] = useState(booking.status);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(status);
    // Send a request to update the booking status
    try {
      const token = getToken();
      const response = await fetch(
        `http://localhost:8080/api/v1/booking/booking/${booking._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: status }),
        }
      );
      //check status
      if (response.ok) {
        navigate("/booking"); // Redirect to dashboard after successful update
      } else {
        console.error("Failed to update booking status");
      }

      if (response.ok) {
        navigate("/booking"); // Redirect to dashboard after successful update
      } else {
        console.error("Failed to update booking status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container-edit-booking">
      <div className="container-edit">
        <h2>Edit Booking</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Status:
            <select value={status} onChange={handleChange}>
              <option value="confirmed">Confirmed</option>
              <option value="finished">Finished</option>
            </select>
          </label>
          <button type="submit">Update Status</button>
        </form>
      </div>
    </div>
  );
}

export default EditBooking;
