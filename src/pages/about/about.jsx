import "./about.css";
import Head from "../../components/head/Head";

function About() {
    return (
        <div className="about-page">
            <Head/>
            <p>
                SkillShare Hub connects professionals, mentors, trainers, developers
                and learners through practical knowledge, industry experience and
                collaborative learning.
            </p>
            <p>
                Our mission is to make real-world skills accessible to everyone by
                letting experienced creators share what they know, and letting
                learners find guidance from people who have actually done the work.
            </p>
        </div>
    );
}

export default About;
