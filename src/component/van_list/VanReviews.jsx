import { useState } from "react";
import "./VanReviews.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../../utils/utils";
function VanReviews() {
  const [formData, setFormData] = useState({
    comment: "",
    rating: 0,
  });
  const [error, setError] = useState("");
  const location = useLocation();
  const booking = location.state.booking;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStarClick = (rating) => {
    setFormData({
      ...formData,
      rating: parseInt(rating), // Convert rating to integer
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log(formData);
    // Validate form fields
    if (!formData.comment.trim() || formData.rating === 0) {
      setError("Please provide both a comment and a rating.");
      return;
    }

    // Submit review to backend
    try {
      const token = getToken();
      await fetch(
        `http://localhost:8080/api/v1/booking/booking/${booking._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      // Clear form data after successful submission
      setFormData({
        comment: "",
        rating: 0,
      });
      navigate("/bookings");
      // Optionally, you can update the bookings data to reflect the new review
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Failed to submit review. Please try again later.");
    }
  };

  return (
    <main className="review-container">
      <form className="review-form" onSubmit={handleSubmit}>
        <label>
          Comment:
          <input
            type="text"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          />
        </label>
        <label>
          Rating:
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= formData.rating ? "star active" : "star"}
                onClick={() => handleStarClick(star)}
              >
                &#9733;
              </span>
            ))}
          </div>
        </label>
        <button type="submit">Submit Review</button>
        {error && <p className="error">{error}</p>}
      </form>
    </main>
  );
}

export default VanReviews;
