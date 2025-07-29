import React, { Fragment } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

import { useGetBasicSettingsList } from "../../api/settings";
import { useLocation, useNavigate } from "react-router-dom";
import { CONFIG } from "../../config";
import styleViewUnity from "./ViewUnity.module.css";

const ViewUnity = () => {
  // const { data } = useGetBasicSettingsList();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { data: basicSettingList, isLoading: basicSettingLoading } =
    useGetBasicSettingsList();

  if (!basicSettingLoading) console.log(basicSettingList, "basix");
  console.log(state, "stsat");

  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: `${CONFIG.BASE_URI}/media/unity/${state.item.name}/${state.item.name}.loader.js`,
    dataUrl: `${CONFIG.BASE_URI}/media/unity/${state.item.name}/${state.item.name}.data.unityweb`,
    frameworkUrl: `${CONFIG.BASE_URI}/media/unity/${state.item.name}/${state.item.name}.framework.js.unityweb`,
    codeUrl: `${CONFIG.BASE_URI}/media/unity/${state.item.name}/${state.item.name}.wasm.unityweb`,
  });

  return (
    <Fragment>
      <div className={styleViewUnity["wrapper"]}>
        {/* The Unity container */}

        <Fragment>
          <div className={styleViewUnity["unity-container"]}>
            {/* The loading screen will be displayed here. */}
            {/* set back-ground image if there is image in unity scene else default image from basic settings */}
            {isLoaded === false && (
              <div
                className={styleViewUnity["loading-overlay"]}
                style={{
                  backgroundImage: `${state?.item?.background_image} ?  url(${state?.item?.background_image}) : url(${basicSettingList?.loading_image})`,
                }}
              >
                <div className={styleViewUnity["loading-image-wrapper"]}>
                  <div
                    className={styleViewUnity["loading-image-text-container"]}
                  >
                    {/* loading text */}
                    <span>
                      {/* set loading text if unity scene has loading text else default text from basic settings */}
                      {state?.item?.loading_text
                        ? state?.item?.loading_text
                        : basicSettingList?.default_loading_text}
                    </span>
                    {/* set loading image if unity scene has loading image else set default loading image from basic settings */}
                    {!basicSettingLoading && (
                      <>
                        {/* div with inline style to have border in the right side of the image */}
                        <div
                          style={{
                            width: "fit-content",
                            margin: "0.3rem 0 0.3rem 0",
                            borderRight: "1.5px solid white",
                            padding: "0.5rem",
                          }}
                        >
                          <img
                            className={styleViewUnity["loading-image"]}
                            src={
                              state?.item?.background_image
                                ? state?.item?.background_image
                                : basicSettingList?.loading_image
                            }
                            alt="scene-loading"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className={styleViewUnity["progress-bar"]}>
                    <div
                      className={styleViewUnity["progress-bar-fill"]}
                      style={{ width: loadingProgression * 100 + "%" }}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* The Unity app will be rendered here. */}
            <Unity
              className={styleViewUnity["unity-canvas"]}
              unityProvider={unityProvider}
            />
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
};

export default ViewUnity;
