import { useLoaderData } from "react-router-dom";
import "../van_list/Booking.css";
import { getHostBookings } from "../../utils/api";
export function loader() {
  return getHostBookings();
  // return getHostVans();
}

function HostBookings() {
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
                  <h2>Booking</h2>

                  <p>
                    Start Date:{" "}
                    <em>{new Date(booking.startDate).toLocaleDateString()}</em>
                  </p>
                  <p>
                    End Date: <em>{new Date(booking.endDate).toLocaleDateString()}</em>
                  </p>
                  <p>Status: <em>{booking.status}</em></p>
                  <p>Total Amount: <em>${booking.totalAmount}</em></p>
                  <p>Payment Status: <em>{booking.paymentStatus}</em></p>
                  <p>Payment Method: <em>{booking.paymentMethod}</em></p>
                  <p>
                    Payment Date:{" "}
                    <em>{new Date(booking.paymentDate).toLocaleString()}</em>
                  </p>
                  <p>Rating: <em>{booking.rating}</em></p>
                  <p>Comment: <em>{booking.comment}</em></p>
                  <p>CustomerID: <em>{booking.customerId}</em></p>
                  <p>VanID: <em>{booking.vanId}</em></p>
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
export default HostBookings;
