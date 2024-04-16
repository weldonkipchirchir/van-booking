import { IoIosStar } from "react-icons/io";
import "./Reviews.css";
function Reviews() {
  return (
    <div className="container-reveiew">
      <div className=" reviews-header">
        <h2>Your reviews</h2>
        <p>last 30days</p>
      </div>
      <p className="reviews-total">
        <b>
          5.0
          <IoIosStar className="star" />
        </b>
        <span>overall rating</span>
      </p>
      <div className="reviews">
        <div>
          <p>5 stars</p>
          <p className="reviews-f"></p>
          <p>100%</p>
        </div>
        <div>
          <p>4 stars</p>
          <p className="reviews-p"></p>
          <p>0%</p>
        </div>
        <div>
          <p>3 stars</p>
          <p className="reviews-p"></p>
          <p>0%</p>
        </div>
        <div>
          <p>2 stars</p>
          <p className="reviews-p"></p>
          <p>0%</p>
        </div>
        <div>
          <p>1 stars</p>
          <p className="reviews-p"></p>
          <p>0%</p>
        </div>
      </div>
      <h2 className="review-h2">Reviews (2)</h2>
      <div>
        <p>
          <IoIosStar className="star" />
          <IoIosStar className="star" />
          <IoIosStar className="star" />
          <IoIosStar className="star" />
          <IoIosStar className="star" />
        </p>
        <div className="reviews-single">
          <b>Elliot</b>
          <p className="reviews-text">December 23, 2022 </p>
        </div>
        <p>
          The beach bum is such as awesome van! Such as comfortable trip. We had
          it for 2 weeks and there was not a single issue. Super clean when we
          picked it up and the host is very comfortable and understanding.
          Highly recommend!
        </p>
      </div>
      <hr />
      <div className="reviews-single-review">
        <p>
          <IoIosStar className="star" />
          <IoIosStar className="star" />
          <IoIosStar className="star" />
          <IoIosStar className="star" />
          <IoIosStar className="star" />
        </p>
        <div className="reviews-single">
          <b>Doe</b>
          <p className="reviews-text">December 2, 2023 </p>
        </div>
        <p>
          This is our third time using the Modest Explorer for our travels and
          we love it! No complaints, absolutely perfect!
        </p>
      <hr />
      </div>
    </div>
  );
}

export default Reviews;
