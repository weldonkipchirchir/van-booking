import { NavLink, useLoaderData } from "react-router-dom";
import "./Booking.css";
import { getUsersBookings } from "../../utils/api";

export function loader() {
  return getUsersBookings();
  // return getHostVans();
}

function Booking() {
  const bookings = useLoaderData();
  return (
    <main className="container-booking">
      {bookings ? (
        <>
          <div className="booking-van-head">
            <h2>Your Bookings</h2>
          </div>
          <div className="booking-van">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-van-single">
                <div className="booking-details">
                  <h2>
                    Booking
                  </h2>
                 
                  <p>
                    Start Date:{" "}
                    {new Date(booking.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    End Date: {new Date(booking.endDate).toLocaleDateString()}
                  </p>
                  <p>Status: {booking.status}</p>
                  <p>Total Amount: ${booking.totalAmount}</p>
                  <p>Payment Status: {booking.paymentStatus}</p>
                  <p>Payment Method: {booking.paymentMethod}</p>
                  <p>Rating: {booking.rating}</p>
                  <p>Comment: {booking.comment}</p>
                  <p>
                    Payment Date:{" "}
                    {new Date(booking.paymentDate).toLocaleString()}
                  </p>
                  {/* Add more details as needed */}
                </div>
                {/* Link to edit page */}
                <div className="edit-container">
                <NavLink
                  to={`/edit-booking/${booking._id}`}
                  state={{ booking }}
                  className="edit"
                >
                  Edit
                </NavLink>
                <NavLink to={`/reviews`} state={{ booking }} className="edit">
                  Review
                </NavLink>
              </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No Bookings</p>
      )}
    </main>
  );
}
export default Booking;
