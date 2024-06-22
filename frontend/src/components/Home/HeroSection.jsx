import "./HeroSection.css";
import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "9,12,200",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <section className="heroSection">
      <div className="container">
        <div className="title">
          <h1>Find a job that suits you</h1>
          <h1>Your interest and skills</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos, praesentium. Ipsa harum aliquid provident temporibus
            eum! Error dolorem beatae numquam incidunt. Dolore aliquid excepturi
            eius enim officiis iure eum voluptatem?
          </p>
        </div>
        <div className="image">
          <img src="/find.gif" alt="job" />
        </div>
      </div>
      <div className="details">
        {details.map((ele) => {
          return (
            <div className="card" key={ele.id}>
              <div className="icon">{ele.icon}</div>
              <div className="content">
                <p>{ele.title}</p>
                <p>{ele.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HeroSection;
