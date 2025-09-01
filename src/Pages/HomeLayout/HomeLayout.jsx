import { useState, useLayoutEffect, useEffect } from "react";
import styleHomeLayout from "./HomeLayout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEnvelope,
  faGauge,
  faLink,
  faRightFromBracket,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";

import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useGetCategoriesList2 } from "../../api/categories";
import UnityRenderer from "../../Components/UnityRenderer/UnityRenderer";
import { useGetSceneDetail } from "../../api/scenes";
import { useGetShareIconsList } from "../../api/settings";
import { useGetBasicSettingsList } from "../../api/settings";
import { useContactUs } from "../../api/contactUs";
import { useGetSearchInHomePage } from "../../api/homePageSearch";
import { useGetConfig } from "../../api/config";
import { useLogout } from "../../api/login";
import ReactPlayer from "react-player";
import { CONFIG } from "../../config";
import { useGetSceneCategoriesById } from "../../api/sceneCategoriesById";
import Head from "../../Components/Head";
import swal from "sweetalert";

const HomeLayout = ({ user }) => {
  const themes = JSON.parse(localStorage.getItem("theme"));
  const token = JSON.parse(localStorage.getItem("Token"));

  const locations = useLocation();

  // state to show and hide the CMS dropdown whether to show or not
  const [showCmsDropdown, setShowCmsDropdown] = useState({
    cms: true,
  });

  const navigate = useNavigate();
  // if indenfiy the user role with 'Viewer' route to cms is blocked
  useLayoutEffect(() => {
    switch (user?.role[0]) {
      case "Viewer":
        setShowCmsDropdown(prev => {
          return { ...prev, cms: false };
        });
        break;
      default:
      // console.log(user);
    }
  }, [user]);

  const {
    data: config,
    isLoading: isLoadingConfig,
    isSuccess: isSuccessConfig,
  } = useGetConfig();

  // state to handle scene animation play and pause
  const [pauseAnimation, setPauseAnimation] = useState(true);

  // state to handle the sound of scene
  const [muteSound, setMuteSound] = useState(true);

  const [isFocused, setIsFocused] = useState(false);

  // states for contact us your name
  const [yourName, setYourName] = useState("");

  // states for contact us your email
  const [yourEmail, setYourEmail] = useState("");

  // states for contact us your message
  const [yourMessage, setYourMessage] = useState("");

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [productArray, setProductArray] = useState(null);
  const [overlayProduct, setOverlayProduct] = useState(null);
  const [videoArray, setVideoArray] = useState(null);
  const [telportationArray, setTelportationArray] = useState(null);
  const [annotationObject, setAnnotationObject] = useState(null);
  const [showImmersive, setShowImmersive] = useState(false);

  const [slugId, setSlugId] = useState();

  // const URL = `/web-twinprocms/scene-categories/`;
  const { data: sceneCategoriesById, isLoading: isLoadingSceneCategoriesById } =
    useGetSceneCategoriesById(slugId || localStorage.getItem("slug-id"));

  // console.log(sceneCategoriesById, "sceneCategoriesById");

  useEffect(() => {
    if (!isLoadingConfig && config?.data?.immersive_experience === false) {
      setShowImmersive(true);
    } else {
      setShowImmersive(false);
    }
  }, [isLoadingConfig, config]);

  // blocking the user with the role of 'Viewer' to go to CMS side

  // state to toggle share icon element
  const [showShare, setShowShare] = useState(false);
  // state to show which floating icon is clicked
  const [floatingOption, setFloatingOption] = useState("");
  // state to hold search value
  const [searcKey, setSearchKey] = useState("");

  // state to hold the name of scene category
  const [breadCrumb, setBreadCrumb] = useState({});

  const { slug, teleportationId } = useParams();
  const { data } = useGetCategoriesList2();

  // console.log(data, "useGetCategoriesList2");

  //dependent query. only runs when homePageOption?.scene is available
  /* 
    1) checks for the teleportation id
    2) if immersive experience is true scene_id is passed
    3) if immersive experience is false and if there is any associated scene then;  id from associated scene will be passed
    4) if there is no associated scenes then; unity scene id is passed
   */

  const {
    data: sceneDetailApi,
    isLoading,
    isSuccess,
  } = useGetSceneDetail(
    teleportationId
      ? teleportationId
      : config?.data?.immersive_experience === true
      ? config?.data?.immersive_details?.scene_id
      : config?.data?.immersive_experience === false
      ? config?.data?.homepage?.associated_scene?.id
      : null
  );

  useEffect(() => {
    sceneDetailApi?.scene_categories?.map(item => {
      return setBreadCrumb(prev => {
        return { ...prev, name: item?.name, scene: sceneDetailApi?.title };
      });
    });
  }, [sceneDetailApi]);

  const { mutateAsync, isLoading: cotactLoading } = useContactUs();
  // api to get the share icon to display on floating menu
  const { data: shareIcons } = useGetShareIconsList();
  // api to get the data of the basic settings
  const { data: basicSettingList, isLoading: basicSettingLoading } =
    useGetBasicSettingsList();

  // url for search api
  const searchURL = `/web-twinprocms/search?key=${searcKey ? searcKey : null}`;

  // api to get the search result
  const { data: search, isLoading: searchLoading } =
    useGetSearchInHomePage(searchURL);

  if (!isLoading) {
    try {
      let _productArray = {};
      let _overlayProduct = [];
      sceneDetailApi.product_categories.map(item => {
        if (!item.product_button_id) {
          _overlayProduct.push(item);
        }
        _productArray[item.id] = item.product_button_id;
      });
      console.log(_overlayProduct, "overlay");
      if (!productArray) {
        setProductArray(_productArray);
      }
      if (!overlayProduct) {
        setOverlayProduct(_overlayProduct);
      }
      let _telportationArray = [];
      let _annotationArray = [];
      let _videoArray = {};
      sceneDetailApi.interactions.map(item => {
        switch (item.action_type) {
          case "Teleportation":
            _telportationArray.push({
              teleportId: item.unity_scene_teleportation_id,
              teleportLink: `/scene/${item.scene}`,
            });

            break;
          case "Video":
            _videoArray[item.unity_scene_video_id] = item.embed_link;
            break;
          case "Annotation":
            _annotationArray.push({
              annotation_id: item.unity_scene_annotation_id,
              action_number: 1,
              title: item.name,
              text: item.name,
            });
          default:
            break;
        }
      });
      if (!telportationArray) {
        setTelportationArray(_telportationArray);
      }
      if (!videoArray) {
        setVideoArray(_videoArray);
      }
      if (!annotationObject) {
        // this is the strucutre that unity needs
        setAnnotationObject({
          annotations: _annotationArray,
        });
      }
    } catch (error) {
      console.log("error");
    }
    //creating product array object to feed into the scene
  }
  // if(!isLoading){
  //   console.log(sceneDetailApi, "data");
  //   let _productArray=[];

  //     sceneDetailApi.product_categories.map(item => setProductArray([...productArray, item.product_categories]))
  //     console.log(productArray, 'inside if')

  // }

  const [sceneDetail, setSceneDetail] = useState({
    unitySceneName: "smarthome_reworked1612v1",
    productPanel: ["Products_Cata_SH_15"],
    teleportation: {
      teleportId: "23",
      teleportLink: "/scene/6",
    },
  });

  const { mutateAsync: mutateAsyncLogout, isError, error } = useLogout();
  const handleLogout = () => {
    const storedToken = localStorage.getItem("Token");

    const { refresh_token } = storedToken && JSON.parse(storedToken ?? "");

    mutateAsyncLogout({ refresh: refresh_token }).then(response => {
      localStorage.removeItem("Token");
      navigate("/login");
    });
  };

  const handleIconClick = menu => {
    setFloatingOption(menu);
    setShowShare(prev => !prev);
  };

  const handleLinkShare = (event, site) => {
    event.preventDefault();
    let width = 575,
      height = 400,
      left = (window.innerWidth - width) / 2,
      top = (window.innerHeight - height) / 2,
      opts =
        "status=1" +
        ",width=" +
        width +
        ",height=" +
        height +
        ",top=" +
        top +
        ",left=" +
        left;
    switch (site) {
      case "Linkedin":
        let linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`;
        window.open(linkedInUrl, "Linkedin", opts);
        break;
      case "Twitter":
        let twitterUrl = `https://twitter.com/intent/tweet?url=${window.location.href}&text=3D%20Virtual%20World`;
        window.open(twitterUrl, "Twitter", opts);
        break;
      case "Pinterest":
        let pinterestUrl =
          "http://pinterest.com/pin/create/button/?description=Checkout%20This%20Awesome%20Scene!}";
        window.open(pinterestUrl, "Pinterest", opts);
        break;
      case "Facebook":
        let facebookUrl = `https://www.facebook.com/sharer.php?u=${window.location.origin}`;
        window.open(facebookUrl, "Facebook", opts);
      default:
        console.log("here");
    }
  };

  // [typeof null -> 'object'];
  //  [Object.is('obj', null) -> true/false]
  //to create side effect to the css variables to change according to the theme setting page values
  useLayoutEffect(() => {
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("header_color_primary") &&
      themes?.header_color_primary !== "#000000"
    ) {
      //updating the primary color property of nav bar dynamically
      document.documentElement.style.setProperty(
        "--header-color-primary",
        themes?.header_color_primary
      );
    }
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("header_color_secondary") &&
      themes?.header_color_secondary !== "#000000"
    ) {
      //updating the secondary color property of search bar bg
      document.documentElement.style.setProperty(
        "--header-color-secondary",
        themes?.header_color_secondary
      );
    }
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("header_input_bg_color") &&
      themes?.header_input_bg_color !== "#000000"
    ) {
      //updating the search bg color dynamically
      document.documentElement.style.setProperty(
        "--header-input-bg-color",
        themes?.header_input_bg_color
      );
    }
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("header_input_text_color") &&
      themes?.header_input_text_color !== "#000000"
    ) {
      //updating the text color of search bar dynamically
      document.documentElement.style.setProperty(
        "--header-input-text-color",
        themes?.header_input_text_color
      );
    }
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("dropdown_main_background_primary") &&
      themes?.dropdown_main_background_primary !== "#000000"
    ) {
      //updating the bg primari color of dropdown dynamically
      document.documentElement.style.setProperty(
        "--dropdown-bg-color-primary",
        themes?.dropdown_main_background_primary
      );
    }
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("dropdown_main_background_secondary") &&
      themes?.dropdown_main_background_secondary !== "#000000"
    ) {
      //updating the bg secondary color of dropdown secondary
      document.documentElement.style.setProperty(
        "--dropdown-bg-color-secondary",
        themes?.dropdown_main_background_secondary
      );
    }
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("dropdown_text_color") &&
      themes?.dropdown_text_color !== "#000000"
    ) {
      //updating the text color of dropdown dynamically
      document.documentElement.style.setProperty(
        "--dropdown-text-color",
        themes?.dropdown_text_color
      );
    }

    //updating the fixed social bar bg primary
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("fixed_social_bar_background_primary") &&
      themes?.fixed_social_bar_background_primary !== "#000000"
    ) {
      document.documentElement.style.setProperty(
        "--fixed-Social-bar-bg-primary",
        themes?.fixed_social_bar_background_primary
      );
    }
    //updating the fixed social bar bg secondary
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("fixed_social_bar_background_secondary") &&
      themes?.fixed_social_bar_background_secondary !== "#000000"
    ) {
      document.documentElement.style.setProperty(
        "--fixed-Social-bar-bg-secondary",
        themes?.fixed_social_bar_background_secondary
      );
    }

    // updating the svg icon bg color
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("fixed_social_bar_icon_background") &&
      themes?.fixed_social_bar_icon_background !== "#000000"
    ) {
      document.documentElement.style.setProperty(
        "--fixed-social-bar-icon-bg",
        themes?.fixed_social_bar_icon_background
      );
    }

    // updating the svg icon color
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("fixed_social_bar_icon_color") &&
      themes?.fixed_social_bar_icon_color !== "#000000"
    ) {
      document.documentElement.style.setProperty(
        "--fixed-social-bar-icon-color",
        themes?.fixed_social_bar_icon_color
      );
    }

    // updating the social popover bg primary color
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("social_popover_background_primary") &&
      themes?.social_popover_background_primary !== "#000000"
    ) {
      document.documentElement.style.setProperty(
        "--floating-social-popover-bg-priamry",
        themes?.social_popover_background_primary
      );
    }

    // updating the social popover bg secondary color
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("social_popover_background_secondary") &&
      themes?.social_popover_background_secondary !== "#000000"
    ) {
      document.documentElement.style.setProperty(
        "--floating-social-popover-bg-secondary",
        themes?.social_popover_background_secondary
      );
    }

    // updating the social popover input field bg colors and icons
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("social_popover_input_field_color") &&
      themes?.social_popover_input_field_color !== "#000000"
    ) {
      document.documentElement.style.setProperty(
        "--floating-social-popover-color",
        themes?.social_popover_input_field_color
      );
    }
    // updating the social popover input field bg colors and icons
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("social_popover_text_color") &&
      themes?.social_popover_text_color !== "#000000"
    ) {
      document.documentElement.style.setProperty(
        "--floating-social-popover-form-input-color",
        themes?.social_popover_text_color
      );
    }
  }, [themes]);

  const handleContactUsSubmit = e => {
    e.preventDefault();
    mutateAsync({
      data: {
        full_name: yourName,
        email: yourEmail,
        message: yourMessage,
      },
    }).then(res => {
      swal({
        icon: "success",
        title: "Thank You for reaching out to us. ",
        text: "Our team will get back to you soon.",
        button: {
          text: "OK",
          value: true,
          visible: true,
          className: "swal-btn",
          closeModal: true,
        },
        closeOnClickOutside: "true",
        timer: 4000,
      });
    });
    setYourName("");
    setYourEmail("");
    setYourMessage("");
  };

  // function to handle scene animation play and pause
  const handlePauseAnimation = () => {
    setPauseAnimation(prev => !prev);
    try {
      window.unityInstance.Module.WebCMS.SetAnimationEnabled(pauseAnimation);
    } catch (error) {
      console.log(error, "error");
    }
  };

  // function to handle animation sound mute and play
  const handleAnimationSound = () => {
    setMuteSound(prev => !prev);
    try {
      window.unityInstance.Module.WebCMS.SetAudioEnabled(muteSound);
    } catch (error) {
      console.log(error);
    }
  };

  // condition to map according to the homepage option value, either image or video or scene
  const determineHomepageOption = () => {
    if (teleportationId) {
      // pass teleportation id to unity renderer component
      return 1;
    } else if (config?.data?.homepage?.type === "IMAGE" && !isLoadingConfig) {
      // apply image from homepage option
      return 2;
    } else if (config?.data?.homepage?.type === "VIDEO" && !isLoadingConfig) {
      // apply video from homepage option
      return 3;
    } else if (
      config?.data?.homepage?.type === "SCENE" &&
      config?.data?.homepage?.associated_scene?.id
    ) {
      // apply scene from homepage option
      return 1;
    } else if (
      config?.data?.homepage?.type === "SCENE" &&
      config?.data?.homepage?.name &&
      !isLoadingConfig &&
      isLoading
    ) {
      return 5;
    } else {
      // apply default scene from homepage api
      return 6;
    }
  };

  // variable to hold the value from switch case
  const outcome = determineHomepageOption();

  useEffect(() => {}, [slugId]);

  const getSlugId = id => {
    setSlugId(id);
    localStorage.setItem("slug-id", id);
  };

  if (isLoadingConfig) {
    return <h1>Loading..</h1>;
  } else {
    return (
      <main className={styleHomeLayout["home-layout-main-container"]}>
        <Head title={config?.data?.title} favicon={config?.data?.favicon} />
        <section className={styleHomeLayout["home-layout-nav-container"]}>
          <nav>
            <div className={styleHomeLayout["logo-search-dropdown-container"]}>
              <div className={styleHomeLayout["logo-home-btn-container"]}>
                <div className={styleHomeLayout["hover-dropdown"]}>
                  <figure className={styleHomeLayout["svg-logo-container"]}>
                     <img
                      src={`${CONFIG.BASE_URI}/${basicSettingList?.navbar_logo}`}
                      alt="company_logo"
                    /> 
                  </figure>

                  {typeof token !== "undefined" &&
                    Object.is(token, null) === false && (
                      <div className={styleHomeLayout["home-layout-dropdown"]}>
                        {showCmsDropdown?.cms === true && (
                          <Link
                            className={styleHomeLayout["dropdown-text"]}
                            to={"/web-twinprocms"}
                            target="_blank"
                          >
                            <span>
                              <FontAwesomeIcon icon={faGauge} /> SCCP Pro
                              CMS
                            </span>
                          </Link>
                        )}
                        <Link
                          className={styleHomeLayout["dropdown-text"]}
                          onClick={handleLogout}
                        >
                          <span>
                            <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                          </span>
                        </Link>
                      </div>
                    )}
                </div>
                {/* hiding the catalog dropdown while the immersive experience is true */}
                {showImmersive === true && (
                  <ul className={styleHomeLayout["sector-whole-wrapper"]}>
                    <li className={styleHomeLayout["home"]}>
                      <Link
                        className={
                          (slug || locations?.pathname !== "/") &&
                          styleHomeLayout["slug-right-arrow"]
                        }
                        to="/"
                      >
                        Home
                      </Link>
                      {data?.length > 0 && (
                        <div className={styleHomeLayout["home-hover-dropdown"]}>
                          {data?.map(
                            item =>
                              item?.show_in_filter && (
                                <Link
                                  key={item.id}
                                  className={styleHomeLayout["catalog-items"]}
                                  to={`/sector/${item.name.toLowerCase()}`}
                                  state={{ id: item.id }}
                                  onClick={() => getSlugId(item.id)}
                                >
                                  <img
                                    src={
                                      item?.image
                                        ? ` ${CONFIG.BASE_URI}${item?.image}`
                                        : `${window.location.origin}/assets/central-plant.png`
                                    }
                                    alt="categories_icon"
                                  />
                                  <p>{item.name}</p>
                                </Link>
                              )
                          )}
                        </div>
                      )}
                    </li>
                    <li className={styleHomeLayout["slug"]}>
                      {slug && <Link>{slug}</Link>}
                      {/* displaying the scene category if we are going to any scene form sector or from CMS */}
                      {!slug &&
                        locations?.pathname !== "/" &&
                        Object.is(breadCrumb, null) === false && (
                          <>
                            <Link
                              className={
                                Object.is(breadCrumb, null) === false &&
                                breadCrumb.name &&
                                styleHomeLayout["slug-right-arrow"]
                              }
                            >
                              {Object.is(sceneDetailApi, null) === false &&
                                breadCrumb?.name}
                            </Link>
                            <Link>
                              {" "}
                              {breadCrumb?.scene || sceneDetailApi?.title}
                            </Link>
                          </>
                        )}
                      {/* displaying the Scene title while going to any scene 
                      {Object.is(sceneDetailApi, null) === false && (
                        <Link>{sceneDetailApi?.title}</Link>
                      )} */}

                      {sceneCategoriesById?.length > 0 && (
                        <div className={styleHomeLayout["slug-hover-dropdown"]}>
                          {console.log(sceneCategoriesById, "slug dropdown")}
                          {sceneCategoriesById?.map(slugTitle => (
                            <Link to={`scene/${slugTitle?.id}`}>
                              <img
                                style={{ width: "40px", height: "auto" }}
                                src={`${CONFIG.BASE_URI}${slugTitle?.image}`}
                                alt="categories_icon"
                              />{" "}
                              <p>{slugTitle?.title} </p>
                            </Link>
                          ))}
                        </div>
                      )}
                    </li>
                  </ul>
                )}
              </div>
              {/* hiding the search bar while immersive experience is ture  */}
              {showImmersive === true && (
                <div className={styleHomeLayout["search-bar-container"]}>
                  <div
                    className={styleHomeLayout["search-cancel-icon-holder"]}
                    onClick={() => setShowSearchBar(prev => !prev)}
                  >
                    {showSearchBar ? (
                      <FontAwesomeIcon
                        icon={faXmark}
                        className={styleHomeLayout["home-layout-search-icon"]}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSearch}
                        className={styleHomeLayout["home-layout-search-icon"]}
                      />
                    )}
                  </div>
                  <input
                    className={styleHomeLayout["default-search-intput"]}
                    tabIndex={2}
                    type="text"
                    placeholder="Search Categories/Scene/Products"
                    onChange={e => setSearchKey(e.target.value)}
                    value={searcKey}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    // onBlur={() => console.log("bye")}
                  />
                  <FontAwesomeIcon
                    icon={faSearch}
                    className={styleHomeLayout["default-search-icon"]}
                  />
                </div>
              )}
              {showSearchBar && (
                <div className={styleHomeLayout["responsive-search-bar"]}>
                  <input
                    type="text"
                    placeholder="Search Categories/Scene/Products"
                    className={styleHomeLayout["search-intput"]}
                    tabIndex={2}
                    onChange={e => setSearchKey(e.target.value)}
                    value={searcKey}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </div>
              )}
            </div>
          </nav>
          {/* search result displaying element */}
          {!searchLoading &&
            isFocused &&
            (search?.scene_category?.length > 0 ||
              search?.scene?.length > 0 ||
              search?.product?.length > 0) && (
              <>
                {searchLoading ? (
                  <span>Loading..</span>
                ) : (
                  <div className={styleHomeLayout["search-results-dropdown"]}>
                    <ul className={styleHomeLayout["search-result-lists"]}>
                      {search?.scene.map(item => (
                        <div
                          className={styleHomeLayout["whole-result-wrapper"]}
                        >
                          <Link
                            key={item.id}
                            className={styleHomeLayout["search-scene-title"]}
                            to={`scene/${item?.id}`}
                          >
                            {item?.title}
                          </Link>
                          {item?.scene_categories?.length > 0 &&
                            item?.scene_categories.map(sceneCategoriesItem => (
                              <>
                                <Link
                                  className={
                                    styleHomeLayout[
                                      "search-scene-category-name"
                                    ]
                                  }
                                  to={`scene/${sceneCategoriesItem?.id}`}
                                >
                                  {sceneCategoriesItem?.name}
                                </Link>
                              </>
                            ))}

                          <Link to={`scene/${item?.id}`}>
                            {/* <FontAwesomeIcon
                                icon={faArrowRight}
                                style={{
                                  fontSize: "large",
                                }}
                              /> */}
                            <svg
                              width="25"
                              height="25"
                              viewBox="0 0 43 43"
                              fill="#201F2F"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="21.2124"
                                cy="21.0731"
                                r="20.5"
                                stroke="#6FC6E0"
                              ></circle>
                              <path
                                d="M23.128 14.8669L29.0122 21.0736L23.128 27.2802"
                                stroke="#6FC6E0"
                              ></path>
                              <path
                                d="M28.6856 21.0731L13.4126 21.0731"
                                stroke="#6FC6E0"
                              ></path>
                            </svg>
                          </Link>
                        </div>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
        </section>
        <div className={styleHomeLayout["floating-menu-dropdown-container"]}>
          <div className={styleHomeLayout["home-layout-floating-icon"]}>
            {/* Contact us icon */}
            <svg
              width="43"
              height="43"
              viewBox="0 0 43 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleIconClick("contact")}
            >
              <rect
                x="0.78418"
                y="0.861206"
                width="41"
                height="41.0013"
                rx="20.5"
                stroke="#6FC6E0"
                fill="#121212"
              ></rect>
              <circle
                cx="21.2838"
                cy="16.7077"
                r="4.79273"
                stroke="#6FC6E0"
                strokeWidth="1.2"
              ></circle>
              <path
                d="M15.2342 17.2252H13.3977C13.3977 12.87 16.9283 9.33948 21.2834 9.33948C25.6386 9.33948 29.1692 12.87 29.1692 17.2252H27.0122"
                stroke="#6FC6E0"
                strokeWidth="1.2"
              ></path>
              <path
                d="M15.1841 15.6498V18.7994"
                stroke="#6FC6E0"
                strokeWidth="1.2"
                strokeLinejoin="bevel"
              ></path>
              <path
                d="M27.4206 15.6498V18.7994"
                stroke="#6FC6E0"
                strokeWidth="1.2"
                strokeLinejoin="bevel"
              ></path>
              <path
                d="M31.4489 33.3859C31.4489 27.7719 26.8978 23.2208 21.2838 23.2208C15.6698 23.2208 11.1188 27.7719 11.1188 33.3859"
                stroke="#6FC6E0"
                strokeWidth="1.2"
              ></path>
            </svg>

            {/* share icon */}
            <svg
              width="43"
              height="43"
              viewBox="0 0 43 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleIconClick("share")}
            >
              <rect
                x="0.78418"
                y="0.861206"
                width="41"
                height="41.0013"
                rx="20.5"
                stroke="#6FC6E0"
                fill="#121212"
              ></rect>
              <path
                d="M28.1725 15.4457L27.7369 15.496C13.7884 15.496 14.3998 21.9859 14.4 29.2181"
                stroke="#6FC6E0"
                strokeWidth="1.2"
              ></path>
              <path
                d="M24 12L28.1053 15.193C28.3233 15.3626 28.3626 15.6767 28.193 15.8947L25 20"
                stroke="#6FC6E0"
                strokeWidth="1.2"
                strokeLinecap="round"
              ></path>
            </svg>
            {sceneDetailApi?.Unity_Scene?.name && (
              <>
                {/* sound off icon */}
                <svg
                  width="43"
                  height="43"
                  viewBox="0 0 43 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handleAnimationSound}
                >
                  <rect
                    x="1.46191"
                    y="1.36401"
                    width="41"
                    height="41"
                    rx="20.5"
                    fill="#121212"
                  />
                  <rect
                    x="1.46191"
                    y="1.36401"
                    width="41"
                    height="41"
                    rx="20.5"
                    fill="url(#paint0_radial_737_22663)"
                  />
                  <rect
                    x="1.46191"
                    y="1.36401"
                    width="41"
                    height="41"
                    rx="20.5"
                    stroke="#6FC6E0"
                  />
                  <path
                    d="M21.1763 31.044V12.684L16.5212 18.1424L11.8652 19.6671L11.8661 21.9948L11.8871 24.0939L16.543 24.86L21.1763 31.044Z"
                    stroke="url(#paint1_linear_737_22663)"
                    strokeWidth="1.2"
                    strokeLinejoin="bevel"
                  />
                  <path
                    d="M24.4692 18.2767V25.2486"
                    stroke="url(#paint2_linear_737_22663)"
                    strokeWidth="1.2"
                    strokeLinejoin="bevel"
                  />
                  <path
                    d="M28.0229 15.6602L28.023 27.8639"
                    stroke="url(#paint3_linear_737_22663)"
                    strokeWidth="1.2"
                    strokeLinejoin="bevel"
                  />
                  <path
                    d="M32.0581 13.4122L32.0581 30.1185"
                    stroke="url(#paint4_linear_737_22663)"
                    strokeWidth="1.2"
                    strokeLinejoin="bevel"
                  />
                  <defs>
                    <radialGradient
                      id="paint0_radial_737_22663"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(21.9619 21.864) rotate(90) scale(29.0371)"
                    >
                      <stop stopColor="#172A4F" />
                      <stop offset="1" stopColor="#172A4F" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient
                      id="paint1_linear_737_22663"
                      x1="16.5208"
                      y1="12.684"
                      x2="21.1763"
                      y2="32.7111"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#6FC6E0" />
                      <stop
                        offset="0.50621"
                        stopColor="#00C4FF"
                        stopOpacity="0.760417"
                      />
                      <stop offset="1" stopColor="#6FC6E0" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_737_22663"
                      x1="24.9692"
                      y1="18.2767"
                      x2="29.6635"
                      y2="26.341"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#6FC6E0" />
                      <stop offset="1" stopColor="#6FC6E0" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_737_22663"
                      x1="28.5229"
                      y1="15.6602"
                      x2="28.5229"
                      y2="27.8639"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#6FC6E0" />
                      <stop offset="1" stopColor="#6FC6E0" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="paint4_linear_737_22663"
                      x1="38.2736"
                      y1="30.1193"
                      x2="27.8943"
                      y2="12.4241"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#6FC6E0" />
                      <stop offset="1" stopColor="#6FC6E0" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* animation pause icon */}
                <svg
                  width="43"
                  height="43"
                  viewBox="0 0 43 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handlePauseAnimation}
                >
                  <rect
                    x="1.46191"
                    y="1.36401"
                    width="41"
                    height="41"
                    rx="20.5"
                    fill="#121212"
                  />
                  <rect
                    x="1.46191"
                    y="1.36401"
                    width="41"
                    height="41"
                    rx="20.5"
                    fill="url(#paint0_radial_737_22664)"
                  />
                  <rect
                    x="1.46191"
                    y="1.36401"
                    width="41"
                    height="41"
                    rx="20.5"
                    stroke="#6FC6E0"
                  />
                  <path
                    d="M21.9618 11.099V10.499H21.3618V11.099H21.9618ZM32.1268 21.864C32.1268 27.478 27.5758 32.029 21.9618 32.029V33.229C28.2385 33.229 33.3268 28.1407 33.3268 21.864H32.1268ZM21.9618 32.029C16.3478 32.029 11.7968 27.478 11.7968 21.864H10.5968C10.5968 28.1407 15.6851 33.229 21.9618 33.229V32.029ZM21.9618 11.699C27.5758 11.699 32.1268 16.25 32.1268 21.864H33.3268C33.3268 15.5873 28.2385 10.499 21.9618 10.499V11.699ZM21.3618 11.099V16.1742H22.5618V11.099H21.3618Z"
                    fill="url(#paint1_linear_737_22664)"
                  />
                  <path
                    d="M16.6382 16.517L21.8716 21.7513"
                    stroke="url(#paint2_linear_737_22664)"
                    strokeWidth="1.2"
                    strokeLinejoin="bevel"
                  />
                  <defs>
                    <radialGradient
                      id="paint0_radial_737_22664"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(21.9619 21.864) rotate(90) scale(29.0371)"
                    >
                      <stop stopColor="#172A4F" />
                      <stop offset="1" stopColor="#172A4F" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient
                      id="paint1_linear_737_22664"
                      x1="31.0833"
                      y1="28.9508"
                      x2="11.1968"
                      y2="11.099"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#6FC6E0" />
                      <stop
                        offset="0.328696"
                        stopColor="#00C4FF"
                        stopOpacity="0.6875"
                      />
                      <stop offset="1" stopColor="#6FC6E0" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_737_22664"
                      x1="22.6065"
                      y1="22.537"
                      x2="16.6382"
                      y2="17.5403"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#6FC6E0" />
                      <stop
                        offset="0.28125"
                        stopColor="#00C4FF"
                        stopOpacity="0.71875"
                      />
                      <stop offset="1" stopColor="#6FC6E0" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </>
            )}
          </div>
          {showShare && floatingOption === "share" && (
            <div className={styleHomeLayout["share-icon-container"]}>
              <p>Share this page</p>
              <br />
              <ul>
                {shareIcons?.map(
                  item =>
                    item?.value === true && (
                      <li>
                        {/* displaying icon according to the name */}
                        {item.name === "Facebook" ? (
                          <>
                            <Link
                              onClick={event =>
                                handleLinkShare(event, "Facebook")
                              }
                            >
                              <div className={styleHomeLayout.facebook}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  width="21"
                                  height="21"
                                  fill="none"
                                  viewBox="0 0 21 21"
                                >
                                  <path
                                    fill="url(#pattern0)"
                                    d="M0.645 0.066H20.645V20.066H0.645z"
                                  ></path>
                                  <defs>
                                    <pattern
                                      id="pattern0"
                                      width="1"
                                      height="1"
                                      patternContentUnits="objectBoundingBox"
                                    >
                                      <use
                                        transform="scale(.01)"
                                        xlinkHref="#image0_170_36190"
                                      ></use>
                                    </pattern>
                                    <image
                                      id="image0_170_36190"
                                      width="100"
                                      height="100"
                                      xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAACwElEQVR4nO3dPWtUQRiG4XtCBI1EET9QEREFC0VQsLQXq5Q2gqClH//Azk5LsbaxEEsLEbHLLxBJaZGgwWAKjRGNksciW4jgbnZ3zsw7yXPBFkl2Z95wc/Zs9iwEzMzMzMzMykq1B+iSpJ3AeeAccBw4BEwDk8Av4Fvvrj+B773b595tCVgGPqaUlstOvoVI2ifplqTXktY0vicl558suVmXJB0B7gHXganK44ys+SCSJoC7wH1gd+VxxtZ0EEl7gWfA5dqz5NJsEEkHgTdsnLC3jInaA4xC0jTwii0WAxoNAjwGLtQeogvNBZF0FbhWe46uNBVE0hTwsPYcXWoqCHADOFZ7iC61FuRO7QG61kwQSReB07Xn6FozQYCZ2gOU0NIfhpcyrfMVeArMAgu9r1f63L/fz7YnSUnSSoZ3bmcl7a/9+/TTxPUQSYeBxTGXWQVOpZQ+ZRipM62cQ05kWONF9BjQTpA9GdZ4m2GNzrUSJMcFpy8Z1uhcK0F2ZFijiVdLrQTJ4UftATZjOwVpgoME4yDBOEgwDhKMgwTjIMFUeftd0k3gwBAPyfFxnxlJJ0d43HpK6UGG/Telyru9kt4BZ2vsPYLFlNLRUpv5KWuwhZKbOchg8yU3c5DBfIQE4yDB+CkrGB8hwThIIGtA0Q9GOEh/H1JK6yU3dJD+ip7QwUEGKXr+AAcZxEdIMD5CgnGQYIoHqXU95Ayw669vrbLxmv9/rgCPxtz2NvByyMfMp5R+j7nvUKpcMUwpzQ1zf0lLGbZdSim9z7BOp/yUFYyDBOMgwThIMA4SjIME4yDBOEgwDhKMgwTjIME4SDAOEoyDBOMgwThIMA4SjIME4yDBOEgwDhKMgwTjIME4SDAOEoyDBOMgwThIMA4SjIME4yDBOEgwDhKMgwTjIMG08k/BFoDnGdYwMzMzMzOzf/wBJ7MO+xWD7ZMAAAAASUVORK5CYII="
                                    ></image>
                                  </defs>
                                </svg>
                              </div>
                            </Link>
                          </>
                        ) : item.name === "Twitter" ? (
                          <>
                            <Link
                              onClick={event =>
                                handleLinkShare(event, "Twitter")
                              }
                            >
                              <div className={styleHomeLayout.twitter}>
                                {/* <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              width="21"
                              height="21"
                              fill="none"
                              viewBox="0 0 21 21"
                            >
                              <path
                                fill="url(#pattern0)"
                                d="M0.954 0.293H20.954V20.293H0.954z"
                              ></path>
                              <defs>
                                <pattern
                                  id="pattern0"
                                  width="1"
                                  height="1"
                                  patternContentUnits="objectBoundingBox"
                                >
                                  <use
                                    transform="scale(.01)"
                                    xlinkHref="#image0_170_36192"
                                  ></use>
                                </pattern>
                                <image
                                  id="image0_170_36192"
                                  width="100"
                                  height="100"
                                  xlinkHref="data:image/png;base64,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"
                                ></image>
                              </defs>
                            </svg> */}
                                <FontAwesomeIcon
                                  icon={faTwitter}
                                  style={{ height: "20px", width: "20px" }}
                                />
                              </div>
                            </Link>
                          </>
                        ) : item.name === "Linkedin" ? (
                          <>
                            <Link
                              onClick={event =>
                                handleLinkShare(event, "Linkedin")
                              }
                            >
                              <div className={styleHomeLayout.linkedin}>
                                <FontAwesomeIcon
                                  icon={faLinkedinIn}
                                  style={{ height: "20px", width: "20px" }}
                                />
                              </div>
                            </Link>
                          </>
                        ) : item.name === "Pinterest" ? (
                          <>
                            <Link
                              onClick={event =>
                                handleLinkShare(event, "Pinterest")
                              }
                            >
                              <div className={styleHomeLayout.pinterest}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  version="1.2"
                                  viewBox="0 0 50 50"
                                >
                                  <defs>
                                    <image
                                      id="img1"
                                      width="50"
                                      height="50"
                                      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAAAXNSR0IB2cksfwAAAANQTFRFAAAAp3o92gAAAAF0Uk5TAEDm2GYAAAAOSURBVHicY2AYBYMJAAABkAAB07sQ/gAAAABJRU5ErkJggg=="
                                    ></image>
                                    <image
                                      id="img2"
                                      width="37"
                                      height="49"
                                      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAxCAMAAABqB5C8AAAAAXNSR0IB2cksfwAAAmFQTFRFAAAA////////////////////////////////////////////+/v7/////////////////////////////////////v7+/////////////////////////v7+////////////////////+/v7/////////////v7+7e3t////////////////6Ojo8/Pz/////////////////////////v7+/f39////////////////////////////////////////6urq/f39/////////v7+/////////////////////////////////////v7+/////////////////////////Pz8/////////////////Pz8/////////v7+/v7+/////////////////////v7+9/f3/////////////////////////////////v7+/f39/////Pz8/////////////////////////////////////v7+/////////v7+/////v7+/////////////////////////////////////////////////////////////////v7+/////////f39/////////////v7+/////////////////////////////////////f39/////v7+/////////v7+/////v7+/v7+/////v7+/v7+/////////v7+4uLi+vr6/////////////////v7+////////+/v7/v7+/////////////////////////////f39////////////9/f3/Pz8////v1qrXAAAAMt0Uk5TAA0pU3eatcC8nVIoCAEukN36//nWehQMZ/74pjBAuvznbggDavGfCQab7b08DxZMi8f1uQ8FlfeEHgQxkwKJuBwBUfb7U4IHV+kblgOBkXW7GhnP6BQI10O+7ih1Vjp82ySulDtMBNrO4w4Gy7PY7yZ+UaPCXWtV9EHveEXNCSLQJEqcH9k5/YDEOCrkEGjlrEAY1EcpXoXTF9FwNlslGAveIzCyVyvIHIduR5nT9dWnnAEVIRXFZSo+xgJcfHNZBXk3iAJQ3DMGNABIQ/+1AAACsklEQVR4nI2VZ18TQRCHBwwE0AQ5AiFRiERBjSiKJRjQoEEQJRbAghU7EUWwQETBjhhFRFSwYBd7L9h7/1Tuzu6VlF/OeZGd/e9zM3M7uxcApUVEDtBERWtjYjVxAwdBSNPp4wcnCKIlGpKSgxljisEk+Jt5yNAAKDXNIgTbsHSrghk+IiMEQ8ySOVKCRo3mom1MUtZYgHHZ4yfkcGniJA5NnsIEe+5UnfigIy+Gl5k/jb3bdDZ1FvhVOmOmC+XCdJzOKsRARcWBrz3bhljJHJrPgP7c0uDdcbMk84g7H70FrEjHwjKHTCWX41rFIli8BL08lJdWLrM5l8vYChZsJazC3YxFcTU2qGqNROkZtRbW0cG0nmobeBfdErURX0zYBNV08GwmUs0WvpFb5ZS1KLhgGwtJrM7MqRiZ0jIF8LeeKtvF5u2QqZ1KahdVGkRKI1MeJdWopLy7JaiU9bIJmuiwh0p7OdXcIlH7mFIL+7HRtO8H7EzLlRMe5OcADtEh4zCRrEfYGWiVqXrxuayjdGyjWiZKxyIkyOpExeSDFoxgP07EysCE+hxUTrQDnEQvH6C9A704mWpjCU8RtxhDxAP4WNM6Jeh0F0t4hk7O0hjnAIqEAKobSxZ62Ox8dGIHOYQXGHVRhC6xI5LQy+eOy1cArvJre+06E2/w7tysAYV1im3sukUudKTby2a2PiUE3SIl2Hu0tyv4bXQ16pSQo5oRgp+5UvwiQQH7UvRWKSFPtj8EqShbjHec0gfKe7csAIJ7uFBOUt9/8PCRYHv8pCGIAXiKVBR1nz2v63vxMsRdB3iFzegPtaQoHvew5HV46g1u4tt34an3WNaH8BB8pJC5VYXCA5dm/B/qkwqEVPNnNeoL+U/5qgZBvyB8+65K/bD8VCudmM/zSx2C33/+hln9Bxlamx5BBJZdAAAAAElFTkSuQmCC"
                                    ></image>
                                  </defs>
                                  <style></style>
                                  <use
                                    id="Background"
                                    x="0"
                                    y="0"
                                    href="#img1"
                                  ></use>
                                  <use
                                    id="Layer copy"
                                    x="6"
                                    y="1"
                                    href="#img2"
                                  ></use>
                                </svg>
                              </div>
                            </Link>
                          </>
                        ) : item.name === "Email" ? (
                          <>
                            <Link
                              to={
                                "mailto:?subject=I wanted you to see this site;body=Check out this site"
                              }
                              target="_blank"
                            >
                              <div className={styleHomeLayout.envelop}>
                                <FontAwesomeIcon
                                  icon={faEnvelope}
                                  style={{ height: "20px", width: "20px" }}
                                />
                              </div>
                            </Link>
                          </>
                        ) : (
                          item.name === "Copy Link" && (
                            <>
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  navigator.clipboard.writeText(
                                    `${window.location.href}`
                                  )
                                }
                                className={styleHomeLayout.link}
                              >
                                <FontAwesomeIcon icon={faLink} />
                              </div>
                            </>
                          )
                        )}
                      </li>
                    )
                )}
              </ul>
            </div>
          )}
          {/* Contact Us form */}
          {showShare && floatingOption === "contact" && (
            <div className={styleHomeLayout["contact-us-form-container"]}>
              <FontAwesomeIcon
                icon={faXmark}
                className={styleHomeLayout["contact-us-close-btn"]}
                onClick={() => setShowShare(false)}
              />
              <span className={styleHomeLayout["contact-us"]}>Contact Us</span>
              <p className={styleHomeLayout["contact-number"]}>
                {basicSettingList?.contact_number}
              </p>
              <br />
              <hr />
              <br />
              <form
                className={styleHomeLayout["contact-us-form"]}
                onSubmit={handleContactUsSubmit}
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  onChange={e => setYourName(e.target.value)}
                  value={yourName}
                />
                <input
                  type="text"
                  placeholder="Your Email"
                  onChange={e => setYourEmail(e.target.value)}
                  value={yourEmail}
                />
                <input
                  type="textarea"
                  placeholder="Your message goes here.."
                  onChange={e => setYourMessage(e.target.value)}
                  value={yourMessage}
                />
                <div
                  className={styleHomeLayout["contact-us-submit-btn-container"]}
                >
                  <button type="submit">Send</button>
                </div>
              </form>
            </div>
          )}
        </div>

        {slug && !isLoadingSceneCategoriesById ? (
          <Outlet />
        ) : (
          <section className={styleHomeLayout["home-layout-body-container"]}>
            <div className={styleHomeLayout["home-layout-body"]}>
              {(() => {
                switch (outcome) {
                  // teleportation id condition
                  case 1:
                    return (
                      <>
                        {!isLoading && !isLoadingConfig && (
                          <UnityRenderer
                            tabIndex={1}
                            fileName={sceneDetailApi?.Unity_Scene?.name}
                            loadingText={
                              // config?.data?.homepage?.loading_text ||
                              // sceneDetailApi?.Unity_Scene?.loading_text
                              sceneDetailApi &&
                              sceneDetailApi?.Unity_Scene?.loading_text
                                ? sceneDetailApi?.Unity_Scene?.loading_text
                                : basicSettingList?.default_loading_text
                            }
                            loadingImageBg={
                              // `${CONFIG.BASE_URI}/${sceneDetailApi?.Unity_Scene?.background_image}` ||

                              sceneDetailApi?.Unity_Scene?.background_image
                            }
                            loadingImage={sceneDetailApi?.image}
                            productPanel={productArray}
                            teleportation={telportationArray}
                            video={videoArray}
                            annotations={annotationObject}
                            basicSettingList={basicSettingList}
                            basicSettingLoading={basicSettingLoading}
                            sceneDetailApi={sceneDetailApi}
                            productCategories={
                              sceneDetailApi?.product_categories
                            }
                            overlayProduct={overlayProduct}
                          />
                        )}
                      </>
                    );
                  // image on homepage option condition
                  case 2:
                    return (
                      <img
                        src={
                          config?.data?.homepage.image
                            ? `${CONFIG.BASE_URI}${config?.data?.homepage.image}`
                            : `${window.location.origin}/assets/NEOM_TD_UIUX-Landing.png`
                        }
                        alt="default-home-page-img"
                      />
                    );
                  // video on homepage option condition
                  case 3:
                    return (
                      <ReactPlayer
                        width="100%"
                        height="100%"
                        url={config?.data?.homepage?.video_embed_code}
                      />
                    );
                  default:
                    // default scene to display
                    return (
                      <>
                        {(!isLoading || !isLoadingConfig) && (
                          <UnityRenderer
                            tabIndex={1}
                            fileName={config?.data?.homepage?.name}
                            loadingImageBg={
                              // `${window.location.origin}${sceneDetailApi?.Unity_Scene?.background_image}` ||
                              `${CONFIG.BASE_URI}/${config?.data?.homepage?.background_image}`
                            }
                            loadingImage={sceneDetailApi?.image}
                            loadingText={config?.data?.homepage?.loading_text}
                            basicSettingList={basicSettingList}
                            basicSettingLoading={basicSettingLoading}
                            cmsMetadata={false}
                            overlayProduct={overlayProduct}
                            sceneDetailApi={sceneDetailApi}
                          />
                        )}
                      </>
                    );
                }
              })()}
            </div>
          </section>
        )}
      </main>
    );
  }
};

export default HomeLayout;
