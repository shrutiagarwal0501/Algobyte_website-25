import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token, data.user);
        // Immediately redirect without showing success message
        navigate('/');
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f5f5f5",
      padding: "20px"
    }}>
      <div style={{ 
        maxWidth: "450px", 
        width: "100%",
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "10px", color: "#333" }}>
          Create Account
        </h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "30px" }}>
          Join Algobyte Community
        </p>

        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "500" }}>
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ 
                width: "100%", 
                padding: "12px", 
                borderRadius: "5px",
                border: "1px solid #ddd",
                fontSize: "15px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "500" }}>
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ 
                width: "100%", 
                padding: "12px", 
                borderRadius: "5px",
                border: "1px solid #ddd",
                fontSize: "15px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "500" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              style={{ 
                width: "100%", 
                padding: "12px", 
                borderRadius: "5px",
                border: "1px solid #ddd",
                fontSize: "15px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "500"
            }}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p style={{ marginTop: "20px", textAlign: "center" }}>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>

        {message && (
          <p style={{ 
            marginTop: "15px", 
            padding: "10px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            borderRadius: "5px",
            textAlign: "center"
          }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;