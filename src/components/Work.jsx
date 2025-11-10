import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import data from "../assets/data";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Work = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleEventRegister = (eventUrl, eventTitle) => {
    if (!isAuthenticated()) {
      toast.error("Please sign in to register for this event", {
        duration: 3000,
        position: "top-center",
      });
      setTimeout(() => navigate("/signin"), 1500);
    } else {
      // Open event registration form
      window.open(eventUrl, "_blank");
    }
  };

  return (
    <div id="work">
      <h2>Events</h2>
      <section>
        <article>
          <Carousel
            showArrows={false}
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            interval={2000}
            infiniteLoop={true}
            autoPlay={true}
          >
            {data.projects.map((i) => (
              <div key={i.title} className="workItem">
                <img src={i.imgSrc} alt={i.title} />
                <aside>
                  <h3>{i.title}</h3>
                  <p>{i.description}</p>
                  <a
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault();
                      handleEventRegister(i.url, i.title);
                    }}
                  >
                    Register
                  </a>
                </aside>
              </div>
            ))}
          </Carousel>
        </article>
      </section>
    </div>
  );
};

export default Work;
