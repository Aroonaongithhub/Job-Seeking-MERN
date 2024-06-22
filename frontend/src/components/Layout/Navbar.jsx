import "./Navbar.css";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrLogout } from "react-icons/gr";
const NavBar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  // useNavigatefrom react router dom
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/job.gif" alt="logo" />
        </div>
        {/* Nav Items */}
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/job/jobs"} onClick={() => setShow(false)}>
              All Jobs
            </Link>
          </li>
          <li>
            <Link to={"/application/me"} onClick={() => setShow(false)}>
              {user && user.role === "Employee"
                ? "Applicants"
                : "My Applications"}
            </Link>
          </li>
          {user && user.role === "Employee" ? (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)}>
                  New Post
                </Link>
              </li>
              <li>
                <Link to={"/job/me"} onClick={() => setShow(false)}>
                  Your Jobs
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
        <button
          onClick={handleLogout}
          className={!show ? "menu" : "show-menu menu"}
        >
          Logout
          <GrLogout />
        </button>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
