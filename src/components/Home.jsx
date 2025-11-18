import React, { useRef } from "react";
import { animate, motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { BsArrowUpRight, BsChevronDown } from "react-icons/bs";
import me from "../assets/image.png";

const Home = ({ ratio }) => {
  const clientCount = useRef(null);
  const projectCount = useRef(null);

  const animationClientsCount = () => {
    animate(0, 1000, {
      duration: 1,
      onUpdate: (v) => (clientCount.current.textContent = v.toFixed()),
    });
  };
  const animationProjectsCount = () => {
    animate(0, 15, {
      duration: 1,
      onUpdate: (v) => (projectCount.current.textContent = v.toFixed()),
    });
  };

  const animations = {
    h1: {
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
    },
  };
  return (
    <div id="home">
      <section>
        <div>
          <motion.h1 {...animations.h1}>
           Bringing the saga of<br /> Technofilic nerds! 
          </motion.h1>

          <Typewriter
            options={{
              strings: ["A Developer", "A Designer", "A Creator"],
              autoStart: true,
              loop: true,
              cursor: "",
              wrapperClassName: "typewriterpara",
            }}
          />

          <div>
            <a href="mailto:algobyte@banasthali.in">Connect</a>
            <a href="#about">
              About us <BsArrowUpRight />
            </a>
          </div>

          <article>
            <p>
              +<motion.span
                  whileInView={animationClientsCount}
                  ref={clientCount}
                ></motion.span>
            </p>
            <span>Members</span>
          </article>

          <aside>
            <article>
              <p>
                +<motion.span
                    ref={projectCount}
                    whileInView={animationProjectsCount}
                  >
                    13+
                  </motion.span>
              </p>
              <span>Events</span>
            </article>

            <article data-special>
              <p>Contact</p>
              <span>algobyte@banasthali.in</span>
            </article>
          </aside>
        </div>
      </section>
      <section>
        <img src={me} alt="Algobyte" />
      </section>
      <BsChevronDown />
    </div>
  );
};

export default Home;
