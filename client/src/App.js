import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Review from "./pages/Review";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Pets from "./pages/Pets";
import ContactUs from "./pages/ContactUs";
import PostPet from "./pages/PostPet";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdoptionApplication from "./pages/AdoptionApplication";
import AdminDashboard from "./pages/AdminDashboard";
import AdminContactMessages from "./pages/AdminContactMessages";
import PendingApplications from "./pages/PendingApplications";
import Applications from "./pages/Applications";
import MyPets from "./pages/MyPets";
import "./App.css";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/review" element={<Review />} />
        <Route path="/admin-contact-us" element={<AdminContactMessages />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/post-pet" element={<PostPet />} />
        <Route path="/adoption-application" element={<AdoptionApplication />} /> 
        <Route path="/pending-applications" element={<PendingApplications />} />
        <Route path="/my-applications" element={<Applications />} />
        <Route path="/my-pets" element={<MyPets />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
