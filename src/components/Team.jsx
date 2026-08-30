import React from "react";
import TeamMember from "./TeamMember";
import "../styles/team.scss";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Team = () => {
    const { hash } = useLocation();

    useEffect(() => {
        // When hash changes, try to scroll to the element
        if (hash) {
            const element = document.querySelector(hash);

            if (element) {
                // Smooth scroll to the element
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }
    }, [hash]);

    return (
        <div className="team">
            <h2>Meet Our Team</h2>
            <h3 id="leads">Leads</h3>
            <div className="team-row">
                <TeamMember
                    name="Palak Bansal"
                    memberClass="B.Tech (CS) 4th Year"
                    linkedin="https://www.linkedin.com/in/palak-bansal-58b845339"
                    image={"/team-member-images/Palak Bansal.jpg"}
                    customClass={"image-position-top"}
                />
                <TeamMember
                    name="Simran Govil"
                    memberClass="B.Tech (CS) 4th Year"
                    linkedin="https://www.linkedin.com/in/simran-govil-288325286"
                    image={"/team-member-images/Simran Govil.jpeg"}
                />
                <TeamMember
                    name="Vanshiika Tiwari"
                    memberClass="B.Tech (IT) 4th Year"
                    linkedin="https://www.linkedin.com/in/vanshiika-tiwari-student"
                    image={"/team-member-images/Vanshiika Tiwari.jpg"}
                    customClass={"image-position-top"}
                />
                <TeamMember
                    name="Sanya Anand"
                    memberClass="B.Tech (CS) 4th Year"
                    linkedin="https://www.linkedin.com/in/anand-sanya"
                    image={"/team-member-images/Sanya Anand.jpg"}
                />
            </div>
            <h3 id="tech-team">Technical Team</h3>
            <div className="team-row">
                <TeamMember
                    name="Palak Bansal"
                    memberClass="B.Tech (CS) 4th Year"
                    linkedin="https://www.linkedin.com/in/palak-bansal-58b845339"
                    image={"/team-member-images/Palak Bansal.jpg"}
                    customClass={"image-position-top"}
                />
                <TeamMember
                    name="Akshita Singhal"
                    memberClass="B.Tech (CS) 3rd Year"
                    linkedin="https://www.linkedin.com/in/akshita-singhal-649956304"
                    image={"/team-member-images/Akshita Singhal.jpg"}
                />
                <TeamMember
                    name="Sansita Jain"
                    memberClass="B.Tech (CS) 3rd Year"
                    linkedin="https://www.linkedin.com/in/sansita0704"
                    image={"/team-member-images/Sansita Jain.jpg"}
                    customClass={"image-position-top"}
                />
                <TeamMember
                    name="Tanu Verma"
                    memberClass="B.Tech (CS) 3rd Year"
                    linkedin="https://www.linkedin.com/in/tanu-verma-877599321"
                    image={"/team-member-images/Tanu Verma.jpg"}
                    customClass={"image-position-top"}
                />
                <TeamMember
                    name="Mannat Hooja"
                    memberClass="B.Tech (CS-AI) 3rd Year"
                    linkedin="https://www.linkedin.com/in/mannat-hooja-31442732a"
                    image={"/team-member-images/Mannat Hooja.jpg"}
                />
                <TeamMember
                    name="Unnati Chandani"
                    memberClass="B.Tech (CS) 2nd Year"
                    linkedin="https://www.linkedin.com/in/unnati-chandani-79b03237b"
                    image={"/team-member-images/Unnati Chandani.png"}
                />
                <TeamMember
                    name="Drishika Vyas"
                    memberClass="B.Tech (IT) 2nd Year"
                    linkedin="https://www.linkedin.com/in/drishika-vyas-605413386"
                    image={"/team-member-images/Drishika Vyas.jpg"}
                />

                <TeamMember
                    name="Vedanshi Awasthi"
                    memberClass="Alumni"
                    linkedin="https://www.linkedin.com/in/vedanshi-awasthi"
                    image={"/team-member-images/Vedanshi Awasthi.jpg"}
                />
                <TeamMember
                    name="Kritika Jain"
                    memberClass="Alumni"
                    linkedin="https://www.linkedin.com/in/kritika-jain-23b730249"
                    image={"/team-member-images/Kritika Jain.jpg"}
                />
                <TeamMember
                    name="Vinisha Choudhary"
                    memberClass="Alumni"
                    linkedin="https://www.linkedin.com/in/vinisha-choudhary-285618245"
                    image={"/team-member-images/Vinisha Choudhary.jpg"}
                />
            </div>
            <h3 id="event-team">Event Management Team</h3>
            <div className="team-row">
                <TeamMember
                    name="Simran Govil"
                    memberClass="B.Tech (CS) 4th Year"
                    linkedin="https://www.linkedin.com/in/simran-govil-288325286"
                    image={"/team-member-images/Simran Govil.jpeg"}
                />
                <TeamMember
                    name="Vanshiika Tiwari"
                    memberClass="B.Tech (IT) 4th Year"
                    linkedin="https://www.linkedin.com/in/vanshiika-tiwari-student"
                    image={"/team-member-images/Vanshiika Tiwari.jpg"}
                    customClass={"image-position-top"}
                />
                <TeamMember
                    name="Garima Kapil"
                    memberClass="B.Tech (IT) 3rd Year"
                    linkedin="https://www.linkedin.com/in/garima-kapil-020873322"
                    image={"/team-member-images/Garima Kapil.jpg"}
                />
                <TeamMember
                    name="Varali Gupta"
                    memberClass="B.Tech (CS) 3rd Year"
                    linkedin="https://www.linkedin.com/in/varaligupta"
                    image={"/team-member-images/Varali Gupta.png"}
                />
                <TeamMember
                    name="Palak Sibbal"
                    memberClass="B.Tech (CS-AI) 3rd Year"
                    linkedin="https://www.linkedin.com/in/palak-sibbal-326b1732b"
                    image={"/team-member-images/Palak Sibbal.jpeg"}
                    customClass={"image-position-top"}
                />
                <TeamMember
                    name="Riya Kumari"
                    memberClass="B.Tech (CS-AI) 3rd Year"
                    linkedin="https://www.linkedin.com/in/riya-kumari-b6a521348"
                    image={"/team-member-images/Riya Kumari.jpg"}
                />
                <TeamMember
                    name="Stuti Verma"
                    memberClass="B.Tech (CS) 2nd Year"
                    linkedin="https://www.linkedin.com/in/stuti-verma-6a286b38b"
                    image={"/team-member-images/Stuti Verma.jpg"}
                />
                <TeamMember
                    name="Manasvi Sharma"
                    memberClass="B.Tech (CS) 2nd Year"
                    image={"/team-member-images/Manasvi Sharma.png"}
                    customClass={"image-position-top"}
                />
                <TeamMember
                    name="Ishi Kesarwani"
                    memberClass="Alumni"
                    linkedin="http://linkedin.com/in/ishi-kesarwani"
                    image={"/team-member-images/Ishi Kesarwani.jpeg"}
                />
                <TeamMember
                    name="Anshika Singh Chauhan"
                    memberClass="Alumni"
                    linkedin="https://www.linkedin.com/in/anshika-singh-chauhan-305525256"
                    image={"/team-member-images/Anshika singh Chauhan.jpg"}
                />
                <TeamMember
                    name="Sanskriti Mishra"
                    memberClass="Alumni"
                    linkedin="https://www.linkedin.com/in/sanskriti-mishra-aa3ab7254"
                    image={"/team-member-images/Sanskriti Mishra.png"}
                />
            </div>
            <h3 id="graphic-team">Graphic Design Team</h3>
            <div className="team-row">
                <TeamMember
                    name="Sanya Anand"
                    memberClass="B.Tech (CS) 4th Year"
                    linkedin="https://www.linkedin.com/in/anand-sanya"
                    image={"/team-member-images/Sanya Anand.jpg"}
                />
                <TeamMember
                    name="Manvi Mishra"
                    memberClass="B.Tech (CS) 3rd Year"
                    linkedin="https://www.linkedin.com/in/manvi-mishra-3b6326343"
                    image={"/team-member-images/Manvi Mishra.jpg"}
                />
                <TeamMember
                    name="Gargi Mittal"
                    memberClass="B.Tech (CE) 3rd Year"
                    image={"/team-member-images/Gargi Mittal.jpg"}
                />
                <TeamMember
                    name="Kritika Paliwal"
                    memberClass="B.Tech (ECE) 3rd Year"
                    linkedin="https://www.linkedin.com/in/kritika-paliwal-1065073750kri"
                    image={"/team-member-images/Kritika Paliwal.jpg"}
                />
                <TeamMember
                    name="Varnika Ravindra Lal"
                    memberClass="B.Tech (IT) 2nd Year"
                    linkedin="https://www.linkedin.com/in/varnika-lal"
                    image={"/team-member-images/Varnika Lal.jpg"}
                />
                <TeamMember
                    name="Mokshika Bhardwaj"
                    memberClass="B.Tech (CS) 2nd Year"
                    linkedin="https://www.linkedin.com/in/mokshika-bhardwaj-4b5b54285"
                    image={"/team-member-images/Mokshika Bhardwaj.jpg"}
                />
                <TeamMember
                    name="Shikha Chaturvedi"
                    memberClass="Alumni"
                    linkedin="https://www.linkedin.com/in/shikha-chaturvedi26"
                    image={"/team-member-images/Shikha Chaturvedi.jpg"}
                />
            </div>
            <h3 id="content-team">Content Team</h3>
            <div className="team-row">
                <TeamMember
                    name="Dittee Singh"
                    memberClass="B.Tech (IT) 3rd Year"
                    image={"/team-member-images/Dittee Singh.png"}
                />
                <TeamMember
                    name="Paridhi Shukla"
                    memberClass="B.Tech (EE) 3rd Year"
                    linkedin="https://www.linkedin.com/in/paridhi-shukla-15300pr"
                    image={"/team-member-images/Paridhi Shukla.jpg"}
                />
                <TeamMember
                    name="Atulya Singh"
                    memberClass="B.Tech (IT) 3rd Year"
                    linkedin="https://www.linkedin.com/in/atulya-singh-10430b345"
                    image={"/team-member-images/Atulya Singh.jpg"}
                />
                <TeamMember
                    name="Niharika Srivastava"
                    memberClass="B.Tech (CS) 2nd Year"
                    linkedin="https://www.linkedin.com/in/niharika-srivastava-242659317"
                    image={"/team-member-images/Niharika Srivastava.jpg"}
                />
                <TeamMember
                    name="Anushka Agrawal"
                    memberClass="B.Tech (EE) 2nd Year"
                    image={"/team-member-images/Anushka Agrawal.jpg"}
                    customClass={"image-position-top"}
                />
                <TeamMember
                    name="Vasundhara Chhilar"
                    memberClass="Alumni"
                    image={"/team-member-images/Vasundhara Chhilar.png"}
                />
                <TeamMember
                    name="Palak Pandey"
                    memberClass="Alumni"
                    linkedin="https://www.linkedin.com/in/palak-pandey-bv99"
                    image={"/team-member-images/Palak Pandey.jpeg"}
                />
            </div>
        </div>
    );
};

export default Team;
