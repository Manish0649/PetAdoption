import React, { useState, useEffect } from 'react';
import './Applications.css';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        if (!email) {
          throw new Error('User email not found in localStorage');
        }

        const response = await fetch(
          `http://localhost:5001/api/my-applications?email=${email}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }

        const data = await response.json();
        console.log("Fetched applications:", data); // ✅ Debugging
        setApplications(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div className="applications-container">Loading...</div>;
  if (error) return <div className="applications-container">Error: {error}</div>;

  return (
    <div className="applications-container">
      <h1>My Applications</h1>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="applications-grid">
          {applications.map((application, index) => {
            // ✅ Always camelCase (backend normalizeRow ke baad)
            const petDetails =
              typeof application.petDetails === "string"
                ? JSON.parse(application.petDetails)
                : application.petDetails || {};

            return (
              <div key={index} className="application-card">
                <h2>{petDetails.petName || 'Unknown Pet'}</h2>
                <div className="application-details">
                  <p><strong>Pet Type:</strong> {petDetails.petType || 'N/A'}</p>
                  <p><strong>Age:</strong> {petDetails.age || 'N/A'} years</p>
                  <p><strong>Location:</strong> {petDetails.area || 'N/A'}</p>
                  <p><strong>Your Email:</strong> {application.userEmail || 'N/A'}</p>
                  <p><strong>Your Phone:</strong> {application.userPhone || 'N/A'}</p>
                  <p><strong>Living Situation:</strong> {application.livingSituation || 'N/A'}</p>
                  <p><strong>Experience:</strong> {application.experience || 'N/A'}</p>
                  <p><strong>Other Pets:</strong> {application.otherPets || 'None'}</p>
                  <p><strong>Status:</strong> {application.status || 'Pending'}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Applications;
