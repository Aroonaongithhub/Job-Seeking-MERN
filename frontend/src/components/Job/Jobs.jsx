import "./Jobs.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();
  // run whenever user refresh the page
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/jobs",
          {
            withCredentials: true,
          }
        );
        setJobs(data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);
  // navigate page when ever the value of isAuthorized, navigate changes
  useEffect(() => {
    if (!isAuthorized) {
      navigate("/");
    }
  }, [isAuthorized, navigate]);

  return (
    <section className="jobs page">
      <div className="container">
        <h1>OPEN JOBS</h1>
        <div className="banner">
          {jobs.map((job) => (
            <div className="card" key={job._id}>
              <p>{job.title}</p>
              <p>{job.category}</p>
              <p>{job.country}</p>
              <Link to={`/job/${job._id}`}>Job Details</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
