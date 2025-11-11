import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

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
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  
  const handleNavigation = (sectionId, e) => {
    e.preventDefault(); 
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <h2>Algobyte</h2>
      <div>
        <a href="#home" onClick={(e) => handleNavigation("home", e)}>
          Home
        </a>

        <a href="#services" onClick={(e) => handleNavigation("services", e)}>
          Services
        </a>

        <a href="#work" onClick={(e) => handleNavigation("work", e)}>
          Events
        </a>

        <a
          href="#testimonial"
          onClick={(e) => handleNavigation("testimonial", e)}
        >
          Team
        </a>

        <a href="#contact" onClick={(e) => handleNavigation("contact", e)}>
          Contact
        </a>
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {isAuthenticated() ? (
          <>
            <span style={{ fontSize: "14px", color: "#666", fontWeight: "500" }}>
              Hi, {user?.name}!
            </span>
            <button onClick={handleLogout}>Logout</button>
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
