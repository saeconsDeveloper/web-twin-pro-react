import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import Card from "../../Components/Card/Card";
import styleLayout from "./CmsLayout.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";

const CmsLayout = ({ user }) => {
  //state to hold the visibility of side bar toggle
  const [visibility, setVisibility] = useState(false);

  return (
    <>
      <div className={styleLayout["wrapper"]}>
        <div
          className={`${styleLayout["sidebar-wrapper"]} ${
            visibility && styleLayout["show-sidebar"]
          }`}
        >
          {/* <div className={visibility ? styleLayout["sidebar-wrapper"] : styleLayout['show-sidebar']}> */}
          <Sidebar
            visibility={visibility}
            setVisibility={setVisibility}
            user={user}
          />
        </div>
        <div className={styleLayout["nav-container"]}>
          <Navbar setVisibility={setVisibility} user={user} />
        </div>
        <div className={styleLayout["card-content-wrapper"]}>
          <Card>
            <Outlet />
          </Card>
        </div>
      </div>
      <div
        className={visibility ? styleLayout.overlay : ""}
        onClick={() => setVisibility(prev => !prev)}
      ></div>
    </>
  );
};

export default CmsLayout;
