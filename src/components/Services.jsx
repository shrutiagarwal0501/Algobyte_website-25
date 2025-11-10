import React from "react";
import { motion } from "framer-motion";
import { AiFillIeCircle, AiFillAndroid, AiFillWindows } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Services = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleFormAccess = (formUrl, formName) => {
    if (!isAuthenticated()) {
      toast.error(`Please sign in to access ${formName}`, {
        duration: 3000,
        position: 'top-center',
      });
      setTimeout(() => navigate('/signin'), 1500);
    } else {
      // Open form/resource in new tab
      window.open(formUrl, '_blank');
    }
  };

  const animations = {
    whileInView: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    one: {
      opacity: 0,
      x: "-100%",
    },
    twoAndThree: {
      opacity: 0,
      y: "-100%",
    },
    four: {
      opacity: 0,
      x: "100%",
    },
  };

  return (
    <div id="services">
      <h2>Services</h2>
      <section>
        <motion.div
          className="serviceBox1"
          whileInView={animations.whileInView}
          initial={animations.one}
        >
          <h2>Empowering </h2>
          <h5>Users Every Day</h5>
        </motion.div>

        <motion.div
          className="serviceBox2"
          whileInView={animations.whileInView}
          initial={animations.twoAndThree}
          onClick={() => handleFormAccess('YOUR_RESOURCES_FORM_URL', 'Resources')}
          style={{ cursor: 'pointer' }}
        >
          <AiFillIeCircle />
          <span>Resources</span>
        </motion.div>

        <motion.div
          className="serviceBox3"
          whileInView={animations.whileInView}
          initial={animations.twoAndThree}
          transition={{
            delay: 0.2,
          }}
          onClick={() => handleFormAccess('YOUR_PLACEMENT_FORM_URL', 'Placement/Internship Form')}
          style={{ cursor: 'pointer' }}
        >
          <AiFillAndroid />
          <span>Placement/Internship</span>
        </motion.div>

        <motion.div
          className="serviceBox4"
          whileInView={animations.whileInView}
          initial={animations.four}
          onClick={() => handleFormAccess('YOUR_CHATROOM_URL', 'Chat Rooms')}
          style={{ cursor: 'pointer' }}
        >
          <AiFillWindows />
          <span>Chat Rooms</span>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;