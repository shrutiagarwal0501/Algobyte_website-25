import React from "react";
import { motion } from "framer-motion";
import { AiFillIeCircle, AiFillAndroid, AiFillWindows } from "react-icons/ai";

const Services = () => {
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

  // ✅ No auth check anymore
  const handleFormAccess = (formUrl) => {
    window.open(formUrl, "_blank");
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
          <h2>Empowering</h2>
          <h5>Users Every Day</h5>
        </motion.div>

        <motion.div
          className="serviceBox2"
          whileInView={animations.whileInView}
          initial={animations.twoAndThree}
          onClick={() => handleFormAccess("YOUR_RESOURCES_FORM_URL")}
          style={{ cursor: "pointer" }}
        >
          <AiFillIeCircle />
          <span>Resources</span>
        </motion.div>

        <motion.div
          className="serviceBox3"
          whileInView={animations.whileInView}
          initial={animations.twoAndThree}
          transition={{ delay: 0.2 }}
          onClick={() => handleFormAccess("YOUR_PLACEMENT_FORM_URL")}
          style={{ cursor: "pointer" }}
        >
          <AiFillAndroid />
          <span>Placement/Internship</span>
        </motion.div>

        <motion.div
          className="serviceBox4"
          whileInView={animations.whileInView}
          initial={animations.four}
          onClick={() => handleFormAccess("YOUR_CHATROOM_URL")}
          style={{ cursor: "pointer" }}
        >
          <AiFillWindows />
          <span>Chat Rooms</span>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
