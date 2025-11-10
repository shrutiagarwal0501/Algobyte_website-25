import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast';

const Header = ({ setMenuOpen, menuOpen }) => {
  return (
    <>
      <nav>
        <NavContent setMenuOpen={setMenuOpen} />
      </nav>

      <button className="navBtn" onClick={() => setMenuOpen(!menuOpen)}>
        <AiOutlineMenu />
      </button>
    </>
  );
};

export const HeaderPhone = ({ menuOpen, setMenuOpen }) => {
  return (
    <div className={`navPhone ${menuOpen ? "navPhoneComes" : ""}`}>
      <NavContent setMenuOpen={setMenuOpen} />
    </div>
  );
};

const NavContent = ({ setMenuOpen }) => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <>
      <h2>Algobyte</h2>
      <div>
        <a 
          onClick={() => setMenuOpen(false)} 
          href="#home"
        >
          Home
        </a>
        
        {/* Services - Now PUBLIC (no auth needed) */}
        <a 
          onClick={() => setMenuOpen(false)} 
          href="#services"
        >
          Services
        </a>

        {/* Events - Now PUBLIC (no auth needed) */}
        <a 
          onClick={() => setMenuOpen(false)} 
          href="#work"
        >
          Events
        </a>

        <a 
          onClick={() => setMenuOpen(false)} 
          href="#testimonial"
        >
          Team
        </a>

        <a 
          onClick={() => setMenuOpen(false)} 
          href="#contact"
        >
          Contact
        </a>
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {isAuthenticated() ? (
          <>
            <span style={{ fontSize: "14px", color: "#666", fontWeight: "500" }}>
              Hi, {user?.name}!
            </span>
            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="mailto:algobyte@banasthali.in">
              <button>Email</button>
            </a>
            <Link to="/signin" onClick={() => setMenuOpen(false)}>
              <button>Sign In</button>
            </Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>
              <button>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Header;