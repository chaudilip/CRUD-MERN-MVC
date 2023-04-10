import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./css/insertData.css";
function InputData() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, address, phoneNo };
    const response = await fetch("/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);

    // Clear form fields
    setName("");
    setEmail("");
    setAddress("");
    setPhoneNo("");

    // Redirect to "/students/getAll"
    navigate("/students/getAll");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">Add Student</h1>
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          name="Name"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="Email">Email</label>
        <input
          type="email"
          name="Email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="Address">Address</label>
        <input
          type="text"
          name="Address"
          className="form-input"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label htmlFor="Phone">Phone</label>
        <input
          type="number"
          name="Phone"
          className="form-input"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />

        <button type="submit" name="submitBtn" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default InputData;
