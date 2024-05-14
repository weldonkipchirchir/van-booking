import { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import "./Reviews.css";
import { reviews } from "../../utils/api";

function Reviews() {
  const [reviewsData, setReviewsData] = useState([]);
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await reviews();
        const individualReviews = data.filter((item) => item.customerName);
        const averageRatingItem = data.find(
          (item) => item.averageRating !== undefined
        );

        setReviewsData(individualReviews);
        setAverageRating(
          averageRatingItem ? averageRatingItem.averageRating : null
        );
      } catch (error) {
        console.error("Error fetching reviews data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to calculate star color based on rating
  const getStarColor = (rating) => {
    if (rating >= 4) {
      return "gold"; // High rating, gold color
    } else if (rating >= 3) {
      return "orange"; // Medium rating, orange color
    } else {
      return "red"; // Low rating, red color
    }
  };

  // Function to calculate rating percentage
  const getRatingPercentage = (ratingCount, totalReviews) => {
    return (ratingCount / totalReviews) * 100;
  };

  // Function to calculate width based on rating
  const getProgressBarWidth = (rating) => {
    switch (rating) {
      case 5:
        return "80%";
      case 4:
        return "60%";
      case 3:
        return "40%";
      case 2:
        return "20%";
      case 1:
        return "10%";
      default:
        return "0%";
    }
  };

  return (
    <div className="container-reveiew">
      <div className="reviews-header">
        <h2>Your reviews</h2>
        <p>last 30 days</p>
      </div>
      <p className="reviews-total">
        <b>
          <p>{averageRating !== null ? averageRating : 0}</p>
          <IoIosStar
            className="star"
            style={{ color: getStarColor(averageRating) }}
          />
        </b>
        <span>Overall rating</span>
      </p>
      <div className="reviews">
        {[5, 4, 3, 2, 1].map((rating, index) => {
          const ratingCount = reviewsData.filter(
            (item) => item.rating === rating
          ).length;
          const percentage = getRatingPercentage(
            ratingCount,
            reviewsData.length
          );
          return (
            <div key={index}>
              <p>{rating} stars</p>

              <div
                className="reviews-p"
                style={{
                  backgroundColor:
                    rating === averageRating
                      ? "rgb(218, 102, 19)"
                      : "rgb(191, 196, 198)",
                  padding: "3px",
                  width: getProgressBarWidth(rating),
                  height: "2px",
                  border: "solid 2px black",
                  borderRadius: "3px",
                  zIndex: "3",
                }}
              ></div>
              <p>{percentage}%</p>
            </div>
          );
        })}
      </div>
      <div className="reviews-container">
        <h2 className="review-h2">Reviews ({reviewsData.length})</h2>
        <div>
          {reviewsData.length > 0 ? (
            reviewsData.map((item, index) => (
              <div className="review-item" key={index}>
                {/* Generate stars dynamically based on the user's rating */}
                {Array.from({ length: item.rating }).map((_, starIndex) => (
                  <IoIosStar
                    key={starIndex}
                    className="star"
                    style={{ color: getStarColor(item.rating) }}
                  />
                ))}
                <div className="reviews-single">
                  <b>{item.customerName}</b>
                </div>
                <p>{item.review}</p>
                <hr />
              </div>
            ))
          ) : (
            <h2> No reviews found</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
