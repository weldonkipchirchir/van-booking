import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateVan.css";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/utils";

function CreateVan() {
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

  const handleChange = (value, name) => {
    // If the name is "price", parse the value as an integer
    const newValue = name === "price" ? parseInt(value, 10) : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.price) {
      setError("Price is required");
      return false;
    }
    if (!formData.description.trim()) {
      setError("Description is required");
      return false;
    }
    if (!formData.imageUrl.trim()) {
      setError("ImageUrl is required");
      return false;
    }
    if (!formData.type.trim()) {
      setError("Type is required");
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
        `http://localhost:8080/api/v1/vans/vans`,
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
        navigate("/vans"); 
      } else {
       setError("Van not added, Try again!!!");
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
  };

  return (
    <div className="container-book">
      <form className="form-book" onSubmit={handleSubmit}>
      <h1>Add a van</h1>
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

export default CreateVan;
