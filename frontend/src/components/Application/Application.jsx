import "./Application.css";
import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Context } from "../../main";
import { useNavigate, useParams } from "react-router-dom";

const Application = () => {
  // states to get each field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  // authorization requirement
  const { isAuthorized, user } = useContext(Context);
  // navigation requirement
  const navigateTo = useNavigate();

  // handle file change
  const FileChange = (event) => {
    // only one file is allowed to select
    const resume = event.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  // get the job title to apply for
  useEffect(() => {
    const fetchJobTitle = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/job/${id}`,
          {
            withCredentials: true,
          }
        );
        setJobTitle(data.job.title);
      } catch (error) {
        toast.error("Error fetching job details");
      }
    };

    fetchJobTitle();
  }, [id]);
  // handle fields required to get
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/apply",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume("");
      toast.success(data.message);
      // navigateTo("/job/jobs");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  if (!isAuthorized || (user && user.role === "Employee")) {
    navigateTo("/");
  }
  return (
    <section className="application">
      <div className="container">
        <h3>{jobTitle}</h3>
        <form onSubmit={handleApplication}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Your Contact Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Residential Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <textarea
            placeholder="Cover Letter or Something else you want to share.."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
          <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Select Resume
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={FileChange}
              style={{ width: "100%" }}
            />
          </div>
          <button type="submit">Send Application</button>
        </form>
      </div>
    </section>
  );
};

export default Application;
