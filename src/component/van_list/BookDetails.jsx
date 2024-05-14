import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BookDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../../utils/utils";

function BookDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const van = location.state?.van || " ";

  const [formData, setFormData] = useState({
    startDate: null,
    endDate: null,
    phoneNumber: "",
    email: "",
    name: "",
    location: "",
    vanId: van._id || "",
    totalAmount: van.price || 0,
    ownerId: van.ownerId || "",
  });
  const [error, setError] = useState("");

  const handleChange = (date, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  const validateForm = () => {
    if (formData.startDate <= new Date()) {
      setError("Start date cannot be before the current date");
      return false;
    }
    if (formData.endDate <= formData.startDate) {
      setError("End date must be greater than the start date");
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!/^\d{10}$/g.test(formData.phoneNumber)) {
      setError("Invalid phone number format");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Invalid email address format");
      return false;
    }
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.location.trim()) {
      setError("Location is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    // Submit data to backend
    console.log(formData);
    try {
      const token = getToken();
      const response = await fetch(
        `http://localhost:8080/api/v1/booking/booking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        navigate("/booking"); // Redirect to dashboard after successful update
      } else {
        console.error("Failed to update booking status");
       setError("Van not available");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Reset form data after submission
      setFormData({
        startDate: null,
        endDate: null,
        phoneNumber: "",
        email: "",
        name: "",
        location: "",
        vanId: van._id || "",
        price: van.price || 0,
        ownerId: van.ownerId || "",
      });
    }
  };

  return (
    <div className="container-book">
      <h1>Book a van</h1>
      <form className="form-book" onSubmit={handleSubmit}>
        <label>
          <p>Start Date</p>
          <DatePicker
            selected={formData.startDate}
            onChange={(date) => handleChange(date, "startDate")}
            minDate={new Date()}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select start date"
          />
        </label>
        <label>
          <p>End Date</p>
          <DatePicker
            selected={formData.endDate}
            onChange={(date) => handleChange(date, "endDate")}
            minDate={formData.startDate || new Date()}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select end date"
          />
        </label>
        <label>
          <p>Phone Number</p>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter phone number"
            value={formData.phoneNumber}
            onChange={(e) => handleChange(e.target.value, "phoneNumber")}
          />
        </label>
        <label>
          <p>Email</p>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={(e) => handleChange(e.target.value, "email")}
          />
        </label>
        <label>
          <p>Name</p>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => handleChange(e.target.value, "name")}
          />
        </label>
        <label>
          <p>Location</p>
          <input
            type="text"
            name="location"
            placeholder="Enter your location"
            value={formData.location}
            onChange={(e) => handleChange(e.target.value, "location")}
          />
        </label>
        <button className="button-book" type="submit">
          Submit
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default BookDetails;
