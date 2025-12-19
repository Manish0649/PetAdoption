import React, { useState, useEffect } from "react";
import "./PendingApplications.css";

const PendingApplications = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPending = async () => {
      try {
  const res = await fetch("http://localhost:5001/api/pending");
        if (!res.ok) throw new Error("Failed to fetch pending applications");
        const data = await res.json();

        setApplications(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPending();
  }, []);

  // ✅ Approve application
  const handleApprove = async (id) => {
    try {
  const res = await fetch("http://localhost:5001/api/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        alert("Application approved!");
        setApplications(applications.filter((a) => a.id !== id));
      } else {
        alert("Failed to approve application.");
      }
    } catch (err) {
      alert("Error approving application.");
    }
  };

  // ✅ Reject application
  const handleReject = async (id) => {
    try {
  const res = await fetch("http://localhost:5001/api/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        alert("Application rejected!");
        setApplications(applications.filter((a) => a.id !== id));
      } else {
        alert("Failed to reject application.");
      }
    } catch (err) {
      alert("Error rejecting application.");
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="applications-container">
      <h1>Pending Adoption Applications</h1>
      {applications.length === 0 ? (
        <p>No pending applications</p>
      ) : (
        applications.map((app) => (
          <div key={app.id} className="application-card">
            <h2>{app.petDetails.petName}</h2>
            <p><strong>Pet Type:</strong> {app.petDetails.petType}</p>
            <p><strong>Pet Age:</strong> {app.petDetails.age} years</p>
            <p><strong>Location:</strong> {app.petDetails.area}</p>
            <p><strong>Pet Email:</strong> {app.petDetails.email}</p>
            <p><strong>Pet Phone:</strong> {app.petDetails.phone}</p>
            <p><strong>User Email:</strong> {app.userEmail}</p>
            <p><strong>User Phone:</strong> {app.userPhone}</p>
            <p><strong>Living Situation:</strong> {app.livingSituation}</p>
            <p><strong>Experience:</strong> {app.experience}</p>
            <p><strong>Other Pets:</strong> {app.otherPets}</p>
            <p><strong>Status:</strong> {app.status}</p>

            <button onClick={() => handleApprove(app.id)} className="approve-btn">Approve</button>
            <button onClick={() => handleReject(app.id)} className="reject-btn">Reject</button>
          </div>
        ))
      )}
    </div>
  );
};

export default PendingApplications;
