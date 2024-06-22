import "./JobDetails.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigate = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/job/${id}`,
          {
            withCredentials: true,
          }
        );
        setJob(data.job);
      } catch (error) {
        navigate("/notfound");
      }
    };

    fetchJobDetails();
  }, [id, navigate]);

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/login");
    }
  }, [isAuthorized, navigate]);
  const dateFormat = () => {
    const date = new Date(job.jobPostedOn);
    const formattedDate = date.toLocaleDateString("en-US");
    return formattedDate;
  };
  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p className="title">
            <span>{job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Country: <span>{job.country}</span>
          </p>
          <p>
            City: <span>{job.city}</span>
          </p>
          <p>
            Location: <span>{job.location}</span>
          </p>
          <p>
            Description: <span>{job.description}</span>
          </p>
          <p>
            Job Posted On: <span>{dateFormat()}</span>
          </p>
          <p>
            Salary:{" "}
            {job.fixSalary ? (
              <span>{job.fixSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {user && user.role !== "Employee" && (
            <Link to={`/application/${job._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};
export default JobDetails;
