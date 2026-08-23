import "../styles/teamMember.scss";
import { AiFillLinkedin } from "react-icons/ai";

const TeamMember = ({ name, memberClass, image, linkedin, customClass }) => {
    return (
        <div className="team-member-card">
            <div className="member-image">
                <img
                    src={image}
                    alt="Team Member"
                    className={customClass || ""}
                />
            </div>
            <div className="member-details">
                <h4 className="member-name">{name}</h4>
                <p className="member-class">{memberClass}</p>
                {linkedin && <a href={linkedin} target={"blank"}>
                    <AiFillLinkedin />
                </a>}
            </div>
        </div>
    );
};

export default TeamMember;
