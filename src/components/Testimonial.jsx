import React from "react";
import { Link } from "react-router-dom";

const Testimonial = () => {
    return (
        <div id="testimonial">
            <h2>Teams</h2>

            <section>
                <Link to={"/team/#tech-team"}>
                    <TestimonialCard
                        name={"Technical Team"}
                        feedback={"Innovating solutions, enhancing efficiency."}
                    />
                </Link>

                <Link to={"/team/#event-team"}>
                    <TestimonialCard
                        name={"Event-Management Team"}
                        feedback={"Seamlessly organizing memorable events."}
                    />
                </Link>

                <Link to={"/team/#content-team"}>
                    <TestimonialCard
                        name={"Content-Writing Team"}
                        feedback={"Crafting impactful and engaging stories."}
                    />
                </Link>

                <Link to={"/team/#graphic-team"}>
                    <TestimonialCard
                        name={"Digital-Design Team"}
                        feedback={
                            "Creating visually stunning digital experiences."
                        }
                    />
                </Link>
            </section>
        </div>
    );
};

const TestimonialCard = ({ name, feedback }) => (
    <article>
        <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="User"
        />
        <h4>{name}</h4>
        <p>{feedback}</p>
    </article>
);

export default Testimonial;
