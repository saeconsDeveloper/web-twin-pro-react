import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styleCatalogCard from "./CatalogCard.module.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "../../config/config";

const CatalogCard = ({
  title,
  description,
  onclick,
  cardId,
  showSidePanelCard,
  showSidePanel,
  img,
  sidepanelImage,
  sectorOrSidepanel,
  sceneId,
  selectedId,
  scene_group,
  currentIndex,
  catalogSidePanelData,
  id,
}) => {
  const [width, setWidth] = useState(window.innerWidth);

  // function to update the width state
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  // To capture the current width for media query breakpoints and to render the side panel inside card in mobile view
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  return (
    // card main wrapper
    <main className={`${styleCatalogCard["catalog-card-main-container"]}`}>
      {/* toggling the image for sidepanel and outside of sidepanel */}

      <div className={styleCatalogCard["img-arrow-icon-wrapper"]}>
        {/* element to display the group order of the scene. Inline css is used for background color*/}
        {scene_group && (
          <div
            style={{ backgroundColor: `${scene_group?.color}` }}
            className={styleCatalogCard["card-scene-group"]}
          >
            <p>{scene_group?.name}</p>
          </div>
        )}
        <img
          src={`${config.BASE_URI}${sidepanelImage ? sidepanelImage : img}`}
          alt="scenes"
        />
        {sectorOrSidepanel === "sector" && (
          <div
            className={styleCatalogCard["arrow-icon-wrapper"]}
            onClick={onclick}
          >
            {/* added extra class conditionally to rotate the arrow downward in mobile and ipad view and to show explore button in sidepanel card */}
            <FontAwesomeIcon
              icon={faArrowRight}
              className={`${styleCatalogCard["arrow-icon"]} ${
                showSidePanel &&
                styleCatalogCard["rotate-arrow-icon-mobile-view"]
              }`}
            />
          </div>
        )}
      </div>
      <div
        className={`${
          sectorOrSidepanel === "sidepanel" &&
          styleCatalogCard["sidepanel-card-title-container"]
        } ${styleCatalogCard["card-catalog-title-container"]}`}
      >
        <strong>{title}</strong>
        {/* added extra class according to sidepanel panel open or collapse state;
        - if sidepanel is opened 'side-panel-card-description' class is added not to trim the words inside of sidepanel. 
        - long length description will be trimed outside of the sidepanel
        - card-description class is for triming the long length description
        */}
        <h4
          className={
            sectorOrSidepanel === "sidepanel"
              ? styleCatalogCard["side-panel-card-description"]
              : width >= 360 &&
                width <= 912 &&
                showSidePanelCard &&
                cardId === selectedId
              ? styleCatalogCard["mobile-view-card-dropdown"]
              : styleCatalogCard["card-description"]
          }
        >
          {description}
        </h4>
        {/* Condition to render the sidepanel below the card in mobile view 
          - (width >= 360 && width <= 900 &&) -> if the width of the screen is between two value; where triggers media query
          - (showSidePanelCard && cardId === selectedId) -> state of the showSidepanel from sector layout to card must be 'ture', cardId and the selectedCard must be same
        */}
        {width >= 360 &&
          width <= 912 &&
          showSidePanelCard &&
          cardId === selectedId && (
            <div className={styleCatalogCard["responsive-card-explore-btn"]}>
              <Link to="#">Explore</Link>
            </div>
          )}
      </div>
    </main>
  );
};

export default CatalogCard;
