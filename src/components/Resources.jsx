import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/resource.scss";

const Resources = () => {
  return (
    <>
      <Header />

      <div className="resource-page" style={{ fontFamily: "Poppins, sans-serif" }}>
        <main className="container">
          <section className="hero-section">
            <h1>📚 Our Core Tech Resources</h1>
            <p>Dive into curated materials and essential links covering foundational CS pillars.</p>
            <div className="search-bar">
              <input type="text" placeholder="Search for DSA, DBMS, or concepts..." />
              <button>🔍</button>
            </div>
          </section>

          <section className="resource-grid">
            {/* Card Template */}
            {[
              {
                title: "Data Structures 🏗️",
                desc: "Learn Arrays, Linked Lists, Trees, Graphs, Hash Tables.",
                tags: ["DSA","Trees","Pointers"],
                colorClass: "card-ds",
                options: ["Array Guide","Linked List Tutorial","Tree Examples"]
              },
              {
                title: "Data Algorithms 🧠",
                desc: "Master Sorting, Searching, DP, Greedy, Backtracking.",
                tags: ["Algorithms","DP","Greedy"],
                colorClass: "card-algo",
                options: ["Sorting","Searching","Dynamic Programming"]
              },
              {
                title: "DBMS 🗃️",
                desc: "SQL, Normalization, Transactions, Concurrency, Database Design.",
                tags: ["SQL","Normalization","Database"],
                colorClass: "card-dbms",
                options: ["SQL Queries","ER Diagrams","Normalization Guide"]
              },
              {
                title: "AI-ML 🤖",
                desc: "Python, ML models, Deep Learning, frameworks like TensorFlow & PyTorch.",
                tags: ["Python","ML","Neural Networks"],
                colorClass: "card-aiml",
                options: ["Python ML","ML Models","Frameworks"]
              },
              {
                title: "Deep Learning 🧠",
                desc: "Advanced Neural Nets, CNNs, RNNs, Transformers, PyTorch, TensorFlow.",
                tags: ["CNN","RNN","Transformers"],
                colorClass: "card-dl",
                options: ["CNN Guide","RNN Tutorial","Transformers"]
              },
              {
                title: "Operating Systems ⚙️",
                desc: "Process Management, Memory, Deadlocks, Synchronization, File Systems.",
                tags: ["Kernel","Processes","Concurrency"],
                colorClass: "card-os",
                options: ["Processes","Memory Mgmt","Deadlocks"]
              },
              {
                title: "Computer Networks 🌐",
                desc: "OSI/TCP-IP, Protocols, Routing, Subnetting, Security basics.",
                tags: ["TCP/IP","Protocols","OSI"],
                colorClass: "card-cn",
                options: ["TCP/IP Guide","Protocols","Subnetting"]
              },
              {
                title: "Recommended Courses 🎓",
                desc: "Top courses from Coursera, edX, NPTEL for upskilling.",
                tags: ["MOOCs","Certification","Skill"],
                colorClass: "card-courses",
                options: ["Coursera","edX","NPTEL"]
              }
            ].map((card, idx) => (
              <div key={idx} className={`resource-card ${card.colorClass}`}>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <div className="tags">
                  {card.tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
                </div>
                <div className="dropdown">
                  <button className="dropbtn">Options ⏷</button>
                  <div className="dropdown-content">
                    {card.options.map((opt, i) => <a key={i} href="#">{opt}</a>)}
                  </div>
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Resources;
