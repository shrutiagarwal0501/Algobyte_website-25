import React from "react";
import "../styles/about.scss";

const About = () => {
  return (
    <section id="about">
      <div className="about-container">
        
        <h2>About AlgoByte</h2>

        <article>
          <p>
            <strong>AlgoByte</strong> is the official open-source coding club of 
            <strong> Banasthali Vidyapith</strong>. Since its founding in 2022, it has 
            grown into a launchpad for students eager to explore 
            <strong> coding, open-source development, and real-world tech innovation</strong>.
          </p>

          <p>
            We empower students from all branches through 
            <strong> hands-on learning, collaboration, and mentorship</strong> — 
            whether you're new to coding or aiming to level up your skills.
          </p>

          <h3>Our Vision</h3>
          <ul>
            <li>Inspire curiosity and problem-solving.</li>
            <li>Promote open-source culture and continuous learning.</li>
            <li>Bridge the gap between academics and industry.</li>
          </ul>

          <h3>What We Do</h3>
          <ul>
            <li>Beginner-friendly workshops (Python, GitHub, Web Dev).</li>
            <li>Flagship hackathon: <strong>Hack the Horizon</strong>.</li>
            <li>Mentorship and alumni guidance.</li>
            <li>Open-source projects & real-world collaboration.</li>
          </ul>

          <h3>Why Join AlgoByte?</h3>
          <ul>
            <li>Supported by faculty & alumni.</li>
            <li>Hands-on coding & project-based learning.</li>
            <li>Collaborative, friendly, growth-driven community.</li>
            <li>Opportunities to learn, lead, and build real impact.</li>
          </ul>
        </article>
      </div>
    </section>
  );
};

export default About;
