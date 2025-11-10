import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // Validate passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Immediately redirect without showing success message
        navigate('/signin');
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Error resetting password. Please try again.");
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
        <h2 style={{ 
          textAlign: "center", 
          marginBottom: "10px",
          color: "#333"
        }}>
          Reset Password
        </h2>
        <p style={{ 
          textAlign: "center", 
          color: "#666",
          marginBottom: "30px"
        }}>
          Enter your new password
        </p>

        <form onSubmit={handleResetPassword}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "5px",
              color: "#333",
              fontWeight: "500"
            }}>
              New Password
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

          <div style={{ marginBottom: "25px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "5px",
              color: "#333",
              fontWeight: "500"
            }}>
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

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

        <p style={{ marginTop: "20px", textAlign: "center" }}>
          Remember your password? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;