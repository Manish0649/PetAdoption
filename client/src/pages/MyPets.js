import React, { useEffect, useState } from "react";
import "./Pets.css";

const MyPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        if (!userEmail) {
          setError("Please log in to view your pets");
          setLoading(false);
          return;
        }

  const response = await fetch("http://localhost:5001/api/pets?all=true");
        const data = await response.json();
        console.log("User email from localStorage:", userEmail);
        console.log("All pets data:", data);
        
        // Normalize the user's email for comparison
        const normalizedUserEmail = userEmail.trim().toLowerCase();
        
        // Filter pets posted by the current user (case-insensitive)
        const userPets = data.filter((pet) => {
          const normalizedPetEmail = (pet.email || "").trim().toLowerCase();
          console.log(`Comparing pet email: ${normalizedPetEmail} with user email: ${normalizedUserEmail}`);
          return normalizedPetEmail === normalizedUserEmail;
        });
        
        console.log("Filtered user pets:", userPets);
        setPets(userPets);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching pets:", err);
        setError("Failed to fetch pets");
        setLoading(false);
      }
    };

    fetchPets();
  }, [userEmail]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (pets.length === 0) return <div className="no-pets">You haven't posted any pets yet.</div>;

  return (
    <div className="pets-container">
      <h1>My Posted Pets</h1>
      <div className="pets-grid">
        {pets.map((pet) => (
          <div key={`${pet.petName}-${pet.petType}-${pet.age}-${pet.area}`} className="pet-card">
            <h2>{pet.petName}</h2>
            <p>Type: {pet.petType}</p>
            <p>Age: {pet.age} years</p>
            <p>Area: {pet.area}</p>
            <p>Status: {pet.status || "Available"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPets;