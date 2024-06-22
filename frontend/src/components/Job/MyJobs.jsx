import "./MyJobs.css";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/job/my-posts`,
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (err) {
        toast.error(err.response.data.message);
        setMyJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMyJobs();
  }, []);

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employee")) {
      navigate("/");
    }
  }, [isAuthorized, user, navigate]);

  const enableEditing = (jobId) => {
    setEditMode(jobId);
  };

  const disableEditing = () => {
    setEditMode(null);
  };

  const updateJob = async (jobId) => {
    const updateJob = myJobs.find((job) => job._id === jobId);
    axios
      .put(`http://localhost:4000/api/v1/job/update/${jobId}`, updateJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditMode(null);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const deleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const changeField = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="myJobs page">
      <div className="container">
        <h1>Your Job Offers</h1>
        {myJobs.length > 0 ? (
          <div className="banner">
            {myJobs.map((element) => (
              <div className="card" key={element._id}>
                <div className="content p-5">
                  <div className="short_fields">
                    <div>
                      <span>Title:</span>
                      <input
                        type="text"
                        disabled={editMode !== element._id}
                        value={element.title}
                        onChange={(e) =>
                          changeField(element._id, "title", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <span>Category:</span>
                      <select
                        value={element.category}
                        onChange={(e) =>
                          changeField(element._id, "category", e.target.value)
                        }
                        disabled={editMode !== element._id}
                      >
                        <option value="">Select Category</option>
                        <option value="Graphics & Design">
                          Graphics & Design
                        </option>
                        <option value="Mobile App Development">
                          Mobile App Development
                        </option>
                        <option value="Frontend Web Development">
                          Frontend Web Development
                        </option>
                        <option value="MERN Stack Development">
                          MERN Stack Development
                        </option>
                        <option value="Account & Finance">
                          Account & Finance
                        </option>
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
                        <option value="Data Entry Operator">
                          Data Entry Operator
                        </option>
                      </select>
                    </div>
                    <div>
                      <span>Country:</span>
                      <input
                        type="text"
                        disabled={editMode !== element._id}
                        value={element.country}
                        onChange={(e) =>
                          changeField(element._id, "country", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <span>City:</span>
                      <input
                        type="text"
                        disabled={editMode !== element._id}
                        value={element.city}
                        onChange={(e) =>
                          changeField(element._id, "city", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <span>
                        Salary:
                        {element.fixSalary ? (
                          <input
                            type="number"
                            disabled={editMode !== element._id}
                            value={element.fixSalary}
                            onChange={(e) =>
                              changeField(
                                element._id,
                                "fixSalary",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <>
                            <input
                              type="number"
                              disabled={editMode !== element._id}
                              value={element.salaryFrom}
                              onChange={(e) =>
                                changeField(
                                  element._id,
                                  "salaryFrom",
                                  e.target.value
                                )
                              }
                            />
                            <input
                              type="number"
                              disabled={editMode !== element._id}
                              value={element.salaryTo}
                              onChange={(e) =>
                                changeField(
                                  element._id,
                                  "salaryTo",
                                  e.target.value
                                )
                              }
                            />
                          </>
                        )}
                      </span>
                    </div>
                    <div>
                      <span>Expired:</span>
                      <select
                        value={element.expired}
                        onChange={(e) =>
                          changeField(element._id, "expired", e.target.value)
                        }
                        disabled={editMode !== element._id}
                      >
                        <option value={true}>TRUE</option>
                        <option value={false}>FALSE</option>
                      </select>
                    </div>
                  </div>
                  <div className="long_field">
                    <div>
                      <span>Location:</span>
                      <textarea
                        rows={5}
                        value={element.location}
                        onChange={(e) =>
                          changeField(element._id, "location", e.target.value)
                        }
                        disabled={editMode !== element._id}
                      ></textarea>
                    </div>
                    <div>
                      <span>Description:</span>
                      <textarea
                        rows={5}
                        value={element.description}
                        onChange={(e) =>
                          changeField(
                            element._id,
                            "description",
                            e.target.value
                          )
                        }
                        disabled={editMode !== element._id}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="button_wrapper">
                  <div className="edit_btn_wrapper">
                    {editMode === element._id ? (
                      <>
                        <button
                          onClick={() => updateJob(element._id)}
                          className="check_btn"
                        >
                          <FaCheck />
                        </button>
                        <button onClick={disableEditing} className="cross_btn">
                          <RxCross2 />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => enableEditing(element._id)}
                        className="edit_btn"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => deleteJob(element._id)}
                    className="delete_btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No Job Post Yet!!</p>
        )}
      </div>
    </section>
  );
};

export default MyJobs;
