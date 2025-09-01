//@ts-nocheck
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import User from "./Pages/User/User";
import Audit from "./Pages/Audit/Audit";
import Login from "./Pages/Login/Login";
import Scene from "./Pages/Scene/Scene";
import Modal from "./Components/Modal/Modal";
import PrivateRoutes from "./utils/PrivateRoute";
import Products from "./Pages/Products/Products";
import Dashboard from "./Pages/Dashboard/Dashboard";
import CmsLayout from "./Pages/CMS_Layout/CmsLayout";
import Filters from "./Pages/Settings/Filters/Filters";
import Categories from "./Pages/Categories/Categories";
import UnityScene from "./Pages/UnityScene/UnityScene";
import HomeLayout from "./Pages/HomeLayout/HomeLayout";
import FileLibrary from "./Pages/FileLibrary/FileLibrary";
import Interactions from "./Pages/Interactions/Interactions";
import ShareIcon from "./Pages/Settings/ShareIcon/ShareIcon";
import SceneCreate from "./Components/SceneCreate/SceneCreate";
import UsersCreate from "./Components/UsersCreate/UsersCreate";
import SceneGroup from "./Pages/Settings/SceneGroup/SceneGroup";
import ThemeOptions from "./Pages/Settings/ThemeOptions/ThemeOptions";
import ProductsCreate from "./Components/ProductsCreate/ProductsCreate";
import CategoryCreate from "./Components/CategoryCreate/CategoryCreate";
import BasicSettings from "./Pages/Settings/BasicSettings/BasicSettings";
import ProductCategories from "./Pages/ProductCategories/ProductCategories";
import UnitySceneCreate from "./Components/UnitySceneCreate/UnitySceneCreate";
import HomepageOptions from "./Pages/Settings/HomepageOptions/HomepageOptions";
import InteractionCreate from "./Components/InteractionCreate/InteractionCreate";
import SceneGroupCreate from "./Pages/Settings/SceneGroup/SceneGroupCreate/SceneGroupCreate";
import ProductCategoryCreate from "./Components/ProductCategoryCreate/ProductCategoryCreate";
import SectorLayout from "./Pages/SectorLayout/SectorLayout";
import CategoryFilters from "./Pages/Category-Filter/CategoryFilters";
import ViewUnity from "./Components/ViewUnity/ViewUnity";

import { useEffect, useLayoutEffect, useState } from "react";
import NotFound from "./Components/404 Not Found/NotFound";
import { useGetLoggedInUser } from "./api/loggedinUser";
import Unauthorized from "./Components/Unauthorized/Unauthorized";
import ProtectedRoutes from "./utils/ProtectedRoutes";
// import "rc-color-picker/assets/index.css";
import { useGetConfig } from "./api/config";
import { Helmet } from "react-helmet";
import { Spin } from "antd";

