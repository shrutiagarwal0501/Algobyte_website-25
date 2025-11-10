import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header, { HeaderPhone } from "./components/Header";
import Home from "./components/Home";
import Work from "./components/Work";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Services from "./components/Services";
import Testimonial from "./components/Testimonial";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import './global.scss';
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ratio, setRatio] = useState(window.innerWidth / window.innerHeight);

  useEffect(() => {
    const resizeRatio = () => {
      setRatio(window.innerWidth / window.innerHeight);
    };
    window.addEventListener("resize", resizeRatio);
    return () => window.removeEventListener("resize", resizeRatio);
  }, [ratio]);

  return (
    <AuthProvider>
      <Router>
        <HeaderPhone menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <Routes>
          {/* Authentication Routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          
          {/* Main Route - All sections accessible without login */}
          <Route 
            path="/" 
            element={
              <>
                <Home ratio={ratio} />
                <Services />
                <About />
                <Work />
                <Timeline />
                <Testimonial />
                <Contact />
                <Footer />
              </>
            } 
          />
        </Routes>

        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;