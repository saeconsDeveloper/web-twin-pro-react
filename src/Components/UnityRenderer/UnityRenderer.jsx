import { useEffect, useState, useLayoutEffect } from "react";
import { CONFIG } from "../../config";

import { Unity, useUnityContext } from "react-unity-webgl";
import { useGetProductCategoriesDetail } from "../../api/productCategories";
import styleUnityRenderer from "./UnityRenderer.module.css";
import ProductSidePanel from "../ProductSidePanel/ProductSidePanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faXmark } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";

const UnityRenderer = ({
  fileName,
  productPanel,
  teleportation,
  video,
  annotations,
  loadingImageBg,
  loadingImage,
  basicSettingList,
  basicSettingLoading,
  loadingText,
  sceneDetailApi,
  cmsMetadata = true,
  // prop to get the value of the product categories to display on the product sidepanel
  productCategories,
  overlayProduct,
}) => {
  const themes = JSON.parse(localStorage.getItem("theme"));
  const [showProductSidePanel, setShowProductSidePanel] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    requestFullscreen,
    UNSAFE__unityInstance,
    UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate,
  } = useUnityContext({
    loaderUrl: `${CONFIG.BASE_URI}/media/unity/${fileName}/${fileName}.loader.js`,
    dataUrl: `${CONFIG.BASE_URI}/media/unity/${fileName}/${fileName}.data.unityweb`,
    frameworkUrl: `${CONFIG.BASE_URI}/media/unity/${fileName}/${fileName}.framework.js.unityweb`,
    codeUrl: `${CONFIG.BASE_URI}/media/unity/${fileName}/${fileName}.wasm.unityweb`,
  });

  // const {
  //   unityProvider,
  //   isLoaded,
  //   loadingProgression,
  //   requestFullscreen,
  //   UNSAFE__unityInstance,
  //   UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate,
  // } = useUnityContext({
  //   loaderUrl:
  //     "http://localhost:3000/buildUnity/smarthome_reworked1612v1.loader.js",
  //   dataUrl:
  //     "http://localhost:3000/buildUnity/smarthome_reworked1612v1.data.unityweb",
  //   frameworkUrl:
  //     "http://localhost:3000/buildUnity/smarthome_reworked1612v1.framework.js.unityweb",
  //   codeUrl:
  //     "http://localhost:3000/buildUnity/smarthome_reworked1612v1.wasm.unityweb",
  // });
  const [productId, setProductId] = useState(null);
  function getObjectKey(obj, value) {
    let a = Object.keys(obj).find(key => obj[key] === value);
    setProductId(a);
    return a;
  }

  // product cateo
  const { data: sidePanelDetail, isLoading: isLoadingSidepanelDetail } =
    useGetProductCategoriesDetail(productId ? productId : null);

  useEffect(() => {
    window.unityInstance = UNSAFE__unityInstance;
    window.OpenPanelByProductId = function OpenPanelByProductId(
      product_button_id
    ) {
      getObjectKey(productPanel, product_button_id);
      setShowProductSidePanel(true);
    };
    window.OpenVideoByVideoButtonId = function OpenVideoByVideoButtonId(
      videoButtonId
    ) {
      setVideoUrl(video[videoButtonId]);
      setShowVideo(true);
    };
  }, [UNSAFE__unityInstance, productPanel]);

  useEffect(() => {
    if (isLoaded && cmsMetadata) {
      let _productPanelArray = [];
      for (const [key, value] of Object.entries(productPanel)) {
        _productPanelArray.push(value);
      }
      try {
        console.log("feeding produc", _productPanelArray);
        window.unityInstance.Module.WebCMS.SetProductButtonVisible(
          _productPanelArray
        );
      } catch (error) {
        console.error(error);
      }
      try {
        console.log("feeding teleport");
        window.unityInstance.Module.WebCMS.SetTeleportButtonLink(teleportation);
      } catch (error) {
        console.error(error);
      }
      try {
        console.log("feeding annotation", annotations);
        window.unityInstance.Module.WebCMS.SetContent(annotations);
      } catch (error) {
        console.error(error, "annot");
      }
      try {
        console.log("feeding teleport");
        let videoValueForScene = Object.keys(video);
        window.unityInstance.Module.WebCMS.SetVideoButtonVisible(
          videoValueForScene
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [isLoaded]);

  // Close product side panel
  const handleCloseSidePanel = () => {
    setShowProductSidePanel(false);
  };

  //unloadinf unity intance from memory
  useEffect(() => {
    return () => {
      try {
        detachAndUnloadImmediate();
      } catch (error) {
        console.log("cannot unload unity");
      }
    };
  }, [detachAndUnloadImmediate]);

  // dynamic theme update
  useLayoutEffect(() => {
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("side_panel_main_background_primary") &&
      themes?.header_color_primary !== "#000000"
    ) {
      //updating the primary color property of nav bar dynamically
      document.documentElement.style.setProperty(
        "--sidepanel-bg-color-primary",
        themes?.side_panel_main_background_primary
      );
    }
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("side_panel_main_background_secondary") &&
      themes?.header_color_primary !== "#000000"
    ) {
      //updating the primary color property of nav bar dynamically
      document.documentElement.style.setProperty(
        "--sidepanel-bg-color-secondary",
        themes?.side_panel_main_background_secondary
      );
    }
  }, [themes]);

  return (
    <>
      {isLoaded &&
        overlayProduct &&
        overlayProduct.map(item => {
          return (
            <div
              onClick={() => {
                setShowProductSidePanel(true);
                setProductId(item.id);
              }}
              style={{
                zIndex: "9",
                top: "50%",
                left: "50%",
                transform: `translateX(${item.position_x}%) translateY(${item.position_y}%)`,
                position: "absolute",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="37"
                height="37"
                fill="none"
                viewBox="0 0 37 37"
              >
                <rect
                  width="36.912"
                  height="36.912"
                  fill="#13161C"
                  rx="18.456"
                ></rect>
                <circle
                  cx="18.308"
                  cy="18.456"
                  r="11.29"
                  fill="#6FC6E0"
                  fillOpacity="0.2"
                ></circle>
                <g filter="url(#filter0_d_336_282)">
                  <circle cx="18.308" cy="18.456" r="7" fill="#6FC6E0"></circle>
                </g>
                <defs>
                  <filter
                    id="filter0_d_336_282"
                    width="22"
                    height="22"
                    x="7.308"
                    y="11.456"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                  >
                    <feFlood
                      floodOpacity="0"
                      result="BackgroundImageFix"
                    ></feFlood>
                    <feColorMatrix
                      in="SourceAlpha"
                      result="hardAlpha"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    ></feColorMatrix>
                    <feOffset dy="4"></feOffset>
                    <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                    <feComposite in2="hardAlpha" operator="out"></feComposite>
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
                    <feBlend
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_336_282"
                    ></feBlend>
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_dropShadow_336_282"
                      result="shape"
                    ></feBlend>
                  </filter>
                </defs>
              </svg>
            </div>
          );
        })}
      <main
        className={styleUnityRenderer["unity-renderer-main-container"]}
        // onClick={handleCloseSidePanel}
      >
        <>
          <div className={styleUnityRenderer["unity-container"]}>
            {/* The loading screen will be displayed here. */}

            {/* product side panel */}
            <div
              className={`${
                styleUnityRenderer["product-sidepanel-container"]
              } ${
                showProductSidePanel
                  ? styleUnityRenderer["show-sidepanel"]
                  : styleUnityRenderer["hide-sidepanel"]
              }`}
            >
              <aside style={{ position: "relative" }}>
                <FontAwesomeIcon
                  icon={faClose}
                  className={styleUnityRenderer["product-side-panel-close-btn"]}
                  onClick={handleCloseSidePanel}
                />
                <ProductSidePanel
                  sidePanelDetail={sidePanelDetail}
                  sceneDetailApi={sceneDetailApi}
                  isLoadingSidepanelDetail={isLoadingSidepanelDetail}
                  productPanel={productPanel}
                  productCategories={productCategories}
                />
              </aside>
            </div>

            {isLoaded === false && (
              <div
                className={styleUnityRenderer["loading-overlay"]}
                style={{
                  backgroundImage: `url(${loadingImageBg})`,
                }}
              >
                {/* <img src={loadingImage} alt="loadin-img" /> */}
                <div className={styleUnityRenderer["loading-image-wrapper"]}>
                  <div
                    className={
                      styleUnityRenderer["loading-image-text-container"]
                    }
                  >
                    {/* loading text -- inline style */}
                    <span>{loadingText}</span>
                    {!basicSettingLoading && (
                      <>
                        {/* div with inline style to have border in the right side of the image */}
                        <div
                          style={{
                            width: "max-content",
                            margin: "0.3rem 0 0.3rem 0",
                            borderRight: "1.5px solid white",
                            padding: "1rem",
                          }}
                        >
                          <img
                            className={styleUnityRenderer["loading-image"]}
                            src={
                              loadingImage
                                ? `${CONFIG.BASE_URI}/${loadingImage}`
                                : `${CONFIG.BASE_URI}/${basicSettingList?.loading_image}`
                            }
                            alt="scene-loading"
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className={styleUnityRenderer["progress-bar"]}>
                    <div
                      className={styleUnityRenderer["progress-bar-fill"]}
                      style={{ width: loadingProgression * 100 + "%" }}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* The Unity app will be rendered here. */}
            <Unity
              tabIndex={1}
              className={styleUnityRenderer["unity-canvas"]}
              unityProvider={unityProvider}
              // onClick={console.log("hello")}
            />
            {showVideo && (
              <>
                <div
                  className={styleUnityRenderer["wrapper"]}
                  onClick={() => setShowVideo(false)}
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    className={styleUnityRenderer["video-close-btn"]}
                  />
                  <div className={styleUnityRenderer["video-player-wrapper"]}>
                    <ReactPlayer
                      width="50%"
                      height="50%"
                      url={videoUrl}
                      className={styleUnityRenderer["video-player"]}
                    />
                    {/* <button onClick={() => setShowVideo(null)}> On click </button> */}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      </main>
    </>
  );
};

export default UnityRenderer;