function App() {
  const themes = JSON.parse(localStorage.getItem("theme"));
  const [immersive, setImmersive] = useState<Boolean>();

  const {
    data,
    isLoading: isLoadingConfig,
    isSuccess: isSuccessConfig,
  } = useGetConfig();

  // // side effect to update the font of the application in initial page load
  // useLayoutEffect(() => {
  //   //updating the primary color property of nav bar dynamically
  //   document.documentElement.style.setProperty(
  //     "--fonts-options",
  //     themes?.google_font
  //   );
  // }, [themes]);


//Added
  useLayoutEffect(() => {
  if (themes?.google_font) {
    document.documentElement.style.setProperty(
      "--fonts-options",
      themes.google_font
    );
  } else {
    console.warn("Google font is missing from theme.");
  }
}, [themes]);


  useEffect(() => {
    if (isSuccessConfig && data?.data?.immersive_experience === true) {
      setImmersive(true);
    } else {
      setImmersive(false);
    }

    if (isSuccessConfig && data?.data?.theme_settings) {
      localStorage.setItem("theme", JSON.stringify(data?.data?.theme_settings));
    }
  }, [isSuccessConfig, data]);

  // roles that controls the accessing certain features
  const { data: loggedInUser, isLoading } = useGetLoggedInUser();

  if (isLoading || isLoadingConfig ) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spin />
      </div>
    );
  } else {
    return (
      <>


{themes?.google_font && (
  <Helmet>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link
      href={`https://fonts.googleapis.com/css2?family=${themes.google_font}:wght@100;200;300;400;500;600;700;800;900&display=swap`}
      rel="stylesheet"
    />
  </Helmet>
)}

      
        {/* <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href={`https://fonts.googleapis.com/css2?family=${themes.google_font}:wght@100;200;300;400;500;600;700;800;900&display=swap`}
            rel="stylesheet"
          />
        </Helmet> */}
        <div className="App">
          <ToastContainer />
          <Routes>
            <Route
              element={
                <PrivateRoutes
                  browseWithoutLogin={data?.data?.browse_without_login}
                />
              }
            >
              <Route
                path="/"
                element={<HomeLayout user={loggedInUser?.data} />}
              >
                {/* Protecting the route while immersive experience is true

              */}
                {immersive === false && (
                  <>
                    <Route path="/sector/:slug" element={<SectorLayout />} />
                  </>
                )}
                <Route
                  path="/scene/:teleportationId"
                  element={<Navigate to="/" />}
                />
              </Route>
              <Route path="/unity-scene/:id" element={<ViewUnity />} />

              <Route
                path="/web-twinprocms"
                element={
                  <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                    <CmsLayout
                      user={loggedInUser?.data}
                      isLoading={isLoading}
                    />
                  </ProtectedRoutes>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                {/* loggedInUser pass as the props to the protected route */}
                <Route path="scene">
                  <Route
                    index
                    element={
                      <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                        <Scene />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="create"
                    element={
                      <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                        <SceneCreate />
                      </ProtectedRoutes>
                    }
                  />
                  <Route path=":id/update" element={<SceneCreate />} />
                </Route>
                <Route path="interaction">
                  <Route
                    index
                    element={
                      <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                        <Interactions />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="create"
                    element={
                      <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                        <InteractionCreate />
                      </ProtectedRoutes>
                    }
                  />
                  <Route path="update/:ID" element={<InteractionCreate />} />
                </Route>
                <Route path="categories">
                  <Route
                    index
                    element={
                      <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                        <Categories />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="create"
                    element={
                      <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                        <CategoryCreate />
                      </ProtectedRoutes>
                    }
                  />
                  <Route path=":id/update" element={<CategoryCreate />} />
                </Route>
                <Route
                  path="category-filters"
                  element={
                    <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                      <CategoryFilters />
                    </ProtectedRoutes>
                  }
                />
                <Route path="product-category">
                  <Route
                    index
                    element={
                      <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                        <ProductCategories />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="create"
                    element={
                      <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                        <ProductCategoryCreate />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path=":id/update"
                    element={<ProductCategoryCreate />}
                  />
                </Route>
                <Route path="unity-scene">
                  <Route index element={<UnityScene />} />
                  <Route path="create" element={<UnitySceneCreate />} />
                  <Route path=":id/update" element={<UnitySceneCreate />} />
                </Route>
                <Route path="products">
                  <Route
                    index
                    element={
                      <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                        <Products />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="create"
                    element={
                      <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                        <ProductsCreate />
                      </ProtectedRoutes>
                    }
                  />
                  <Route path=":id/update" element={<ProductsCreate />} />
                </Route>
                <Route path="users">
                  <Route
                    index
                    element={
                      <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                        <User />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="create"
                    element={
                      <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                        <UsersCreate />
                      </ProtectedRoutes>
                    }
                  />
                  <Route path=":id/update" element={<UsersCreate />} />
                </Route>
                <Route path="audit">
                  <Route
                    index
                    element={
                      <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                        <Audit />
                      </ProtectedRoutes>
                    }
                  />
                </Route>
                <Route path="file-library">
                  <Route index element={<FileLibrary />} />
                  <Route path=":id" element={<FileLibrary />} />
                </Route>
                <Route
                  path="basic-settings"
                  element={
                    <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                      <BasicSettings />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="filters"
                  element={
                    <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                      <Filters />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="homepage-options"
                  element={
                    <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                      <HomepageOptions />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="share-icon"
                  element={
                    <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                      <ShareIcon />
                    </ProtectedRoutes>
                  }
                />
                <Route path="scene-group">
                  <Route
                    index
                    element={
                      <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                        <SceneGroup />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="create"
                    element={
                      <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                        <SceneGroupCreate />
                      </ProtectedRoutes>
                    }
                  />
                  <Route path=":ID/update" element={<SceneGroupCreate />} />
                </Route>
                <Route
                  path="theme-options"
                  element={
                    <ProtectedRoutes loggedInUser={loggedInUser?.data}>
                      <ThemeOptions />
                    </ProtectedRoutes>
                  }
                />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route
              path="/modal"
              element={
                <Modal
                  icon={<FontAwesomeIcon icon={faCircleExclamation} />}
                  title={"Are you sure?"}
                  subtitle={"You wont be able to revert this!"}
                />
              }
            />

            <Route path="/not-found" element={<NotFound />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
