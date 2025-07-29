import React from "react";

import styleNotFound from "./NotFound.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className={styleNotFound["entire-container"]}>
      <div className={styleNotFound["text-btn-container"]}>
        <h1>404</h1>
        <h3>Scene Not Found</h3>
        <Link to="/">Go Back</Link>
      </div>
    </section>
  );
};

export default NotFound;
