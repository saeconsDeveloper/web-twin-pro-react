import {
  MdDashboard,
  MdOutlineImage,
  MdLocationCity,
  MdSettings,
  MdOutlineAirplay,
  MdSupervisorAccount,
  MdDvr,
  MdDescription,
  MdAdb,
  MdAndroid,
} from "react-icons/md";
import { Dropdown } from "antd";
import {
  faAngleDown,
  faPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CONFIG } from "../../config";
import styleSidebar from "./Sidebar.module.css";
import { useGetBasicSettingsList } from "../../api/settings";

const Sidebar = ({ setVisibility, user }) => {
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [showSettingsList, setShowSettingsList] = useState(false);
  const navigate = useNavigate();

  const {
    data: basicSettingData,
    isLoading: isLoadingBasicSettings,
    isSuccess: isSuccessBasicSettings,
  } = useGetBasicSettingsList();

  // Initially every sidebar state is false; according to role of the user it gets populated
  const [sideBarValue, setSideBarValue] = useState({
    dashboard: false,
    scene: false,
    interaction: false,
    categories: false,
    productCategories: false,
    unityScene: false,
    products: false,
    users: false,
    audit: false,
    fileLibrary: false,
    settings: false,
  });

  const handleLogout = () => {
    localStorage.removeItem("Token");
    navigate("/login");
  };

  const items = [
    {
      label: <strong>SCCP</strong>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: <p>{user?.email}</p>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <button onClick={handleLogout}>Logout</button>,
      key: "3",
    },
  ];

  useEffect(() => {
    switch (user?.role[0]) {
      case "Experience Designer":
        setSideBarValue(prevState => {
          return {
            ...prevState,
            fileLibrary: true,
            dashboard: true,
            unityScene: true,
          };
        });

        break;
      case "Uberadmin":
        setSideBarValue(prevState => {
          return {
            ...prevState,
            audit: true,
            categories: true,
            dashboard: true,
            fileLibrary: true,
            interaction: true,
            productCategories: true,
            products: true,
            scene: true,
            settings: true,
            unityScene: true,
            users: true,
          };
        });
        break;
      case "Superadmin":
        setSideBarValue(prevState => {
          return {
            ...prevState,
            dashboard: true,
            fileLibrary: true,
            scene: true,
            unityScene: true,
            products: true,
            productCategories: true,
            users: true,
            interaction: true,
            categories: true,
          };
        });

        break;
      case "Developer":
        setSideBarValue(prevState => {
          return { ...prevState, unityScene: true };
        });
        break;

      case "Viewer":
        setSideBarValue(prevState => {
          return { ...prevState, viewer: false };
        });

        break;
      case "Product Manager":
        setSideBarValue(prevState => {
          return {
            ...prevState,
            dashboard: true,
            products: true,
            fileLibrary: true,
          };
        });

        break;
      default:
        console.log("helo");
        break;
    }
  }, [user]);

  return (
    <>
      <aside className={styleSidebar["sidebar-container"]}>
        <div>
          <div className={styleSidebar["sidebar-icon-wrapper"]}>
            <div className={styleSidebar.wrapper}>
              <figure>
                <img
                  style={{ width: "6rem", height: "auto" }}
                  src={
                    !isLoadingBasicSettings &&
                    isSuccessBasicSettings &&
                    basicSettingData?.navbar_logo
                      ? `${CONFIG.BASE_URI}${basicSettingData?.navbar_logo}`
                      : `${window.location.origin}/assets/company_logo.png`
                  }
                  alt="company-logo"
                />
              </figure>
              <Dropdown menu={{ items }} placement="bottomRight">
                <FontAwesomeIcon icon={faAngleDown} />
              </Dropdown>
            </div>
          </div>
          <div>
            <ul className={styleSidebar["sidebar-item-container"]}>
              {sideBarValue?.dashboard && (
                <li>
                  <div className={styleSidebar["sidebar-image-title-wrapper"]}>
                    <MdDashboard size={28} />
                    <Link
                      to="dashboard"
                      state={{ title: "Dashboard" }}
                      onClick={() => setVisibility(false)}
                    >
                      Dashboard
                    </Link>
                  </div>
                </li>
              )}

              {sideBarValue?.scene && (
                <li>
                  <div className={styleSidebar["sidebar-image-title-wrapper"]}>
                    <MdOutlineImage size={28} />

                    <Link
                      to={"scene"}
                      state={{ title: "Scene" }}
                      onClick={() => setVisibility(false)}
                    >
                      Scene
                    </Link>
                  </div>
                </li>
              )}

              {sideBarValue?.interaction && (
                <li>
                  <div className={styleSidebar["sidebar-image-title-wrapper"]}>
                    <MdOutlineImage size={28} />
                    <Link
                      to="interaction"
                      state={{ title: "Interations" }}
                      onClick={() => setVisibility(false)}
                    >
                      Interactions
                    </Link>
                  </div>
                </li>
              )}

              {sideBarValue?.categories && (
                <li onClick={() => setShowCategoryList(prev => !prev)}>
                  <div
                    className={`${
                      styleSidebar["sidebar-image-title-wrapper"]
                    } ${showCategoryList && styleSidebar.bg}`}
                  >
                    <MdLocationCity size={28} />
                    <Link to="#">Categories</Link>
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{
                        color: " rgba(255, 255, 255, 0.24)",
                        fontWeight: "400",
                      }}
                    />
                  </div>

                  <div className={styleSidebar["sidebar-sub-item-container"]}>
                    {showCategoryList && (
                      <ul>
                        <li>
                          <Link
                            to="categories"
                            state={{ title: "Categories" }}
                            onClick={() => setVisibility(false)}
                          >
                            {" "}
                            Categories
                          </Link>
                        </li>
                        <li>
                          <Link to="category-filters"> Categories Filter</Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </li>
              )}
              {sideBarValue?.productCategories && (
                <li>
                  <div className={styleSidebar["sidebar-image-title-wrapper"]}>
                    <MdAdb size={28} />
                    <Link
                      to="product-category"
                      state={{ title: "Product Categories" }}
                      onClick={() => setVisibility(false)}
                    >
                      Product Categories
                    </Link>
                  </div>
                </li>
              )}
              {sideBarValue?.unityScene && (
                <li>
                  <div className={styleSidebar["sidebar-image-title-wrapper"]}>
                    <MdOutlineAirplay size={28} />
                    <Link
                      to="unity-scene"
                      state={{ title: "Unity Scene" }}
                      onClick={() => setVisibility(false)}
                    >
                      Unity Scene
                    </Link>
                  </div>
                </li>
              )}
              {sideBarValue?.products && (
                <li>
                  <div className={styleSidebar["sidebar-image-title-wrapper"]}>
                    <MdAdb size={28} />
                    <Link
                      to="products"
                      state={{ title: "Products" }}
                      onClick={() => setVisibility(false)}
                    >
                      Products
                    </Link>
                  </div>
                </li>
              )}
              {sideBarValue?.users && (
                <li>
                  <div className={styleSidebar["sidebar-image-title-wrapper"]}>
                    <MdSupervisorAccount size={28} />
                    <Link
                      to="users"
                      state={{ title: "User" }}
                      onClick={() => setVisibility(false)}
                    >
                      Users
                    </Link>
                  </div>
                </li>
              )}
              {sideBarValue?.audit && (
                <li>
                  <div className={styleSidebar["sidebar-image-title-wrapper"]}>
                    <MdDvr size={28} />
                    <Link
                      to="audit"
                      state={{ title: "Audit" }}
                      onClick={() => setVisibility(false)}
                    >
                      Audit
                    </Link>
                  </div>
                </li>
              )}
              {sideBarValue?.fileLibrary && (
                <li>
                  <div className={styleSidebar["sidebar-image-title-wrapper"]}>
                    <MdDescription size={28} />
                    <Link
                      to="file-library"
                      onClick={() => setVisibility(false)}
                    >
                      File Library
                    </Link>
                  </div>
                </li>
              )}

              {sideBarValue?.settings && (
                <li onClick={() => setShowSettingsList(prev => !prev)}>
                  <div className={styleSidebar["sidebar-image-title-wrapper"]}>
                    <MdSettings size={28} />

                    <Link to="#">Settings</Link>
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{
                        color: " rgba(255, 255, 255, 0.24)",
                        fontWeight: "400",
                      }}
                    />
                  </div>

                  <div className={styleSidebar["sidebar-sub-item-container"]}>
                    {showSettingsList && (
                      <ul>
                        <li>
                          <Link
                            to="basic-settings"
                            state={{ title: "Basic Settings" }}
                            onClick={() => setVisibility(false)}
                          >
                            Basic Settings
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="homepage-options"
                            state={{ title: "HomePage Options" }}
                            onClick={() => setVisibility(false)}
                          >
                            HomePage Options
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="theme-options"
                            state={{ title: "Theme Options" }}
                            onClick={() => setVisibility(false)}
                          >
                            Theme Options
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="share-icon"
                            state={{ title: "Share Icon" }}
                            onClick={() => setVisibility(false)}
                          >
                            Share Icon
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="scene-group"
                            state={{ title: "Scene Group" }}
                            onClick={() => setVisibility(false)}
                          >
                            Scene Group
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="filters"
                            state={{ title: "Filters" }}
                            onClick={() => setVisibility(false)}
                          >
                            Filters
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
        <footer>
          <div onClick={handleLogout}>
            <span>Logout</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </div>
        </footer>
      </aside>
    </>
  );
};

export default Sidebar;
