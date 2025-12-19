
import React, { useState } from 'react';
import './Review.css'; 
import reviewImage from '../images/istockphoto-478751930-612x612.jpg'; 

const Review = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
  const response = await fetch('http://localhost:5001/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("✅ Thank you for your review! We appreciate your feedback.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus("❌ Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setStatus("❌ Server error. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="review-page">
      <div className="review-left">
        <img src={reviewImage} alt="Share Your Review" className="review-image" />
      </div>

      <div className="review-right">
        <header>
          <h1 className="review-title">Share Your Experience</h1>
        </header>

        <div className="review-box">
          <form onSubmit={handleSubmit} className="review-form">
            <label htmlFor="name">Your Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

            <label htmlFor="email">Your Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@example.com"
              required
            />

            <label htmlFor="message">Your Review:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Share your experience with us..."
              required
            />

            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>

          {status && <p className="status-message">{status}</p>}

          <footer className="review-info">
            <h2>Thank You for Visiting!</h2>
            <p><i className="fas fa-star"></i> Your feedback helps us improve and grow.</p>

            <h2>Stay Connected</h2>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Review;
