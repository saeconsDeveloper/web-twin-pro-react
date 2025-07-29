import React from "react";
import styleUnauthorized from "./Unauthorized.module.css";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <section className={styleUnauthorized["entire-container"]}>
      <div className={styleUnauthorized["text-btn-container"]}>
        <h1>403</h1>
        <h3>Unauthorized</h3>
        <span>Please contact system admin for access privilege.</span>
        <Link to="/">Go Back</Link>
      </div>
    </section>
  );
};

export default Unauthorized;
