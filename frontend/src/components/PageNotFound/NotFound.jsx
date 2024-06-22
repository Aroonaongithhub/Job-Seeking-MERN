import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <section className="page notfound">
      <div className="content">
        <img src="/404.gif" alt="page not found" />
        <Link variant="outline-dark" to={"/"} size="lg">
          Back To Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
