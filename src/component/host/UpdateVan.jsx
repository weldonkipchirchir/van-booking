import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateVan.css";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/utils";
import { useLocation } from "react-router-dom";

function UpdateVan() {
    const location = useLocation(); //object
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      name: "",
      price: "",
      description: "",
      imageUrl: "",
      type: "",
      hostId: "",
    });
    const [error, setError] = useState("");
  
    const van = location.state?.van || "";

    console.log(van)
  
    const handleChange = (value, name) => {
      // If the name is "price", parse the value as an integer
      const newValue = name === "price" ? parseInt(value, 10) : value;
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
  
      // Filter out fields with empty values
      const filteredFormData = Object.fromEntries(
        // eslint-disable-next-line no-unused-vars
        Object.entries(formData).filter(([key, value]) => value !== "")
      );
  
      // Submit data to backend
      console.log(filteredFormData);
      try {
        const token = getToken();
        const response = await fetch(
          `http://localhost:8080/api/v1/vans/vans/${van._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(filteredFormData),
          }
        );
  
        if (response.ok) {
          navigate("/vans");
        } else {
          setError("Van not updated, Try again!!!");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        // Reset form data after submission
        setFormData({
          name: "",
          price: "",
          description: "",
          imageUrl: "",
          type: "",
          hostId: "",
        });
      }
    }
  return (
    <div className="container-book">
      <h1>Update the van</h1>
      <form className="form-book" onSubmit={handleSubmit}>
        <label>
          <p>Name of the Van</p>
          <input
            type="text"
            name="Name"
            placeholder="Enter van's name"
            value={formData.name}
            onChange={(e) => handleChange(e.target.value, "name")}
          />
        </label>
        <label>
          <p>Price</p>
          <input
            type="text"
            name="price"
            placeholder="Enter price per day"
            value={formData.price}
            onChange={(e) => handleChange(e.target.value, "price")}
          />
        </label>
        <label>
          <p>Descrption</p>
          <input
            type="text"
            name="description"
            placeholder="Enter van's description"
            value={formData.description}
            onChange={(e) => handleChange(e.target.value, "description")}
          />
        </label>
        <label>
          <p>ImageUrl</p>
          <input
            type="text"
            name="imageUrl"
            placeholder="Enter van's imageUrl"
            value={formData.imageUrl}
            onChange={(e) => handleChange(e.target.value, "imageUrl")}
          />
        </label>
        <label>
          <p>Type</p>
          <input
            type="text"
            name="type"
            placeholder="Enter van's van's type"
            value={formData.type}
            onChange={(e) => handleChange(e.target.value, "type")}
          />
        </label>
        <label>
          <p>ID</p>
          <input
            type="text"
            name="hostId"
            placeholder="Enter your ID"
            value={formData.hostId}
            onChange={(e) => handleChange(e.target.value, "hostId")}
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

export default UpdateVan;
