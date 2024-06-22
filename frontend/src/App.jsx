import "./App.css";
import React, { useEffect, useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Context } from "./main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignUp from "./components/Authorization/SignUp";
import SignIn from "./components/Authorization/SignIn";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetals from "./components/Job/JobDetals";
import PostJobs from "./components/Job/PostJobs";
import MyJobs from "./components/Job/MyJobs";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import NavBar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import NotFound from "./components/PageNotFound/NotFound";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  // useEffect will load every time when isAuthorized value gets changed
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          { withCredentials: true }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (err) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);
  return (
    <>
      <BrowserRouter className="scroll-container">
        <NavBar />
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/post" element={<PostJobs />} />
          <Route path="/job/jobs" element={<Jobs />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="/job/:id" element={<JobDetals />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/application/me" element={<MyApplications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
