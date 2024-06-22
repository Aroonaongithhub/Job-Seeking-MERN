import "./PostJobs.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    category: "",
    country: "",
    city: "",
    location: "",
    salaryFrom: "",
    salaryTo: "",
    fixSalary: "",
    salaryType: "default",
  });

  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employee")) {
      navigate("/");
    }
  }, [isAuthorized, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleJobPost = async (e) => {
    e.preventDefault();

    const {
      title,
      description,
      category,
      country,
      city,
      location,
      salaryFrom,
      salaryTo,
      fixSalary,
      salaryType,
    } = jobData;

    let jobPayload;
    if (salaryType === "Fixed Salary") {
      jobPayload = {
        title,
        description,
        category,
        country,
        city,
        location,
        fixSalary,
      };
    } else if (salaryType === "Ranged Salary") {
      jobPayload = {
        title,
        description,
        category,
        country,
        city,
        location,
        salaryFrom,
        salaryTo,
      };
    } else {
      toast.error("Please select a valid salary type");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/job/post",
        jobPayload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/job/me");
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="job_post page">
      <div className="container">
        <h3>POST NEW JOB</h3>
        <form onSubmit={handleJobPost}>
          <div className="wrapper">
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              placeholder="Job Title"
              required
            />
            <select
              name="category"
              value={jobData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Mobile App Development">
                Mobile App Development
              </option>
              <option value="Frontend Web Development">
                Frontend Web Development
              </option>
              <option value="MERN Stack Development">
                MERN Stack Development
              </option>
              <option value="Account & Finance">Account & Finance</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Video Animation">Video Animation</option>
              <option value="MEAN Stack Development">
                MEAN Stack Development
              </option>
              <option value="MEVN Stack Development">
                MEVN Stack Development
              </option>
              <option value="Data Entry Operator">Data Entry Operator</option>
            </select>
          </div>
          <div className="wrapper">
            <input
              type="text"
              name="country"
              value={jobData.country}
              onChange={handleChange}
              placeholder="Country"
              required
            />
            <input
              type="text"
              name="city"
              value={jobData.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
          </div>
          <input
            type="text"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            placeholder="Location"
            required
          />
          <div className="salary_wrapper">
            <select
              name="salaryType"
              value={jobData.salaryType}
              onChange={handleChange}
              required
            >
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
            <div>
              {jobData.salaryType === "default" ? (
                <p>Please provide Salary Type *</p>
              ) : jobData.salaryType === "Fixed Salary" ? (
                <input
                  type="number"
                  name="fixSalary"
                  placeholder="Enter Fixed Salary"
                  value={jobData.fixSalary}
                  onChange={handleChange}
                  required
                />
              ) : (
                <div className="ranged_salary">
                  <input
                    type="number"
                    name="salaryFrom"
                    placeholder="Salary From"
                    value={jobData.salaryFrom}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="number"
                    name="salaryTo"
                    placeholder="Salary To"
                    value={jobData.salaryTo}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
            </div>
          </div>
          <textarea
            rows="10"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            placeholder="Job Description"
            required
          />
          <button type="submit">Create Job</button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
