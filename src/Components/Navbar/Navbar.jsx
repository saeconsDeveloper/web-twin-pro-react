import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styleNav from "./Navbar.module.css";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  faBars,
  faUnlockKeyhole,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import config from "../../config/config";

const Navbar = ({ setVisibility, user }) => {
  const title = useLocation();

  console.log(title?.pathname);
  const [showDropDown, setShowDropdown] = useState(false);

  const determineNavBarTitle = () => {
    if (
      title?.pathname === "/web-twinprocms/dashboard" ||
      title?.pathname === "/web-twinprocms"
    ) {
      return 1;
    } else if (title?.pathname === "/web-twinprocms/scene") {
      return 2;
    } else if (title?.pathname === "/web-twinprocms/interaction") {
      return 3;
    } else if (title?.pathname === "/web-twinprocms/categories") {
      return 4;
    } else if (title?.pathname === "/web-twinprocms/category-filters") {
      return 5;
    } else if (title?.pathname === "/web-twinprocms/product-category") {
      return 6;
    } else if (title?.pathname === "/web-twinprocms/unity-scene") {
      return 7;
    } else if (title?.pathname === "/web-twinprocms/products") {
      return 8;
    } else if (title?.pathname === "/web-twinprocms/users") {
      return 9;
    } else if (title?.pathname === "/web-twinprocms/audit") {
      return 10;
    } else if (title?.pathname === "/web-twinprocms/file-library") {
      return 11;
    } else if (title?.pathname === "/web-twinprocms/basic-settings") {
      return 12;
    } else if (title?.pathname === "/web-twinprocms/homepage-options") {
      return 13;
    } else if (title?.pathname === "/web-twinprocms/theme-options") {
      return 14;
    } else if (title?.pathname === "/web-twinprocms/share-icon") {
      return 15;
    } else if (title?.pathname === "/web-twinprocms/scene-group") {
      return 16;
    } else if (title?.pathname === "/web-twinprocms/filters") {
      return 17;
    }
  };

  const outcome = determineNavBarTitle();

  return (
    <nav className={styleNav["nav-bar"]}>
      <div className={styleNav.title}>
        <FontAwesomeIcon
          icon={faBars}
          className={styleNav["hamburger-menu"]}
          onClick={() => setVisibility(prev => !prev)}
        />
        <span>
          {/* {title.state === null ? <span>Dashboard</span> : title?.state?.title} */}
          {(() => {
            switch (outcome) {
              case 1:
                return "SCCP Pro CMS";
              case 2:
                return "Scenes";
              case 3:
                return "Interactions";
              case 4:
                return "Categories";
              case 5:
                return "Category Filter";
              case 6:
                return "Product Categories";
              case 7:
                return "Unity Scene";
              case 8:
                return "Products";
              case 9:
                return "Users";
              case 10:
                return "Audit";
              case 11:
                return "File Library";
              case 12:
                return "Basic Settings";
              case 13:
                return "Homepage Options";
              case 14:
                return "Theme Options";
              case 15:
                return "Share Icons";
              case 16:
                return "Scene Group";
              case 17:
                return "Filters";

              default:
                return "";
            }
          })()}
        </span>
      </div>
      <div className={styleNav["link-logo-container"]}>
        <Link to="/">Home</Link>
        <div className={styleNav["logo-container"]}>
          <figure onClick={() => setShowDropdown(prev => !prev)}>
            <img
              style={{ width: "4rem", height: "auto", marginRight: "0.5rem" }}
              src={`${window.location.origin}/assets/Home_logo.bmp`}
              alt="home-logo"
            />
          </figure>
          {showDropDown && (
            <div className={styleNav["nav-dropdown"]}>
              <span className={styleNav["dynamic-email"]}>{user?.email}</span>
              <hr />
              <span>
                <FontAwesomeIcon icon={faUnlockKeyhole} /> Change Password
              </span>
              <span>
                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
