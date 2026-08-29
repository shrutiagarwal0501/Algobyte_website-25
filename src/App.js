import Header, { HeaderPhone } from "./components/Header";
import Home from "./components/Home";
import Work from "./components/Work";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Services from "./components/Services";
import Testimonial from "./components/Testimonial";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Resources from "./components/Resources";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import './global.scss';
import Team from "./components/Team";
import { createBrowserRouter } from "react-router-dom";

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ratio, setRatio] = useState(window.innerWidth / window.innerHeight);
  useEffect(() => {
    const resizeRatio = () => {
      setRatio(window.innerWidth / window.innerHeight);
    };
    
    window.addEventListener("resize", resizeRatio);
    
    return () => {
      window.removeEventListener("resize", resizeRatio);
    };
  }, [ratio]);
  
  return (
    <>
      <HeaderPhone menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Home ratio={ratio} />
      <Services />
      <About />
      <Work />
      <Timeline />
      <Testimonial />
      <Resources />
      <Contact />
      <Footer />
      <Toaster />
    </>
  );
}

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/team",
        element: <Team />,
    },
]);

