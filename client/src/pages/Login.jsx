import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });
      
      // Update global context
      login(res.data);
      
      // Redirect to Home
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '30px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#2563eb' }}>Welcome Back</h2>
        
        <form onSubmit={handleSubmit}>
          <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Email Address</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />

          <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Password</label>
          <input 
            type="password" 
            placeholder="Enter your password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />

          {error && (
            <div style={{ color: '#ef4444', marginBottom: '10px', fontSize: '14px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Login
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#2563eb', fontWeight: 'bold' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}