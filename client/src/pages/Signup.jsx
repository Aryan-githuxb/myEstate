import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert("Account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating account. Email might be taken.");
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '450px', padding: '30px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#2563eb' }}>Create Account</h2>
        
        <form onSubmit={handleSubmit}>
          <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Full Name</label>
          <input 
            name="name" 
            type="text"
            onChange={handleChange} 
            required 
          />

          <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Email Address</label>
          <input 
            name="email" 
            type="email"
            onChange={handleChange} 
            required 
          />

          <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Phone Number</label>
          <input 
            name="phone" 
            type="text"
            onChange={handleChange} 
            required 
          />

          <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Password</label>
          <input 
            name="password" 
            type="password" 
            onChange={handleChange} 
            required 
          />

          {error && (
            <div style={{ color: '#ef4444', marginBottom: '10px', fontSize: '14px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Sign Up
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
          Already have an account? <Link to="/login" style={{ color: '#2563eb', fontWeight: 'bold' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}