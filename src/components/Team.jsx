import React from "react";
import TeamMember from "./TeamMember";
import "../styles/team.scss";

const Team = () => {
    return (
        <div className="team">
            <h2>Meet Our Team</h2>
            <h3>Leads</h3>
            <div className="team-row">
                <TeamMember
                    name="Shruti Agarwal"
                    memberClass="B.Tech (CS-AI) 4th Year"
                    linkedin="https://www.linkedin.com/in/shruti-agarwal-836288280"
                    image={"/team-member-images/Shruti Agarwal.jpg"}
                    customClass={"image-position-top"}
                />
                <TeamMember
                    name="Swasti Mishra"
                    memberClass="B.Tech (CS-AI) 4th Year"
                    linkedin="https://www.linkedin.com/in/swasti-mishra25"
                    image={"/team-member-images/Swasti Mishra.jpg"}
                />
                <TeamMember
                    name="Sargam Malik"
                    memberClass="B.Tech (CS-AI) 4th Year"
                    linkedin="https://www.linkedin.com/in/sargammalik"
                    image={"/team-member-images/Sargam Malik.png"}
                />
                <TeamMember
                    name="Shilpi Mishra"
                    memberClass="B.Tech (EC) 4th Year"
                    linkedin="https://www.linkedin.com/in/shilpimishra1"
                    image={"/team-member-images/Shilpi Mishra.jpg"}
                />
                <TeamMember
                    name="Ananya Sharma"
                    memberClass="B.Tech (IT) 4th Year"
                    linkedin="https://www.linkedin.com/in/sharma-ananya"
                    image={"/team-member-images/Ananya Sharma.jpg"}
                />
            </div>
            <h3>Technical Team</h3>
            <div className="team-row">
                <TeamMember
                    name="Vedanshi Awasthi"
                    memberClass="B.Tech (IT) 4th Year"
                    linkedin="https://www.linkedin.com/in/vedanshi-awasthi"
                    image={"/team-member-images/Vedanshi Awasthi.jpg"}
                />
                <TeamMember
                    name="Kritika Jain"
                    memberClass="B.Tech (CS) 4th Year"
                    linkedin="https://www.linkedin.com/in/kritika-jain-23b730249"
                    image={"/team-member-images/Kritika Jain.jpg"}
                />
                <TeamMember
                    name="Vinisha Choudhary"
                    memberClass="B.Tech (CS) 4th Year"
                    linkedin="https://www.linkedin.com/in/vinisha-choudhary-285618245"
                    image={"/team-member-images/Vinisha Choudhary.jpg"}
                />
                <TeamMember
                    name="Palak Bansal"
                    memberClass="B.Tech (CS) 3rd Year"
                    linkedin="https://www.linkedin.com/in/palak-bansal-58b845339"
                    image={"/team-member-images/Palak Bansal.jpg"}
                    customClass={"image-position-top"}
                />
                <TeamMember
                    name="Akshita Singhal"
                    memberClass="B.Tech (CS) 2nd Year"
                    linkedin="https://www.linkedin.com/in/akshita-singhal-649956304"
                    image={"/team-member-images/Akshita Singhal.jpg"}
                />
                <TeamMember
                    name="Sansita Jain"
                    memberClass="B.Tech (CS) 2nd Year"
                    linkedin="https://www.linkedin.com/in/sansita0704"
                    image={"/team-member-images/Sansita Jain.jpg"}
                    customClass={"image-position-top"}
                />
                <TeamMember
                    name="Tanu Verma"
                    memberClass="B.Tech (CS) 2nd Year"
                    linkedin="https://www.linkedin.com/in/tanu-verma-877599321"
                    image={"/team-member-images/Tanu Verma.jpg"}
                    customClass={"image-position-top"}
                />
                <TeamMember
                    name="Mannat Hooja"
                    memberClass="B.Tech (CS-AI) 2nd Year"
                    linkedin="https://www.linkedin.com/in/mannat-hooja-31442732a"
                    image={"/team-member-images/Mannat Hooja.jpg"}
                />
                <TeamMember
                    name="Unnati Chandani"
                    memberClass="B.Tech (CS) 1st Year"
                    linkedin="https://www.linkedin.com/in/unnati-chandani-79b03237b"
                    image={"/team-member-images/Unnati Chandani.png"}
                />
                <TeamMember
                    name="Drishika Vyas"
                    memberClass="B.Tech (IT) 1st Year"
                    linkedin="https://www.linkedin.com/in/drishika-vyas-605413386"
                    image={"/team-member-images/Drishika Vyas.jpg"}
                />
                <TeamMember
                    name="Sheril Shrivastava"
                    memberClass="B.Tech (CS-AI) 1st Year"
                    linkedin="https://www.linkedin.com/in/sheril-srivastava"
                    image={"/team-member-images/Sheril Shrivastava.png"}
                />
            </div>
            <h3>Event Management Team</h3>
            <div className="team-row">
                <TeamMember
                    name="Ishi Kesarwani"
                    memberClass="B.Tech (CS-AI) 4th Year"
                    linkedin="http://linkedin.com/in/ishi-kesarwani"
                    image={"/team-member-images/Ishi Kesarwani.jpeg"}
                />
                <TeamMember
                    name="Anshika Singh Chauhan"
                    memberClass="B.Tech (IT) 4th Year"
                    linkedin="https://www.linkedin.com/in/anshika-singh-chauhan-305525256"
                    image={"/team-member-images/Anshika singh Chauhan.jpg"}
                />
                <TeamMember
                    name="Sanskriti Mishra"
                    memberClass="B.Tech (ECE) 4th Year"
                    linkedin="https://www.linkedin.com/in/sanskriti-mishra-aa3ab7254"
                    image={"/team-member-images/Sanskriti Mishra.png"}
                />
                <TeamMember
                    name="Simran Govil"
                    memberClass="B.Tech (CS) 3rd Year"
                    linkedin="https://www.linkedin.com/in/simran-govil-288325286"
                    image={"/team-member-images/Simran Govil.jpeg"}
                />
                <TeamMember
                    name="Vanshiika Tiwari"
                    memberClass="B.Tech (IT) 3rd Year"
                    linkedin="https://www.linkedin.com/in/vanshiika-tiwari-student"
                    image={"/team-member-images/Vanshiika Tiwari.jpg"}
                    customClass={"image-position-top"}
                />
                <TeamMember
                    name="Isha Joshi"
                    memberClass="B.Tech (CS) 2nd Year"
                    linkedin="http://www.linkedin.com/in/isha-joshi-58bb8934b"
                    image={"/team-member-images/Isha Joshi.jpg"}
                />
                <TeamMember
                    name="Garima Kapil"
                    memberClass="B.Tech (IT) 2nd Year"
                    linkedin="https://www.linkedin.com/in/garima-kapil-020873322"
                    image={"/team-member-images/Garima Kapil.jpg"}
                />
                <TeamMember
                    name="Varali Gupta"
                    memberClass="B.Tech (CS) 2nd Year"
                    linkedin="https://www.linkedin.com/in/varaligupta"
                    image={"/team-member-images/Varali Gupta.png"}
                />
                <TeamMember
                    name="Palak Sibbal"
                    memberClass="B.Tech (CS-AI) 2nd Year"
                    linkedin="https://www.linkedin.com/in/palak-sibbal-326b1732b"
                    image={"/team-member-images/Palak Sibbal.jpeg"}
                    customClass={"image-position-top"}
                />
                <TeamMember
                    name="Riya Kumari"
                    memberClass="B.Tech (CS-AI) 2nd Year"
                    linkedin="https://www.linkedin.com/in/riya-kumari-b6a521348"
                    image={"/team-member-images/Riya Kumari.jpg"}
                />
                <TeamMember
                    name="Stuti Verma"
                    memberClass="B.Tech (CS) 1st Year"
                    linkedin="https://www.linkedin.com/in/stuti-verma-6a286b38b"
                    image={"/team-member-images/Stuti Verma.jpg"}
                />
                <TeamMember
                    name="Manasvi Sharma"
                    memberClass="B.Tech (CS) 1st Year"
                    image={"/team-member-images/Manasvi Sharma.png"}
                    customClass={"image-position-top"}
                />
            </div>
            <h3>Graphic Design Team</h3>
            <div className="team-row">
                <TeamMember
                    name="Shikha Chaturvedi"
                    memberClass="B.Tech (CS-AI) 4th Year"
                    linkedin="https://www.linkedin.com/in/shikha-chaturvedi26"
                    image={"/team-member-images/Shikha Chaturvedi.jpg"}
                />
                <TeamMember
                    name="Sanya Anand"
                    memberClass="B.Tech (CS) 3rd Year"
                    linkedin="https://www.linkedin.com/in/anand-sanya"
                    image={"/team-member-images/Sanya Anand.jpg"}
                />
                <TeamMember
                    name="Avani Bapna"
                    memberClass="B.Tech (IT) 2nd Year"
                    linkedin="https://www.linkedin.com/in/avani-bapna-26a984309"
                    image={"/team-member-images/Avani Bapna.jpg"}
                />
                <TeamMember
                    name="Manvi Mishra"
                    memberClass="B.Tech (CS) 2nd Year"
                    linkedin="https://www.linkedin.com/in/manvi-mishra-3b6326343"
                    image={"/team-member-images/Manvi Mishra.jpg"}
                />
                <TeamMember
                    name="Gargi Mittal"
                    memberClass="B.Tech (CE) 2nd Year"
                    image={"/team-member-images/Gargi Mittal.jpg"}
                />
                <TeamMember
                    name="Kritika Paliwal"
                    memberClass="B.Tech (ECE) 2nd Year"
                    linkedin="https://www.linkedin.com/in/kritika-paliwal-1065073750kri"
                    image={"/team-member-images/Kritika Paliwal.jpg"}
                />
                {/* TODO: image */}
                <TeamMember
                    name="Vatsala Tripathi"
                    memberClass="MCA 2nd Year"
                    linkedin="https://www.linkedin.com/in/vatsala-tripathi-085149255"
                    image={"/team-member-images/Vatsala Tripathi.jpg"}
                />
                <TeamMember
                    name="Varnika Ravindra Lal"
                    memberClass="B.Tech (IT) 1st Year"
                    linkedin="https://www.linkedin.com/in/varnika-lal"
                    image={"/team-member-images/Varnika Lal.jpg"}
                />
                <TeamMember
                    name="Mokshika Bhardwaj"
                    memberClass="B.Tech (CS) 1st Year"
                    linkedin="https://www.linkedin.com/in/mokshika-bhardwaj-4b5b54285"
                    image={"/team-member-images/Mokshika Bhardwaj.jpg"}
                />
            </div>
            <h3>Content Team</h3>
            <div className="team-row">
                <TeamMember
                    name="Vasundhara Chhilar"
                    memberClass="B.Tech (EI) 4th Year"
                    image={"/team-member-images/Vasundhara Chhilar.png"}
                />
                <TeamMember
                    name="Palak Pandey"
                    memberClass="B.Tech (ECE) 4th Year"
                    linkedin="https://www.linkedin.com/in/palak-pandey-bv99"
                    image={"/team-member-images/Palak Pandey.jpeg"}
                />
                <TeamMember
                    name="Dittee Singh"
                    memberClass="B.Tech (IT) 2nd Year"
                    image={"/team-member-images/Dittee Singh.png"}
                />
                <TeamMember
                    name="Paridhi Shukla"
                    memberClass="B.Tech (EE) 2nd Year"
                    linkedin="https://www.linkedin.com/in/paridhi-shukla-15300pr"
                    image={"/team-member-images/Paridhi Shukla.jpg"}
                />
                <TeamMember
                    name="Atulya Singh"
                    memberClass="B.Tech (IT) 2nd Year"
                    linkedin="https://www.linkedin.com/in/atulya-singh-10430b345"
                    image={"/team-member-images/Atulya Singh.jpg"}
                />
                <TeamMember
                    name="Niharika Srivastava"
                    memberClass="B.Tech (CS) 1st Year"
                    linkedin="https://www.linkedin.com/in/niharika-srivastava-242659317"
                    image={"/team-member-images/Niharika Srivastava.jpg"}
                />
                <TeamMember
                    name="Anushka Agrawal"
                    memberClass="B.Tech (EE) 1st Year"
                    image={"/team-member-images/Anushka Agrawal.jpg"}
                    customClass={"image-position-top"}
                />
            </div>
        </div>
    );
};

export default Team;
