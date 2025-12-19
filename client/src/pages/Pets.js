import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Pets.css";

const Pets = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5001/api/pets")
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error("Error fetching pets:", error));
  }, []);

  return (
    <div className="pets-container">
      <h1 className="pets-heading">Available for Adoption</h1>
      <div className="pets-grid">
        {pets.map((pet, index) => (
          <div key={index} className="pet-card">
            <h2 className="pet-name">{pet.petName || "Unknown Pet"}</h2>
            <p><strong>Age:</strong> {pet.age || "N/A"} years</p>
            <p><strong>Location:</strong> {pet.area || "N/A"}</p>
            <p><strong>Type:</strong> {pet.petType || "Other"}</p> {/* ✅ fallback */}
            <p><strong>Contact:</strong> {pet.email} | {pet.phone}</p>

            <p>
              <strong>Status:</strong>{" "}
              {pet.status === "adopted" ? "Adopted ✅" : "Available 🐾"}
            </p>

            {pet.status !== "adopted" && (
              <Link
                to={`/adoption-application?petId=${pet.id}&petName=${pet.petName}&age=${pet.age}&area=${pet.area}&petType=${pet.petType}&email=${pet.email}&phone=${pet.phone}`}
              >
                <button className="show-interest-btn">Show Interest</button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pets;
