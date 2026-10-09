import React, { useState } from "react";
import vg from "../assets/vg.png";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setDisableBtn(true);
    try {
      const accessKey = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;

      // 1. Send email notification via Web3Forms if access key is configured
      if (accessKey) {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            name,
            email,
            message,
            subject: `New Contact Message from ${name} - Algobyte Website`,
            from_name: "Algobyte Website",
          }),
        });

        const data = await response.json();
        if (!data.success) {
          console.error("Web3Forms error:", data);
          throw new Error(data.message || "Failed to send email notification");
        }
      } else {
        console.warn("REACT_APP_WEB3FORMS_ACCESS_KEY is not set. Email notification skipped.");
      }

      // 2. Also save to Firebase Firestore
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        message,
        createdAt: new Date().toISOString(),
      });

      setName("");
      setEmail("");
      setMessage("");
      toast.success("Message Sent Successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to send message. Please try again.");
      console.error(error);
    } finally {
      setDisableBtn(false);
    }
  };

  const animations = {
    form: {
      initial: {
        x: "-100%",
        opacity: 0,
      },
      whileInView: {
        x: 0,
        opacity: 1,
      },
    },

    button: {
      initial: {
        y: "-100%",
        opacity: 0,
      },
      whileInView: {
        y: 0,
        opacity: 1,
      },
      transition: {
        delay: 0.5,
      },
    },
  };
  return (
    <div id="contact">
      <section>
        <motion.form onSubmit={submitHandler} {...animations.form}>
          <h2>Contact Us</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <motion.button
            disabled={disableBtn}
            className={disableBtn ? "disableBtn" : ""}
            {...animations.button}
            type="submit"
          >
            {disableBtn ? "Sending..." : "Send"}
          </motion.button>
        </motion.form>
      </section>
      <aside>
        <img src={vg} alt="Graphics" />
      </aside>
    </div>
  );
};

export default Contact;
